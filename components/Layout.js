import axios from "axios"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import Image from "next/dist/client/image"
import useSWR from "swr"

export const Layout = ({children}) => {
  const router = useRouter()
  const fetcher = url => axios.get(url).then(res => res.data.data)
  const API_LINK = "http://193.46.199.82:5000/api/contacts"
  const {data: items, error: itemsError} = useSWR(API_LINK, fetcher)

  if (!items) return <h1>{router.locale === "uk" ? "Помилка завантаження" : "Loading error"}</h1>


  return <div className="text-center">
    <h1>{router.locale === "uk" ? "Хедер" : "Header"}</h1>
    {items.map((item, index) => (
      <div key={item._id}>
        <Image 
          src={`http://193.46.199.82:5000/${item.imgUrl}`}
          height={10}
          width={10}
        />
        <Link href={item.link}>
          {router.locale === "uk" ? item.title_ua : item.title_en}
        </Link>
      </div>
    ))}
    {children}
  </div>
}

export default Layout