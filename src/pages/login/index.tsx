import { useContext } from 'react'
import { AuthenticationContext } from 'src/components/contexts/AuthenticationProvider'
import PageLayout from 'src/components/layouts/PageLayout'
import LoginForm from 'src/components/LoginForm'
import PageTitle from 'src/components/PageTitle'
import useRedirectTo from 'src/hooks/useRedirectTo'
import styled from 'styled-components'

export const FlexContainerCenter = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function LoginPage() {
  const { user } = useContext(AuthenticationContext)

  useRedirectTo('/', Boolean(user))

  return (
    <PageTitle title="Movie App - Login">
      <PageLayout>
        <FlexContainerCenter>
          <LoginForm />
        </FlexContainerCenter>
      </PageLayout>
    </PageTitle>
  )
}

export default LoginPage
