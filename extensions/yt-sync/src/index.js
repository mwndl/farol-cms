import axios from 'axios';

export default (router) => {
  router.get('/', async (req, res) => {
    try {
      const YOUTUBE_API_KEY = process.env.GOOGLE_API_KEY;
      const CHANNEL_ID = process.env.YT_CHANNEL_ID;
      const DIRECTUS_API_URL = process.env.DIRECTUS_URL;
      const DIRECTUS_TOKEN = process.env.DIRECTUS_BOT_TOKEN;

      // Faz a requisição para o YouTube 
      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            key: YOUTUBE_API_KEY,
            channelId: CHANNEL_ID,
            part: 'snippet',
            type: 'video',
            order: 'date',
            maxResults: 10,
          }
        }
      );

      // Mapeia os dados retornados
      const videos = youtubeResponse.data.items.map((item) => ({
        titulo: item.snippet.title,
        video_id: item.id.videoId,
        data_publicacao: item.snippet.publishedAt,
      }));

      // Ordena os vídeos pela data de publicação, do mais antigo para o mais recente
      videos.sort((a, b) => new Date(a.data_publicacao) - new Date(b.data_publicacao));

      // Envia os dados para o Directus
      for (const video of videos) {
        try {
          await axios.post(
            `${DIRECTUS_API_URL}/items/yt_video`,
            video,
            { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
          );
        } catch (error) {
          // Tratando o erro 400 e verificando se é por duplicação
          if (error.response && error.response.status === 400) {
            console.log(`Adição do vídeo ${video.video_id} negada por duplicação`);
          } else {
            // Outros erros
            console.error('Erro ao adicionar vídeo:', error);
          }
        }
      }

      res.json({ message: 'Vídeos sincronizados com sucesso!', videos });
    } catch (error) {
      console.error('Erro ao buscar ou salvar os vídeos:', error);
      res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
  });
};
