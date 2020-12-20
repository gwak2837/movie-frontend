import { Card } from 'antd'
import PageLayout from 'src/components/layouts/PageLayout'
import MovieCard from 'src/components/MovieCard'
import PageTitle from 'src/components/PageTitle'
import { useMoviesQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/utils/apollo'

function HomePage() {
  const { data, loading, error } = useMoviesQuery({
    onError: handleApolloError,
  })

  console.log(process.env.NODE_ENV, process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL)

  const movies = data?.movies

  return (
    <PageTitle title="Movie App">
      <PageLayout>
        {loading && <Card loading={loading} />}
        {error && <div>Error occured</div>}
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </PageLayout>
    </PageTitle>
  )
}

export default HomePage
