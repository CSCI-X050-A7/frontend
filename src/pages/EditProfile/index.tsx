import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

interface UserProfile {
  username: string
  password: string
  email: string
  birthday: string
}

const UserProfileForm: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'user',
    password: '12345',
    email: 'example@email.com',
    birthday: '2001-01-01'
  })

  // Controls whether or not user can edit data
  const [editingUser, setEditingUser] = useState(false)
  const [editingPass, setEditingPass] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingBday, setEditingBday] = useState(false)

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }))
  }

  // Function to handle Saving all values at once
  const handleSaveALL = () => {
    setEditingUser(false)
    setEditingPass(false)
    setEditingEmail(false)
    setEditingBday(false)
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ marginBottom: '30px' }}> User Profile</h1>
      <h1 style={{ marginBottom: '30px' }}> 🎥</h1>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginRight: '40px' }}>Username: </p>
        <input
          type='text'
          value={userProfile.username}
          onChange={e => handleInputChange('username', e.target.value)}
          readOnly={!editingUser}
        />
        {editingUser ? (
          <button type='button' onClick={() => setEditingUser(false)}>
            <span role='img'>✅</span>
          </button>
        ) : null}
        {!editingUser && (
          <button type='button' onClick={() => setEditingUser(true)}>
            <span role='img'>✏️</span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginRight: '40px' }}>Password:</p>
        <input
          type='text'
          value={userProfile.password}
          onChange={e => handleInputChange('password', e.target.value)}
          readOnly={!editingPass}
        />
        {editingPass ? (
          <button type='button' onClick={() => setEditingPass(false)}>
            <span role='img'>✅</span>
          </button>
        ) : null}
        {!editingPass && (
          <button type='button' onClick={() => setEditingPass(true)}>
            <span role='img'>✏️</span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginRight: '65px' }}>Email:</p>
        <input
          type='text'
          value={userProfile.email}
          onChange={e => handleInputChange('email', e.target.value)}
          readOnly={!editingEmail}
        />
        {editingEmail ? (
          <button type='button' onClick={() => setEditingEmail(false)}>
            <span role='img'>✅</span>
          </button>
        ) : null}
        {!editingEmail && (
          <button type='button' onClick={() => setEditingEmail(true)}>
            <span role='img'>✏️</span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginRight: '40px' }}>Birthday:</p>
        <input
          type='text'
          value={userProfile.birthday}
          onChange={e => handleInputChange('birthday', e.target.value)}
          readOnly={!editingBday}
        />
        {editingBday ? (
          <button type='button' onClick={() => setEditingBday(false)}>
            <span role='img'>✅</span>
          </button>
        ) : null}
        {!editingBday && (
          <button type='button' onClick={() => setEditingBday(true)}>
            <span role='img'>✏️</span>
          </button>
        )}
      </div>
      <Button variant='primary' type='submit' onClick={handleSaveALL}>
        Save All
      </Button>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <UserProfileForm />
  </PageContainer>
)

export default Index
