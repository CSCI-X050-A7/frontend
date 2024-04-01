import Footer from 'components/Footer'
import Header from 'components/Header'
import type React from 'react'
import Container from 'react-bootstrap/Container'

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <div className='d-flex flex-column h-100'>
    <Header />
    <Container className='my-3'>{children}</Container>
    <Footer />
  </div>
)
export default PageContainer
