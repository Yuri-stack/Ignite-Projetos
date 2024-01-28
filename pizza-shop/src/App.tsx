import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import './global.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate='%s | Pizza Shop' />
			<RouterProvider router={router} />
		</HelmetProvider>
	)
}