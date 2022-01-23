import axios from "axios"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"

const API_LINK = "http://193.46.199.82:5000/api"

export default function Contact({ contact, locale }) {
  const router = useRouter()

  return <div className="container">
    <main>
      <h1>Contact component</h1>
      <h3>{ router.locale === "uk" ? contact.title_ua : contact.title_en }</h3>
      <Link href="/">Back to index</Link>
      <div style={{ paddingTop: 30 }}>
        <ul style={{ listStyleType: 'none' }}>
          {router.locales.map(item => (
            <li key={item}>
              <Link 
                href={item == "uk" ? router.asPath : `/en${router.asPath}`}
                locale={item}
              >{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  </div>
} 


export const getStaticProps = async context => {
  const _id = context.params._id
  const res = await axios.get(`${API_LINK}/contacts/${_id}`)
  const contact = res.data.data

  return { props: { contact } }
}

export const getStaticPaths = async ({locales}) => {
  const res = await axios.get(`${API_LINK}/contacts`)
  const contacts = res.data.data

  const paths = contacts.map(contact => (
    {params: { _id: contact._id }, locale: 'en'},
    {params: { _id: contact._id }, locale: 'uk'}
  ))

  return { paths, fallback: 'blocking' }
}