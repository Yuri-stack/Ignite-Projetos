import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'

import './global.css'

export function App() {
	return (
		<RouterProvider router={router} />
	)
}