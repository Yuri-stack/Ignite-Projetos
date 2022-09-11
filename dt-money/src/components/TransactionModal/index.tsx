import * as z from 'zod'
import * as Dialog from '@radix-ui/react-dialog';
import { Controller, useForm } from "react-hook-form";
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod'

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

// Descrevendo a estrutura do campo a ser pesquisado
const TransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

// Tipando o Form
type TransactionFormInputs = z.infer<typeof TransactionFormSchema>

export function TransactionModal() {
    const { control, register, handleSubmit, formState: { isSubmitting } } = useForm<TransactionFormInputs>({
        resolver: zodResolver(TransactionFormSchema),
        defaultValues: { type: 'income' }
    })

    async function handleCreateTransaction(data: TransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateTransaction)}>
                    <input {...register('description')} type="text" placeholder='Descrição' required />
                    <input {...register('price', { valueAsNumber: true })} type="number" placeholder='Preço' required />
                    <input {...register('category')} type="text" placeholder='Categoria' required />

                    {/* Trabalhando com campos não nativos do Html - usando Controlled Components */}
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={ field.onChange } value={ field.value }>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}
