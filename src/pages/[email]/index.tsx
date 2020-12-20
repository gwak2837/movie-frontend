import { useContext } from 'react'
import { AuthenticationContext } from 'src/components/contexts/AuthenticationProvider'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import useRedirectTo from 'src/hooks/useRedirectTo'

function MyPage() {
  const { user } = useContext(AuthenticationContext)

  useRedirectTo('/login', !user, '로그인이 필요합니다. 로그인 페이지로 이동합니다.')

  return (
    <PageTitle title="Movie App - My Page">
      <PageLayout>
        {user && (
          <>
            <div>{`id ${user.id}`}</div>
            <div>{`이메일 ${user.email}`}</div>
            <div>{`이름 ${user.name}`}</div>
            <div>{`역할 ${user.role}`}</div>
          </>
        )}
      </PageLayout>
    </PageTitle>
  )
}

export default MyPage
