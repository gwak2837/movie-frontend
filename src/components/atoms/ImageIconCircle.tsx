import { memo } from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  margin: auto;
  padding-top: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0),
    0 1px 1px rgba(16, 22, 26, 0.2);
`

const Image = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

type Props = {
  alt: string
  src: string
}

function ImageIconCircle({ alt, src }: Props) {
  return (
    <ImageWrapper>
      <Image alt={alt} src={src} />
    </ImageWrapper>
  )
}

export default memo(ImageIconCircle)
