import PageContainer from 'components/PageContainer'
import { Link } from 'react-router-dom'


const Index: React.FC = () => {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Link className='nav-link' to='/ManageMovies'>
                Manage Movies
        </Link>
        <Link className='nav-link' to='/ManageUsers'>
                Manage Users
        </Link>
        <Link className='nav-link' to='/ManagePromos'>
                Manage Promotions
        </Link>
      </div>
    </PageContainer>
  );
}

export default Index
