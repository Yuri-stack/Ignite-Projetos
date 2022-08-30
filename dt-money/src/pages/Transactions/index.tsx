import { useContext } from "react";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function Transactions() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>

            {
              transactions.map(transaction => {
                return (
                  <tr key={ transaction.id }>
                    <td width="50%">{ transaction.description }</td>
                    <td>
                      <PriceHighlight variant={ transaction.type }>
                        { transaction.price }
                      </PriceHighlight>
                    </td>
                    <td>{ transaction.category }</td>
                    <td>{ transaction.createdAt }</td>
                  </tr>
                )
              })
            }

          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}