import type { SchemaCard } from 'client'
import type React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

interface CardFormProps {
  card: SchemaCard
  onChange: (updatedCard: SchemaCard) => void
}

const Index: React.FC<CardFormProps> = ({ card, onChange }) => {
  const usStates = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ]
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target as { name?: string; value: unknown }
    if (typeof name === 'string') {
      onChange({ ...card, [name]: value })
    }
  }

  return (
    <>
      <Row className='mb-3'>
        <Form.Group as={Col} md={3} controlId='formGridEmail'>
          <Form.Label>Card Type</Form.Label>
          <Form.Select name='type' value={card.type} onChange={handleChange}>
            <option value=''>Select card type</option>
            <option value='Visa'>Visa</option>
            <option value='MasterCard'>MasterCard</option>
            <option value='American Express'>American Express</option>
            <option value='Discover'>Discover</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId='formGridCardNumber'>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            name='number'
            value={card.number}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={3} controlId='formGridCardExp'>
          <Form.Label>Card Expiration</Form.Label>
          <Form.Control
            name='expiration'
            type='text'
            placeholder='01/28'
            value={card.expiration}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Form.Group className='mb-3' controlId='formGridAddress1'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          name='address'
          placeholder='1234 Main St'
          value={card.address}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formGridAddress2'>
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          name='address2'
          placeholder='Apartment, studio, or floor'
          value={card.address2}
          onChange={handleChange}
        />
      </Form.Group>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridCity'>
          <Form.Label>City</Form.Label>
          <Form.Control name='city' value={card.city} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>State</Form.Label>
          <Form.Select
            name='state'
            defaultValue='Choose...'
            onChange={handleChange}
            value={card.state}
          >
            <option>Choose...</option>
            {usStates.map((state, index) => (
              <option key={index} value={state}>
                {' '}
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={3} controlId='formGridZip'>
          <Form.Label>Zip</Form.Label>
          <Form.Control name='zip' value={card.zip} onChange={handleChange} />
        </Form.Group>
      </Row>
    </>
  )
}
export default Index
