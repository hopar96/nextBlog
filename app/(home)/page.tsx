import Link from 'next/link'
import { API_URL } from '../../lib/constants'

export const metadata = {
  title: 'Home',
}

async function getMovies() {
  const response = await fetch(API_URL)
  const json = await response.json()
  return json
}

export default async function Home() {
  const movies = await getMovies()

  return (
    <div>
      {movies.map((movie: any) => (
        <li key={movie.id}>
          <Link className="underline" href={`/blog/${movie.id}`}>
            {movie.title}
          </Link>
          {/* prefetch 미리 로딩  */}
          {/* <Link prefetch href={`/blog/${movie.id}`}>{movie.title}</Link> */}
        </li>
      ))}
    </div>
  )
}

/* 
const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    
    const getMovies = async () => {
    
        const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
        const json = await response.json();
        setMovies(json);
        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);
*/
