import { useRouter } from 'next/dist/client/router'
import Loading from 'src/components/atoms/Loading'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import { useMovieQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/utils/apollo'

function MovieDetailPage() {
  const router = useRouter()

  const id = Number(router.query.id)

  const { data, loading, error } = useMovieQuery({
    onError: handleApolloError,
    variables: { id },
  })

  const movie = data?.movie

  return (
    <PageTitle title="Movie App - Detail">
      <PageLayout>
        {loading && <Loading />}
        {error && <div>오류 발생</div>}
        {movie && (
          <>
            <div>{`id ${movie.id}`}</div>
            <div>{`제목 ${movie.name}`}</div>
            <div>{`평점 ${movie.rating}`}</div>
          </>
        )}
      </PageLayout>
    </PageTitle>
  )
}

export default MovieDetailPage
