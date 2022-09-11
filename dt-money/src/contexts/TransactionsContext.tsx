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

interface createTransactionInput{
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: createTransactionInput) => Promise<void>
}

interface TransactionProviderType {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderType) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function fetchTransactions(query?: string) {

    // q representa o paramentro de busca, seguindo a docs. da Fetch API
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: createTransactionInput) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })

    setTransactions(state => [...state, response.data])

  }

  useEffect(() => {
    fetchTransactions()
  }, [])


  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}