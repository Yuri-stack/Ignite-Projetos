import Image from "next/image";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react';
import { HomeContainer, Product } from "../styles/pages/home";
import { CartButton } from "../components/CartButton";
import { useCart } from "../hooks/useCart";
import { IProduct } from "../context/Context";

import { stripe } from '../lib/stripe'
import 'keen-slider/keen-slider.min.css';
import { MouseEvent } from "react";

interface HomeProps {
    products: IProduct[]
}

export default function Home({ products }: HomeProps) {
    const [slideRef] = useKeenSlider({
        slides: { perView: 3, spacing: 48 }
    })

    const { addToCart, checkIfProductAlreadyInCart } = useCart()

    function handleAddToCart(e: MouseEvent<HTMLButtonElement>, product: IProduct){
        e.preventDefault()
        addToCart(product)
    }

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>

            <HomeContainer ref={slideRef} className="keen-slider">
                {
                    products.map(product => {
                        return (
                            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                                <Product className="keen-slider__slide">
                                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                                    <footer>
                                        <div>
                                            <strong>{product.name}</strong>
                                            <span>{product.price}</span>
                                        </div>
                                        <CartButton 
                                            color="green" 
                                            size="large" 
                                            disabled = { checkIfProductAlreadyInCart(product.id) }
                                            onClick={(e) => handleAddToCart(e, product)}   
                                        />
                                    </footer>
                                </Product>
                            </Link>
                        )
                    })
                }
            </HomeContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price'],
        active: true
    })

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            numberPrice: price.unit_amount / 100,
            defaultPriceId: price.id,
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(price.unit_amount! / 100)
        }
    })

    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2, // 2horas
    }
}