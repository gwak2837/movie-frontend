import Link from 'next/link'
import { useContext } from 'react'
import { getEmailNameFrom } from 'src/utils/commons'
import styled from 'styled-components'
import Loading from './atoms/Loading'
import { AuthenticationContext } from './contexts/AuthenticationProvider'
import LogoutButton from './LogoutButton'

const Margin = styled.span`
  margin: 1rem;
`

function Header() {
  const { user } = useContext(AuthenticationContext)

  return (
    <header>
      <Margin>
        <Link href="/">
          <a href="/">Home</a>
        </Link>
      </Margin>
      {user ? (
        <>
          <Margin>
            <Link href={`/@${getEmailNameFrom(user.email)}`}>
              <a href={`/@${getEmailNameFrom(user.email)}`}>내 정보</a>
            </Link>
          </Margin>
          <LogoutButton />
        </>
      ) : user === null ? (
        <>
          <Margin>
            <Link href="/register">
              <a href="/register">회원가입</a>
            </Link>
          </Margin>
          <Margin>
            <Link href="/login">
              <a href="/login">로그인</a>
            </Link>
          </Margin>
        </>
      ) : (
        <Loading />
      )}
    </header>
  )
}

export default Header
