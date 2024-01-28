import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { ThemeProvider } from './components/theme/theme-provider'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import './global.css'

export function App() {
	return (
		<HelmetProvider>
			<ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
				<Helmet titleTemplate='%s | Pizza Shop' />
				<Toaster richColors />
				<RouterProvider router={router} />
			</ThemeProvider>
		</HelmetProvider>
	)
}