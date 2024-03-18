import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRequest } from 'ahooks';
import PageContainer from 'components/PageContainer'; // Import PageContainer
import Backend from 'utils/service';

const ChangePasswordForm: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const { run: changePassword } = useRequest(
    async () => {
      return Backend.auth.v1ChangePassword({
        oldPassword,
        newPassword
      });
    },
    {
      manual: true,
      onSuccess: () => {
        // Handle success, set success message
        setMessage('Password changed successfully!');
      },
      onError: error => {
        // Handle error, set error message
        setMessage(`Error changing password: ${error.message}`);
      }
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); // Clear previous message
    changePassword();
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formOldPassword'>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type='password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formNewPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </Form.Group>
        {message && <div className={`text-${message.startsWith('Error') ? 'danger' : 'success'}`}>{message}</div>}
        <Button variant='primary' type='submit'>
          Change Password
        </Button>
      </Form>
    </PageContainer>
  );
};

export default ChangePasswordForm;
