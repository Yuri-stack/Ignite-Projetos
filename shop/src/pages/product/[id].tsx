import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta 1</h1>
        <span>R$ 79,99</span>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime nobis in asperiores iure nihil eum non culpa consectetur nesciunt porro animi labore accusamus, libero officia voluptas sequi? Molestiae, doloribus dolores!
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
