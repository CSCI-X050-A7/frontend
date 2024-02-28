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
        <label style={{ marginRight: '40px' }}>Username: </label>
        <input
          type='text'
          value={userProfile.username}
          onChange={e => handleInputChange('username', e.target.value)}
          readOnly={!editingUser}
        />
        {editingUser ? (
          <button onClick={() => setEditingUser(false)}>
            <span role='img' aria-label='Save'>
              ✅
            </span>
          </button>
        ) : null}
        {!editingUser && (
          <button onClick={() => setEditingUser(true)}>
            <span role='img' aria-label='Edit'>
              ✏️
            </span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '40px' }}>Password:</label>
        <input
          type='text'
          value={userProfile.password}
          onChange={e => handleInputChange('password', e.target.value)}
          readOnly={!editingPass}
        />
        {editingPass ? (
          <button onClick={() => setEditingPass(false)}>
            <span role='img' aria-label='Save'>
              ✅
            </span>
          </button>
        ) : null}
        {!editingPass && (
          <button onClick={() => setEditingPass(true)}>
            <span role='img' aria-label='Edit'>
              ✏️
            </span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '65px' }}>Email:</label>
        <input
          type='text'
          value={userProfile.email}
          onChange={e => handleInputChange('email', e.target.value)}
          readOnly={!editingEmail}
        />
        {editingEmail ? (
          <button onClick={() => setEditingEmail(false)}>
            <span role='img' aria-label='Save'>
              ✅
            </span>
          </button>
        ) : null}
        {!editingEmail && (
          <button onClick={() => setEditingEmail(true)}>
            <span role='img' aria-label='Edit'>
              ✏️
            </span>
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '40px' }}>Birthday:</label>
        <input
          type='text'
          value={userProfile.birthday}
          onChange={e => handleInputChange('birthday', e.target.value)}
          readOnly={!editingBday}
        />
        {editingBday ? (
          <button onClick={() => setEditingBday(false)}>
            <span role='img' aria-label='Save'>
              ✅
            </span>
          </button>
        ) : null}
        {!editingBday && (
          <button onClick={() => setEditingBday(true)}>
            <span role='img' aria-label='Edit'>
              ✏️
            </span>
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
