import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    category: string
    price: number
    createdAt: string
}

interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query: string) => Promise<void>
    createTransaction: (data: CreateNewTransaction) => Promise<void>
}

interface TransactionProviderProps {
    children: ReactNode
}

interface CreateNewTransaction {
    category: string;
    description: string;
    price: number;
    type: "income" | "outcome";
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const teste = await api.get('/transactions', {
            params: {
                _sort: 'createdAt',
                q: query,
                _order: 'desc'
            }
        })
        setTransactions(teste.data)
    }

    async function createTransaction(data: CreateNewTransaction) {
        const { category, description, price, type } = data

        const resCreateTransaction = await api.post('/transactions', {
            category,
            description,
            price,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [resCreateTransaction.data, ...state],)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
        }} >
            {children}
        </TransactionsContext.Provider>
    )
}