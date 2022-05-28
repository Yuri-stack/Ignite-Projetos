import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationPros{
    totalCountOfRegisters: number
    registersPerPage?: number
    currentPage?: number
    onPageChange: (page: number) => void
}

const simblingsCount = 1 // Referece as pages antes e depois da atual. Ex: ... [4] 5 [6] ...

function generatePagesArray(from: number, to: number){
    return [... new Array(to - from)]
    .map((_, index) => {
        return from + index + 1
    })
    .filter(page => page > 0)
}

export function Pagination({ 
    totalCountOfRegisters, currentPage = 1, 
    registersPerPage = 10, onPageChange 
}: PaginationPros) {

    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - simblingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + simblingsCount, lastPage))
        : []

    return (
        <Stack
            direction={["column", "row"]} spacing="6" mt="8"
            justify="space-between" align="center"
        >
            <Box>
                <strong>8</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>

            <Stack direction="row" spacing="2">

                { currentPage > (1 + simblingsCount) && (
                    <>
                        <PaginationItem onPageChange={ onPageChange } number={ 1 } />
                        { currentPage > (2 + simblingsCount) && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        ) }
                    </>
                ) }

                { previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={ onPageChange } key={ page } number={ page } />
                }) }

                <PaginationItem onPageChange={ onPageChange } number={ currentPage } isCurrent />

                { nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem onPageChange={ onPageChange } key={ page } number={ page } />
                }) }

                { (currentPage + simblingsCount) < lastPage && (
                    <>
                        { (currentPage + 1 + simblingsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        ) }
                        <PaginationItem onPageChange={ onPageChange } number={ lastPage } />
                    </>
                ) }

            </Stack>
        </Stack>
    )
}