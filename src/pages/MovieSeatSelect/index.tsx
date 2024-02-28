import styles from './style.module.css'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

interface Seat {
  id: string
  row: number
  number: number
  ticketType: TicketType | null
}

enum TicketType {
  Student = 'Student',
  Children = 'Children',
  Veteran = 'Veteran',
  Adult = 'Adult',
  Senior = 'Senior'
}

const Index: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [selectedTicketType, setSelectedTicketType] =
    useState<TicketType | null>(null)

  const totalSelectedSeats = selectedSeats.length

  const handleSeatClick = (seat: Seat) => {
    const seatIndex = selectedSeats.findIndex(
      selectedSeat => selectedSeat.id === seat.id
    )

    if (seatIndex === -1) {
      setSelectedSeats([
        ...selectedSeats,
        { ...seat, ticketType: selectedTicketType }
      ])
    } else {
      const updatedSeats = [...selectedSeats]
      updatedSeats.splice(seatIndex, 1)
      setSelectedSeats(updatedSeats)
    }
  }

  const handleTicketTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTicketType(event.target.value as TicketType)
  }

  const renderSeats = () => {
    const rows = 5
    const seatsPerRow = 8
    const seats: Seat[] = []

    for (let row = 1; row <= rows; row++) {
      for (let number = 1; number <= seatsPerRow; number++) {
        const id = `${row}-${number}`
        seats.push({ id, row, number, ticketType: null })
      }
    }

    return seats.map(seat => (
      <button
        key={seat.id}
        onClick={() => handleSeatClick(seat)}
        className={`${styles.seat} ${
          selectedSeats.some(selectedSeat => selectedSeat.id === seat.id)
            ? styles.selected
            : ''
        }`}
      >
        {seat.row} - {seat.number}
      </button>
    ))
  }

  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Select Seat</h1>
      </div>
      <div className={styles.seatContainer}>{renderSeats()}</div>
      <Form>
        <Form.Group controlId='ticketType'>
          <Form.Label>Select Ticket Type:</Form.Label>
          <Form.Control
            as='select'
            onChange={handleTicketTypeChange}
            value={selectedTicketType || ''}
          >
            <option value='' disabled>
              Select Ticket Type
            </option>
            {Object.values(TicketType).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <div className={styles.messageContainer}>
        <p className={styles.message}>
          You have selected <strong>{totalSelectedSeats}</strong> seat(s).
        </p>
        {selectedSeats.map((seat, index) => (
          <div key={index}>
            {seat.ticketType ? (
              <p>
                {seat.ticketType}
                {index < selectedSeats.length - 1 && ', '}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <Link to='/order/summary'>
        <Button>Confirm</Button>
      </Link>
    </PageContainer>
  )
}

export default Index
