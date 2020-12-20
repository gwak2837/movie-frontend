import Link from 'next/link'
import styled from 'styled-components'

const Margin = styled.div`
  margin: 1rem;
`

function Navigation() {
  return (
    <nav>
      <Margin>
        <Link href="/about">
          <a href="/about">About</a>
        </Link>
      </Margin>
    </nav>
  )
}

export default Navigation
