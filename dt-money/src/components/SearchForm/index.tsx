import * as z from 'zod'
import { memo } from 'react';
import { useContextSelector } from "use-context-selector";
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { SearchFormContainer } from "./styles";
 
// Descrevendo a estrutura do campo a ser pesquisado
const searchFormSchema = z.object({ query: z.string() })

// Tipando o Form
type searchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransaction(data: searchFormInputs){
        await fetchTransactions(data.query)
        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')} />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}

export const SearchForm = memo(SearchFormComponent)