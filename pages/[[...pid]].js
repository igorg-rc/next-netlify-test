import Head from 'next/head'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from "next-i18next"
import axios from 'axios'
import Image from 'next'
import { useRouter } from 'next/dist/client/router'

const API_LINK = "http://193.46.199.82:5000"

export default function Home(props) {
  const {contacts} = props
  const router = useRouter()
  const { t } = useTranslation("common");

  // console.log(contacts)
  
  return <div className="container">
    <main>
      <h1>{t("test")}</h1>
      <div className="description">
        {contacts ? contacts.map(contact => (
          <div key={contact._id}>
            <h3 style={{ color: 'black' }}>{router.locale == "uk" ? contact.title_ua : contact.title_en}</h3>
            {/* <Image src={`${API_LINK}/${contact.imgUrl}`} /> */}
          </div>
        )) : null}
      </div>
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