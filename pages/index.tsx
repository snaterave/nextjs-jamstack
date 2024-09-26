//import { useEffect, useState } from 'react'
import { getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Hero } from '@components/Hero'
import { Authors } from '@components/Authors'

// Aquí estás definiendo un tipo para los props de tu página de inicio.
// De acuerdo con este tipo, espera recibir un arreglo de plantas.
type HomeProps = {
  plants: Plant[]
}
// Solo funciona en pages
// La función getStaticProps es una característica de Next.js que te permite pre-renderizar tu página en el momento de la construcción.
// En este caso, estás obteniendo una lista de plantas de tu API y pasándolas como props a tu componente de página de inicio.
// getStaticProps = corre en el servidor
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const plants = await getPlantList({ limit: 10 })
  return {
    props: {
      plants,
    },
    revalidate: 5 * 60, // refresh 5min
  }
}

// Este es el componente de tu página de inicio.
// Recibe las plantas como props debido a la función getStaticProps que definiste anteriormente.
export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //const [data, setData] = useState<Plant[]>([]);

  // Renderin gdesde el navegador
  /*useEffect(() => {
    getPlantList({ limit: 10 }).then((response) => setData(response))
  }, [])*/

  return (
    // Estás envolviendo todo tu contenido de la página de inicio en un componente Layout.
    <Layout>
      // El componente Hero recibe la primera planta de tu lista de plantas como
      props. Le estás dando una margen inferior con la clase 'mb-20'.
      <Hero {...plants[0]} className="mb-20" />
      // El componente Authors es mostrado a continuación, también con un margen
      inferior definido.
      <Authors className="mb-10" />
      // El componente PlantCollection se usa para mostrar tus plantas. Primero,
      muestras las plantas de la posición 1 a la 3 en forma vertical con un
      margen inferior.
      <PlantCollection
        plants={plants.slice(1, 3)}
        variant="vertical"
        className="mb-24"
      />
      // Luego, si tienes más de 8 plantas, muestras las plantas de la posición
      3 a la 9 en forma cuadrada. Si tienes menos de 8, muestras todas las
      plantas restantes.
      <PlantCollection
        plants={plants.length > 8 ? plants.slice(3, 9) : plants}
        variant="square"
      />
    </Layout>
  )
}
