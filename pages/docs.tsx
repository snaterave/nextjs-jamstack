import { Grid } from '@ui/Grid'
import { Button } from '@ui/Button'
import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { useEffect } from 'react'
import { getPlantList } from '@api'

/*const fetchPlants = () =>
  fetch('https://graphql.contentful.com/content/v1/spaces/0fa2l7xdmk0r', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer 7Ssc1BzNhvDwDvx2ez4_25e-6VVBRcQh2bsyrbfj3dA',
    },
    body: JSON.stringify({
      query: `{
        plantCollection (limit:10){
          total
          limit
          items{
            plantName
            author{
              fullName
              }
          }
        }
      }`,
    }),
  })
  */

export default function Home() {
  useEffect(() => {
    /*fetchPlants()
      .then((response) => response.json())
      .then((data) => console.log(data))*/
    // Esta es una configuracion que se hace entre contenful y graphQL
    getPlantList({ limit: 10 }).then((data) => {
      data.forEach((item) => {
        console.log(item.author.fullName)
      })
    })
  }, [])
  return (
    <Layout>
      <Typography variant="h2" className="text-center">
        👋 Curso de Next.js
      </Typography>
      <div className="max-w-5xl mx-auto my-10">
        <Grid component="ul" container spacing={2}>
          {documentationList.map((doc) => (
            <Grid key={doc.title} component="li" item className="" xs={6}>
              <a
                href={doc.link}
                target="_blank"
                title={doc.title}
                className="p-4 border-2 border-gray-300 block hover:border-green-500 transition transition-colors duration-500"
              >
                <Typography variant="h5" className="mb-2">
                  {doc.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {doc.description}
                </Typography>
              </a>
            </Grid>
          ))}
        </Grid>
      </div>
      <footer className="text-center">
        <Button
          variant="outlined"
          color="primary"
          href="https://platzi.com/cursos/next-avanzado/"
        >
          🚀 Ir al curso
        </Button>
      </footer>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-nextjs-saga',
  },
  {
    title: 'Documentación Next.js',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación Contentful',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://www.contentful.com/developers/docs/references/content-delivery-api/',
  },
  {
    title: 'Curso de Next.js Básico',
    description:
      '¿Olvidates algo sobre Next.js? En el curso básico puedes refrescar tu memoria y aprender los fundamentos.',
    link: 'https://platzi.com/cursos/next/',
  },
]
