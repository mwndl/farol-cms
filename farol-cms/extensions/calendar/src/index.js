import fetch from 'node-fetch';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

// Cria uma instância de cache com TTL (Time-to-Live) de 30 minutos (1800 segundos)
const cache = new NodeCache({ stdTTL: 1800 });

export default (router) => {
  router.get('/events', async (req, res) => {
	try {
	  // Verifica se os eventos já estão no cache
	  const cachedEvents = cache.get('events');
	  if (cachedEvents) {
		console.log('Eventos retornados do cache');
		return res.status(200).json(cachedEvents);
	  }

	  // Calcula as datas
	  const now = new Date();
	  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
	  const fourteenDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 23, 59, 59).toISOString();

	  // Obtém as variáveis de ambiente
	  const calendarId = process.env.GOOGLE_CALENDAR_ID;
	  const apiKey = process.env.GOOGLE_API_KEY;

	  if (!calendarId || !apiKey) {
		throw new Error('Calendar ID ou API Key não configurados corretamente no arquivo .env');
	  }

	  // Faz a requisição para a API do Google Calendar
	  const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${todayMidnight}&timeMax=${fourteenDaysLater}&singleEvents=true&orderBy=startTime&key=${apiKey}`;
	  const response = await fetch(apiUrl);

	  if (!response.ok) {
		throw new Error(`Erro ao buscar eventos: ${response.statusText}`);
	  }

	  const events = await response.json();

	  // Organiza os eventos no formato desejado
	  const eventsByDate = {};

	  // Inicializa o calendário para os próximos 14 dias
	  for (let i = 0; i <= 14; i++) {
		const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
		const dateString = date.toLocaleDateString('pt-BR'); // Ex: "24/12/2024"
		eventsByDate[dateString] = { events: [] };
	  }

	  // Filtra e organiza os eventos por data
	  events.items.forEach(event => {
		const eventDate = new Date(event.start.dateTime || event.start.date);
		const dateString = eventDate.toLocaleDateString('pt-BR'); // Ex: "05/02/2025"
		const eventHour = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Ex: "18:30"
	  
		let location = {
		  title: null,
		  address: null
		};
		let description = null;
	  
		if (event.description) {
		  try {
	  		// Limpa a string de descrição removendo quebras de linha e espaços desnecessários
			const cleanedDescription = event.description.replace(/\\n/g, '');
	  
			// Tenta parsear a string JSON limpa
			const eventDetails = JSON.parse(cleanedDescription); 
	  
			// Acessa as propriedades de eventDetails
			if (eventDetails.Event) {
			  location.title = eventDetails.Event.Location?.Title;
			  location.address = eventDetails.Event.Location?.Address;
			  description = eventDetails.Event.Description;
			}
		  } catch (e) {
			console.error('Erro ao processar descrição:', e);
		  }
		}
	  
		if (eventsByDate[dateString]) {
		  eventsByDate[dateString].events.push({
			hour: eventHour,
			title: event.summary,
			location,
			description
		  });
		}
	  });
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  // Armazena os eventos no cache
	  cache.set('events', eventsByDate);

	  // Retorna os eventos
	  res.status(200).json(eventsByDate);
	} catch (error) {
	  console.error('Erro ao executar o script:', error);
	  res.status(500).json({ error: error.message });
	}
  });
};

