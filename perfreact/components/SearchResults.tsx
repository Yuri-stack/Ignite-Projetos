import ProductItem from "./ProductItem"

interface SearchResultsProps {
    results: Array<{
        id: number
        price: string
        title: string
    }>
}

export default function SearchResults({ results }: SearchResultsProps) {
    return (
        <div>
            {results.map(product => (
                <ProductItem product={product} />
            ))}
        </div>
    )
}
