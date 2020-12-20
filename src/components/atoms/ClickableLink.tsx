import Link from 'next/link'
import { memo, useCallback, useRef } from 'react'
import styled from 'styled-components'

const Padding = styled.div<{ inline?: boolean }>`
  padding: 1rem;
  display: ${(p) => (p.inline ? 'inline-block' : 'block')};
  transition: transform 200ms cubic-bezier(0.4, 1, 0.75, 0.9),
    background-color 200ms cubic-bezier(0.4, 1, 0.75, 0.9);

  &:hover {
    background-color: #dddddd;
    cursor: pointer;
  }
`

type Props = {
  href: string
  name: string
  inline?: boolean
}

function ClickableLink({ href, name, inline }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleClick = useCallback(() => {
    linkRef.current?.click()
  }, [])

  return (
    <Padding onClick={handleClick} inline={inline}>
      <Link href={href}>
        <a href={href} ref={linkRef}>
          {name}
        </a>
      </Link>
    </Padding>
  )
}

export default memo(ClickableLink)
