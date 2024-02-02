import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { Toaster } from 'sonner'
import { queryClient } from './lib/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme/theme-provider'

import './global.css'

export function App() {
	return (
		<HelmetProvider>
			<ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
				<Helmet titleTemplate='%s | Pizza Shop' />
				<Toaster richColors />
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ThemeProvider>
		</HelmetProvider>
	)
}