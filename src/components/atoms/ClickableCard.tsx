import { Card } from 'antd'
import Link from 'next/link'
import { ReactNode, useCallback, useRef } from 'react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  transition: transform 200ms cubic-bezier(0.4, 1, 0.75, 0.9),
    box-shadow 200ms cubic-bezier(0.4, 1, 0.75, 0.9);

  &:hover {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
      0 8px 24px rgba(16, 22, 26, 0.2);
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0),
      0 1px 1px rgba(16, 22, 26, 0.2);
    opacity: 0.9;
    transition-duration: 0;
  }
`

type Props = {
  children: ReactNode
  href: string
}

function ClickableCard({ children, href }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleClick = useCallback(() => {
    linkRef.current?.click()
  }, [])

  return (
    <StyledCard onClick={handleClick}>
      <Link href={href}>
        <a href={href} ref={linkRef}>
          {children}
        </a>
      </Link>
    </StyledCard>
  )
}

export default ClickableCard
