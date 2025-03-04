import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
 server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});
>>>>>>> 1342fe2573a7b00321d7aaca583e3aa30f571559
