import PageContainer from 'components/PageContainer'

const OrderConfirmation: React.FC = () => {
  const userProfile ={
    email: 'example@email.com',
    movie: 'The Bee Movie',
    date: '3/3/21',
    location: 'MovieLand ATL',
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // Adjust the height as needed
      }}
    >
      <div
        style={{
          background: 'rgba(163, 255, 13, 0.03)',
          borderRadius: '10px', // Set border-radius for curved edges
          padding: '20px', // Adjust padding as needed
          display: 'inline-block', // Make the background box inline with the content
          border: '2px solid #A3FF0D'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1 style={{ marginBottom: '30px' }}> 🎉Congratulations!🎉</h1>
          <h4 style={{ marginBottom: '40px' }}> We&apos;ve received your order!</h4>
          <p style={{ marginBottom: '40px' }}>
            {' '}
            Look out for your confirmation email at{' '}
            <strong>{userProfile.email}</strong>{' '}
          </p>
          <h1 style={{ marginBottom: '30px' }}> 🖼️</h1>
          <h6 style={{ marginBottom: '30px' }}>
            {' '}
            We can&apos;t wait to see you at <strong>
              {userProfile.location}
            </strong>{' '}
            for
            <strong>{userProfile.movie}</strong> on{' '}
            <strong>{userProfile.date}</strong>!{' '}
          </h6>
        </div>
      </div>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <OrderConfirmation />
  </PageContainer>
)

export default Index
