import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'
import Loading from './atoms/Loading'
import { AuthenticationContext } from './contexts/AuthenticationProvider'
import LogoutButton from './LogoutButton'

const Margin = styled.span`
  margin: 1rem;
`

function Header() {
  const { loading, user } = useContext(AuthenticationContext)

  return (
    <header>
      <Margin>
        <Link href="/">
          <a href="/">Home</a>
        </Link>
      </Margin>
      {loading ? (
        <Loading />
      ) : user ? (
        <>
          <Margin>
            <Link href="/@${email}">
              <a href="/@${email}">내 정보</a>
            </Link>
          </Margin>
          <LogoutButton />
        </>
      ) : (
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
      )}
    </header>
  )
}

export default Header
