import axios from "axios"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/dist/client/image"

export const Layout = ({children}) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const API_LINK = "http://193.46.199.82:5000/api/contacts"

  useEffect(async () => {
    setItems(await axios.get(API_LINK).then(res => res.data.data))
  }, [])

  console.log(items)

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