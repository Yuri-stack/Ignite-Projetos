import { useContextSelector } from "use-context-selector";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formater";

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
  // Selecionando apenas a info que queremos do context, para evitar render. desnecessárias
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

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
                        { transaction.type === 'outcome' && '- ' }
                        { priceFormatter.format(transaction.price) }
                      </PriceHighlight>
                    </td>
                    <td>{ transaction.category }</td>
                    <td>{ dateFormatter.format(new Date(transaction.createdAt)) }</td>
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
