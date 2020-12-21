import { Card } from 'antd'
import { useEffect } from 'react'
import Error from 'src/components/atoms/Error'
import PageLayout from 'src/components/layouts/PageLayout'
import MovieCard from 'src/components/MovieCard'
import PageTitle from 'src/components/PageTitle'
import { useMoviesQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/utils/apollo'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
`

function HomePage() {
  const { data, loading, error } = useMoviesQuery({
    onError: handleApolloError,
  })

  useEffect(() => {
    console.log(process.env.NODE_ENV, process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL)
  }, [])

  const movies = data?.movies

  return (
    <PageTitle title="Movie App">
      <PageLayout>
        {loading && <Card loading={loading} />}
        {error && <Error />}
        <GridContainer>
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </GridContainer>
      </PageLayout>
    </PageTitle>
  )
}

export default HomePage
