import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import React, {useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
  id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_admin: boolean;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  // other user properties...?
}

function UserList() {

  const listyle = {
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    cursor: 'pointer',
  };

  const users = [
      { username: "demo", email: 'demo@example.com' },
      { username: "user2", email: 'user@example.com' },
      
    ];

  return(
    <div style={{ maxHeight: '200px' }}>
      <h2>User List</h2>
      <ListGroup style={{ paddingTop: '10px',maxHeight: '200px', overflowY: 'auto', width: '350px' }}>
        {users.map((user) => (
          <ListGroup.Item key={user.username} style={listyle}>
            {user.email} : {user.username}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

const EditPromo: React.FC<{ onClose: () => void; selectedPromoTitle: string;}> = ({
  onClose,
  selectedPromoTitle
}) => {
  return (
    <Card style={{ borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '300px' }}>
      
      <h3 style={{ padding: '10px' }}>
        {selectedPromoTitle === "New Promo" ? "Add " : "Edit: "} {selectedPromoTitle}
      </h3>
      <input type="text" placeholder="Promo title" style={{ marginBottom: '10px' }} />
      <input type="text" placeholder="Movie affected" style={{ marginBottom: '10px' }} />
      <input type="text" placeholder="Discount percentage" style={{ marginBottom: '10px' }} />
      <input type="text" placeholder="Date applicable" style={{ marginBottom: '10px' }} />
      
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button style={{ width: '80px', padding: '5px', margin: '0 5px'}} variant="primary" onClick={onClose}>
            Submit
          </Button>
          <Button style={{ width: '80px', padding: '5px', margin: '0 5px'}} variant="primary" onClick={onClose}>
            Close
          </Button>
          <Button
            style={{
              width: '80px',
              padding: '5px',
              margin: '0 5px',
              backgroundColor: 'red',
              borderColor: 'red'
            }}
            variant="primary"
            onClick={onClose}
          >
            {selectedPromoTitle === "New Promo" ? "Cancel " : "Delete"}
          </Button>
      </div>

    </Card>
  );
};

const LeftHalf: React.FC<{ onOpenTextInput: (promoTitle: string) => void }> = ({ onOpenTextInput }) => {
  const listyle = {
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    cursor: 'pointer',
  };
  const promotions = [
    { id: 1, title: 'Promo 1' },
    { id: 2, title: 'Promo 2' },
    { id: 3, title: 'Promo 3' },
    { id: 4, title: 'Promo 4' },
    { id: 5, title: 'Promo 5' },
    { id: 6, title: 'Promo 6' },
    { id: 7, title: 'Promo 7' },
    { id: 8, title: 'Promo 8' },
  ];
  
  return (
    <div style={{ display: 'flex', width: '75%', padding: '0px' }}>

      <div style={{ paddingRight: '10px' }}>
        <h3>Subscribed Users</h3>
        <UserList />
      </div>

      <div style={{ width: '50%', padding: '0px', paddingRight: '15px', paddingLeft:'15px' }}>
        <div  style={{width: '450px', display: 'flex', padding: '0px', paddingLeft:'27px'}}>
          <h2>Active Promotions</h2>
          <Button style={{ marginLeft: '25px' }} variant="primary" onClick={() => onOpenTextInput("New Promo")}>
            + Add
          </Button>
        </div>
        <div style={{paddingLeft: '30px', paddingTop: '15px'}}>
        <ListGroup style={{ maxHeight: '400px', overflowY: 'auto', width: '350px' }}>
          {promotions.map((promo) => (
            <ListGroup.Item key={promo.id} style={listyle} onClick={() => onOpenTextInput(promo.title)}>
              {promo.title}
              <Button
                style={{ marginLeft: '185px' }}
                variant="primary"
                onClick={() => onOpenTextInput(promo.title)}
              >
                Edit
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </div>
      </div>
    </div>
  );
};

const RightHalf: React.FC<{ showTextInput: boolean; onCloseTextInput: () => void; selectedPromoTitle: string }> = ({
  showTextInput,
  onCloseTextInput,
  selectedPromoTitle
}) => {
  return (
    <div style={{ width: '20%', padding: '50px', paddingLeft: '0px' }}>
      {!showTextInput && <Card style={{ borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '300px' }}>
          <p>Add a new promotion, or select one to begin editing.</p>
        </Card>}
      {showTextInput && <EditPromo onClose={onCloseTextInput} selectedPromoTitle={selectedPromoTitle} />}
    </div>
  );
};

const Index: React.FC = () => {
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const [selectedPromoTitle, setSelectedPromoTitle] = useState<string>('');


  const openTextInput = (promoTitle: string) => {
    setSelectedPromoTitle(promoTitle);
    setShowTextInput(true);
  };

  const closeTextInput = () => {
    setShowTextInput(false);
  };

  return (
    <PageContainer>
      <div style={{ display: 'flex', padding: '20px' }}>
        <LeftHalf onOpenTextInput={openTextInput} />
        <RightHalf showTextInput={showTextInput} onCloseTextInput={closeTextInput} selectedPromoTitle={selectedPromoTitle} />
      </div>
    </PageContainer>
  );
};

export default Index;