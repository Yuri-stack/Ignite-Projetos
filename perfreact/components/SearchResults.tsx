/* eslint-disable react/jsx-key */
import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
    results: Array<{
        id: number
        price: number
        title: string
    }>
}

export default function SearchResults({ results }: SearchResultsProps) {
    const totalPrice = useMemo(() => {
        return results.reduce((total, product) => {
            return total + product.price
        }, 0)
    }, [results])

    return (
        <div>
            <h2>{totalPrice}</h2>
            {results.map(product => (
                <ProductItem product={product} />
            ))}
        </div>
    )
}
