import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {   //remove the problem of cors "IT IS ONE WAY TO REMOVE CORS ERROR ,ANOTHER WAY IS BY NPM CORS PAKG WHICH I DIDNT USE HERE"
      '/api' : 'http://localhost:4000'
    }
  },
  plugins: [react()],
})
