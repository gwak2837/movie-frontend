import { Card } from 'antd'
import Link from 'next/link'

type Props = {
  movie: {
    id: number
    name: string
  }
}

function MovieCard({ movie }: Props) {
  return (
    <Card>
      <Link href={`/movies/${movie.id}`}>
        <a href={`/movies/${movie.id}`}>{movie.name}</a>
      </Link>
    </Card>
  )
}

export default MovieCard
