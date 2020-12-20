import { useContext } from 'react'
import { getEmailNameFrom } from 'src/utils/commons'
import styled from 'styled-components'
import ClickableLink from './atoms/ClickableLink'
import Loading from './atoms/Loading'
import { AuthenticationContext } from './contexts/AuthenticationProvider'
import LogoutButton from './LogoutButton'

const FlexContainer = styled.div`
  min-width: 250px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(45deg, #ddffe0 0%, #c6dfdc 50%, #ccc8e6 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const RightAlign = styled.div``

function Header() {
  const { user } = useContext(AuthenticationContext)

  return (
    <header>
      <FlexContainer>
        <ClickableLink href="/" name="Home" />
        {user ? (
          <RightAlign>
            <ClickableLink href={`/@${getEmailNameFrom(user.email)}`} name="내 정보" />
            <LogoutButton />
          </RightAlign>
        ) : user === null ? (
          <RightAlign>
            <ClickableLink href="/register" name="회원가입" inline />
            <ClickableLink href="/login" name="로그인" inline />
          </RightAlign>
        ) : (
          <Loading />
        )}
      </FlexContainer>
    </header>
  )
}

export default Header
