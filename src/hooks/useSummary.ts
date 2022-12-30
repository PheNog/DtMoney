import { useContext } from "react"
import { TransactionsContext } from "../contexts/TransactionsContext"

export function useSummary(){
    const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce(
        (acc, transaction) => {
            transaction.type === 'income' ? acc.income+= transaction.price / 100 : acc.outcome+= transaction.price /100
            acc.total = acc.income - acc.outcome
            return acc
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )
    return summary
}