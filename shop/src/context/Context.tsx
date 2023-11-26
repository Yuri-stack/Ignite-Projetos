import { ReactNode, createContext, useState } from "react";

export interface IProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    numberPrice: number;
    description: string;
    defaultPriceId: string;
}

interface ContextProps {
    cartItems: IProduct[]
    cartTotal: number
    addToCart: (product: IProduct) => void
    removeCartItem: (productiD: string) => void
    checkIfProductAlreadyInCart: (productiD: string) => boolean
}

interface CartContextProviderProps {
    children: ReactNode
}

export const Context = createContext({} as ContextProps)

export function ContextProvider({ children }: CartContextProviderProps){
    const [cartItems, setCartItems] = useState<IProduct[]>([])

    const cartTotal = cartItems.reduce((total, product) => {
        return total + product.numberPrice
    }, 0)

    function addToCart(product: IProduct){
        setCartItems((state) => [...state, product])
    }

    function removeCartItem(productId: string){
        setCartItems(state => state.filter(item => item.id !== productId))
    }

    function checkIfProductAlreadyInCart(productId: string){
        return cartItems.some((product) => product.id === productId)
    }

    return(
        <Context.Provider value={{ cartItems, cartTotal, addToCart, removeCartItem, checkIfProductAlreadyInCart }}>
            { children }
        </Context.Provider>
    )
}