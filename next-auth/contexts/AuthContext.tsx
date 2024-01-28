import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { setCookie } from "nookies";
import { api } from "../services/api";

type User = {
    email: string
    permissions: string[]
    roles: string[]
}

type signInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: signInCredentials): Promise<void>
    user: User
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User>()

    const isAuthenticated = !!user
    
    async function signIn({ email, password }: signInCredentials){
        try {
            const response = await api.post('sessions', { email, password })

            const { token, refreshToken, permissions, roles } = response.data

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,   // 30 dias
                path: '/'
            })
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,   // 30 dias
                path: '/'
            })

            setUser({ email, permissions, roles })

            Router.push('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
            { children }
        </AuthContext.Provider>
    )
}