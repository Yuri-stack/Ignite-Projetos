import { useContext } from "react";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
    const { transactions } = useContext(TransactionsContext)

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>
                <strong>R$17.000</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>
                <strong>R$17.000</strong>
            </SummaryCard>

            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>
                <strong>R$17.000</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}