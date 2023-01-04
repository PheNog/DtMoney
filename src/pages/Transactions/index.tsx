import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsTable, TransactionsTableContainer } from "./styles";
import { useContextSelector } from 'use-context-selector'



export function Transactions() {

    const transactions = useContextSelector(TransactionsContext, (ctx)  => {
        return ctx.transactions
    })

    return (
        <div>
            <Header />
            <Summary />
            <TransactionsTableContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {priceFormatter.format(transaction.price / 100)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsTableContainer >
        </div>
    )
}