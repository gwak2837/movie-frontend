import ClickableCard from './atoms/ClickableCard'

type Props = {
  movie: {
    id: number
    name: string
  }
}

function MovieCard({ movie }: Props) {
  return <ClickableCard href={`/movies/${movie.id}`}>{movie.name}</ClickableCard>
}

export default MovieCard
