import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from "next-i18next"
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'

const API_LINK = "http://193.46.199.82:5000"

export default function Home(props) {
  const {contacts} = props
  const router = useRouter()
  const { t } = useTranslation("common");

  console.log(router.asPath)

  return <div className="container">
    <main>
      <h1>{t("test")}</h1>
      <div className="description">
        <Image 
          src="https://images.unsplash.com/photo-1642730496092-2f5942cd881d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
          width="200px"
          height="100px"
        />
        {contacts ? contacts.map(contact => (
          <div key={contact._id}>
            <span 
              style={{ color: 'black' }}>
            <Image 
              src={`http://193.46.199.82:5000/${contact.imgUrl}`} 
              height="17px"
              width="17px"  
            />
              <Link 
                href={`${contact._id}`}
                style={{ fontSize: 16, fontWeight: 600, marginLeft: 5 }}>
                {router.locale == "uk" ? contact.title_ua : contact.title_en}
              </Link>
            </span>
          </div>
        )) : null}
      </div>
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
    <Link href="/infinite-scroll">{router.locale === "uk" ? "Сторінка зі скролом" : "Page with scroll"}</Link>
    </main>
  </div>
}


export const getServerSideProps = async ({locale}) => {
  const CONTACTS_URL = `${API_LINK}/api/contacts`
  const contactsData = await axios.get(CONTACTS_URL)
  const contacts = contactsData.data.data

  
  return { 
    props: { 
      contacts, 
      ...await serverSideTranslations(locale) 
    } 
  }
}