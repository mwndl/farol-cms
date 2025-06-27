#!/bin/sh
npx directus database migrate:latest || echo "Migration falhou, mas continuando..."
npx directus start
