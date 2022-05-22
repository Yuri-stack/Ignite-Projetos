import { useQuery } from "react-query"
import { api } from "../api"

type User = {
    id: string
    name: string
    email: string
    createdAt: string
}

export async function getUsers(): Promise<User[]> {
    const { data } = await api.get('users')

    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return users
}

export function useUsers() {
    return useQuery('users', getUsers, {
        // Indica que por 5segundos ele não precisará recarrega os dados, após a pagina ser visitada novamente
        staleTime: 1000 * 5
    })
}