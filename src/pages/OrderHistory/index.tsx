import PageContainer from 'components/PageContainer'

const Orders = () => (
    <div className='container'>
      <p>Order History</p>
    </div>
  )

const Index: React.FC = () => (
  <PageContainer>
    <Orders />
  </PageContainer>
)

export default Index
