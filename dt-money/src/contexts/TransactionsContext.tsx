import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transactions {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: string
  }

interface TransactionContextType{
    transactions: Transactions[]
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionProviderType{
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderType){

    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransactions(query?: string) {
      
      // q representa o paramentro de busca, seguindo a docs. da Fetch API
      const response = await api.get('transactions', {
        params: {
          q: query
        }
      })
  
      setTransactions(response.data)
    }
  
    useEffect(() => {
      fetchTransactions()
    }, [])


    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
            { children }
        </TransactionsContext.Provider>
    )
}