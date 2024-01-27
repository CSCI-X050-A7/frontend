import React from 'react';
import Header from 'components/Header'
import Footer from 'components/Footer'
import Container from 'react-bootstrap/Container';

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='d-flex flex-column h-100'>
      <Header />
      <Container className="my-3">
        {children}
      </Container>
      <Footer />
    </div>
  );
};
export default PageContainer;
