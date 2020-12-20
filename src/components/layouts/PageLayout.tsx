import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'
import Navigation from '../Navigation'

const GridContainer = styled.div`
  min-width: 250px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 57px 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'header header'
    ' nav    main '
    ' nav   footer';

  @media (max-width: 634px) {
    grid-template-rows: 57px auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      ' nav  '
      ' main '
      'footer';
  }
`

const GridItemHeader = styled.div`
  grid-area: header;
`

const GridItemNav = styled.div`
  grid-area: nav;
`

const GridItemMain = styled.main`
  grid-area: main;
  padding: 1rem;
`

const GridItemFooter = styled.div`
  grid-area: footer;
`

type Props = {
  children: ReactNode
}

// 모든 페이지에서 쓰이는 공통 레이아웃
function PageLayout({ children }: Props) {
  return (
    <GridContainer>
      <GridItemHeader>
        <Header />
      </GridItemHeader>
      <GridItemNav>
        <Navigation />
      </GridItemNav>
      <GridItemMain>{children}</GridItemMain>
      <GridItemFooter>
        <Footer />
      </GridItemFooter>
    </GridContainer>
  )
}

export default PageLayout
