import axios from "axios";
import { useRouter } from "next/dist/client/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query"
import Link from "next/link";

export default function scroll() {
  const router = useRouter()
  // const API_LINK = 'https://kosht-api.herokuapp.com/api/posts'
  const API_LINK = 'https://rickandmortyapi.com/api/character'

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1}) =>
      await axios.get(`${API_LINK}?page=${pageParam}`).then(result => result.data),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.info.next) {
            return pages.length + 1
          }
        },
      }
  );

  console.log(data)

  return <div>
    <h1 className="text-center">{router.locale === "uk" ? "Безкінечний скрол" : "Infinite scroll"}</h1>
    <Link href="/">
      {router.locale === "uk" ? "Назадж на головну" : "Back to main"}
    </Link>
    <main>
      <InfiniteScroll 
        dataLength={data?.pages.length * 20}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h3>{router.locale === "uk" ? "Завантаження..." : "Loading..."}</h3>}
      >
        {data?.pages.map((page) => (
          <>
            {page.results.map((character) => (
              <article key={character.id}>
                <img
                  src={character.image}
                  alt={character.name}
                  height={250}
                  loading='lazy'
                  width={"100%"}
                />
                <div className='text'>
                  <p>Name: {character.name}</p>
                  <p>Lives in: {character.location.name}</p>
                  <p>Species: {character.species}</p>
                  <i>Id: {character.id} </i>
                </div>
              </article>
            ))}
          </>
        ))}

        {/* {data?.pages.map(i => (
          i.data.map(res => (
          <div 
            className="text-center" 
            key={res._id}
          >
            <h3>{res.title}</h3>
            <p>{res.body}</p>
          </div>)
        ))) } */}
      </InfiniteScroll>
    </main>
  </div>;
}
