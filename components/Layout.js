import axios from "axios"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
// import Image from "next/dist/client/image"
import useSWR from "swr"

export const Layout = ({children}) => {
  const router = useRouter()
  const fetcher = url => axios.get(url).then(res => res.data)
  const API_LINK = "https://rickandmortyapi.com/api/character"
  const {data: items, error: itemsError} = useSWR(API_LINK, fetcher)

  if (!items) return <h1>{router.locale === "uk" ? "Помилка завантаження" : "Loading error"}</h1>

  // console.log(items)


  return <div className="text-center">
    <h1>{router.locale === "uk" ? "Хедер" : "Header"}</h1>
    {items.results.slice(0,5).map(item => (
      <span style={{ marginRight: 30 }} key={item._id}>
        <img 
          src={item.image}
          alt={item.name}
        />
      </span>
    ))}
    {children}
  </div>
}

export default Layout