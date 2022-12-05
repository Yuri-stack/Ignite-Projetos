import Stripe from "stripe"
import Image from "next/image"
import Head from "next/head"
import axios from "axios"
import { useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    description: string
    defaultPriceId: string
    price: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  // Para o carregamento de itens que não tenham ID pré definido
  if (isFallback) {
    return <p>Loading...</p>
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      // Acessando a API Route e enviando o priceId
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      // Desestruturando a responsa da nossa função da API
      const { checkoutUrl } = response.data

      // Direciona para a Rota de checkout do Stripe
      window.location.href = checkoutUrl

    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  return (
    <>
      <Head>
        <title>{ product.name } | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

// Esse método serve para indicar ao Next quais são as paginas com params que queremos gerar versões estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  // Em um caso real, poderiamos filtrar os principais produtos e colocar os seus ID no path

  // Fallback (true): permite que produtos que não tem ID definido seja carregado, 
  // esperando que seja carregado, com a opção de fazer um Loading com o hook useRouter(isFallback)

  // Fallback ('blocking'): qualquer item sem id definido será carregado, 
  // mas dá a impressão que nada mudou, sem a opção de Loanding

  // Fallback (false): qualquer item sem id definido retorna 404

  return {
    paths: [
      { params: { id: 'prod_MkiHUXPT7YfkXL' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // No GetStaticProps passo um Generic. 
  // Primeiro param. (any) indica o tipo do retorno | return { props: TipoProps, ... }
  // Segundo param. indica a tipagem do params pego na url

  const productId = params?.id

  // Buscando os dados do Produto pelo id, diretamente do Stripe
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
