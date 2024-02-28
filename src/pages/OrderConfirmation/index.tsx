import PageContainer from 'components/PageContainer'
import { useState } from 'react'

interface UserProfile {
  username: string;
  password: string;
  email: string;
  birthday: string;
  movie: string;
  date: string;
  time: string;
  price: string;
  location: string;
  address: string;
}

const OrderConfirmation: React.FC = () => {
  const [userProfile] = useState<UserProfile>({
    username: 'user',
    password: '12345',
    email: 'example@email.com',
    birthday: '2001-01-01',
    movie: 'The Bee Movie',
    date: '3/3/21',
    time: '3:00pm',
    price: '$12.00',
    location: 'MovieLand ATL',
    address: '1234 MovieWay, Atlanta, GA, 30602'
  });



  return (
    
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust the height as needed
    }}>
        <div style={{
            background: 'rgba(163, 255, 13, 0.03)',
            borderRadius: '10px',  // Set border-radius for curved edges
            padding: '20px',       // Adjust padding as needed
            display: 'inline-block', // Make the background box inline with the content
            border: '2px solid #A3FF0D' 
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{marginBottom: '30px'}}> 🎉Congratulations!🎉</h1>
                <h4 style={{marginBottom: '40px'}}> We've received your order!</h4>
                <label style={{marginBottom:'40px'}}> Look out for your confirmation email at <strong>{userProfile.email}</strong> </label>
                <h1 style={{marginBottom: '30px'}}> 🖼️</h1>
                <h6 style={{marginBottom: '30px'}}> We can't wait to see you at  <strong>{userProfile.location}</strong> for 
                                                <strong>{userProfile.movie}</strong> on <strong>{userProfile.date}</strong>! </h6>
            </div>
        </div>
    </div>
    
    
  );
};

const Index: React.FC = () => (
  <PageContainer>
    <OrderConfirmation />
  </PageContainer>
)

export default Index;