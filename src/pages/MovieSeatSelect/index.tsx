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
  Adult = 'Adult',
  Senior = 'Senior',
  Children = 'Children',
  Veteran = 'Veteran',
  Student = 'Student'
}

const Index: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType>(
    TicketType.Adult
  )

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

  const renderSeats = () => {
    const rows = 5
    const seatsPerRow = 8
    const seats: Seat[] = []

    for (let row = 1; row <= rows; row += 1) {
      for (let number = 1; number <= seatsPerRow; number += 1) {
        const id = `${row}-${number}`
        seats.push({ id, row, number, ticketType: null })
      }
    }

    const seatRows = []
    for (let row = 0; row < rows; row += 1) {
      const seatRow = seats.slice(row * seatsPerRow, (row + 1) * seatsPerRow)
      seatRows.push(
        <div key={row} className='text-center'>
          {seatRow.map(seat => (
            <Button
              type='button'
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className={`${styles.seat} ${
                selectedSeats.some(selectedSeat => selectedSeat.id === seat.id)
                  ? styles.selected
                  : ''
              }`}
            >
              {seat.row} - {seat.number}
            </Button>
          ))}
        </div>
      )
    }
    return seatRows
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
            onChange={e => {
              setSelectedTicketType(e.target.value as TicketType)
            }}
            value={selectedTicketType}
          >
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
          You have selected <strong>{totalSelectedSeats}</strong> seat(s):{' '}
          {selectedSeats.map((seat, index) => (
            <span key={index}>
              {seat.ticketType ? (
                <span>
                  {seat.ticketType}
                  {index < selectedSeats.length - 1 && ', '}
                </span>
              ) : null}
            </span>
          ))}
        </p>
      </div>
      <Link to='/order/summary'>
        <Button>Confirm</Button>
      </Link>
    </PageContainer>
  )
}

export default Index
