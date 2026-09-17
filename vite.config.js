import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-restcountries-api',
      configureServer(server) {
        server.middlewares.use('/api/v3_countries', (req, res, next) => {
          try {
            // Ler o banco de dados local
            const dbPath = path.resolve(__dirname, 'public/countries.json');
            const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            
            let result = data;
            
            // req.originalUrl será algo como "/api/v3_countries/region/americas"
            const endpoint = req.originalUrl.replace('/api/v3_countries', '').split('?')[0];
            
            if (endpoint.startsWith('/region/')) {
              const region = endpoint.split('/region/')[1].toLowerCase();
              result = data.filter(c => c.region && c.region.toLowerCase() === region);
            } else if (endpoint.startsWith('/alpha/')) {
              const code = endpoint.split('/alpha/')[1].toLowerCase();
              result = data.filter(c => c.cca3 && c.cca3.toLowerCase() === code);
              // A rota alpha geralmente retorna um array com 1 país
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      }
    }
  ]
})