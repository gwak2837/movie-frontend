import styled from 'styled-components'
import ClickableLink from './atoms/ClickableLink'

const Nav = styled.nav`
  height: 100%;
  background-color: #f8f8f8;
`

function Navigation() {
  return (
    <Nav>
      <ClickableLink href="/about" name="About" />
    </Nav>
  )
}

export default Navigation
