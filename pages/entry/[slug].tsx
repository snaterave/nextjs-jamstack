//import { useState } from 'react'
//import { useRouter } from 'next/dist/client/router'
import { getCategoryList, getPlant, getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PlantEntryInline } from '@components/PlantCollection'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

type PathType = {
  params: {
    slug: string
  }
}

// 2. Qué páginas se renderizan
// Esta función determina todas las rutas que se pre-renderizarán en tiempo de construcción.
export const getStaticPaths = async () => {
  // Aquí obtenemos la lista de plantas para luego generar las rutas.
  const entries = await getPlantList({ limit: 10 })

  // Creamos la lista de rutas a partir de la lista de plantas.
  const paths: PathType[] = entries.map((plant) => ({
    params: {
      slug: plant.slug,
    },
  }))

  // Devolvemos la lista de rutas y establecemos el fallback en false, lo que significa que si se intenta acceder a una ruta que no está en la lista, se mostrará una página 404.
  return {
    paths,
    fallback: 'blocking',
    //fallback: true,
  }
}

// Definición de los props para este componente.
type PlantEntryProps = {
  plant: Plant
  otherEntries: Plant[] | null
  categories: Category[] | null
}

// 1. alimentar el detalle
// params = parametro que viene con el server sidew
// Esta función se encarga de obtener los datos necesarios para pre-renderizar la página.
export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({
  params,
}) => {
  const slug = params?.slug

  // Comprueba si el slug es de tipo string, si no, devuelve notFound.
  if (typeof slug !== 'string') {
    return { notFound: true }
  }

  // Intenta obtener los datos de la planta, otras entradas y categorías. Si falla, devuelve notFound.
  try {
    const plant = await getPlant(slug)
    const otherEntries = await getPlantList({ limit: 5 })
    const categories = await getCategoryList({ limit: 10 })

    return {
      props: {
        plant,
        otherEntries,
        categories,
      },
      revalidate: 5 * 60, // refresh 5min
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

// {plant} = recibe la info desde el servidor
export default function PlantEntryPage({
  plant,
  otherEntries,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /*const router = useRouter()
  console.log(' router = ', router)
  if (router.isFallback) {
    console.log(' entras')
    return <Layout>Loading</Layout>
  } else {
    console.log('no entra')
  }*/
  //const [status, setStatus] = useState<QueryStatus>('idle')
  /*const [status, setStatus] = useState<QueryStatus>('idle')
  const router = useRouter()
  const slug = router.query.slug // slug es el nombre del archivo dinámico en los folders

  // client side
  // [slug] = cada vez que cambie el slug se vuelve a renderizar con los nuevos valores
  useEffect(() => {
    // Validamos que sea solo string
    if (typeof slug !== 'string') return

    setStatus('loading')
    getPlant(slug)
      .then((data) => {
        setPlant(data)
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [slug])

  if (status === 'loading' || status === 'idle') {
    return (
      <Layout>
        <main>Loading ...</main>
      </Layout>
    )
  }

  if (plant === null || status === 'error') {
    return (
      <Layout>
        <main>404, no encontrado</main>
      </Layout>
    )
  }*/
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img width={952} src={plant.image.url} alt={plant.image.title} />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName} </Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>

        {/*Esta sección se encarga de renderizar el aside del layout.*/}
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              Recent post
            </Typography>
          </section>

          {/*Aquí mapeamos y renderizamos las otras entradas de plantas obtenidas.*/}
          {otherEntries?.map((plantEntry) => (
            <article className="mb-4" key={plantEntry.id}>
              <PlantEntryInline {...plantEntry} />
            </article>
          ))}

          {/*Sección para renderizar las categorías.*/}
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              Categories
            </Typography>
            <ul className="list">
              {/*Mapeamos y renderizamos las categorías obtenidas.*/}
              {categories?.map((category) => (
                <li key={category.id}>
                  {/*Aquí utilizamos el componente Link de Next.js para crear enlaces a las páginas de las categorías.*/}
                  <Link passHref href={`/category/${category.slug}`}>
                    <Typography variant="h6" component="a">
                      {category.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Grid>
      </Grid>

      {/*Sección para renderizar la tarjeta del autor de la planta.*/}
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  )
}
