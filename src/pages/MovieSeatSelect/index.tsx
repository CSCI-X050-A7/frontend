import styles from './style.module.css'
import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Backend from 'utils/service'

interface Seat {
  id: string
  row: number
  number: number
  ticketType: TicketType | null
}

enum TicketType {
  Adult = 'adult',
  Senior = 'senior',
  Child = 'child'
}

const Index: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType>(
    TicketType.Adult
  )
  const [promotion, setPromotion] = useState<string>('')
  const navigate = useNavigate()
  const { run: createOrder } = useRequest(
    async () =>
      Backend.order.v1OrdersCreate({
        promotion_code: promotion,
        show_id: searchParams.get('show') ?? '',
        tickets: selectedSeats.map(seat => ({
          seat: seat.id,
          type: seat.ticketType?.toString() ?? ''
        }))
      }),
    {
      manual: true,
      onSuccess: data => {
        navigate(`/order/summary?order=${data.data.id}`)
      }
    }
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
        <div key={row} className='text-center w-100'>
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
        <h1>Select Seat & Promotion</h1>
        <h2>Show: {searchParams.get('show')}</h2>
      </div>
      <div className={`${styles.seatContainer} mt-3`}>{renderSeats()}</div>
      <div className='w-50 mx-auto'>
        <Form>
          <Form.Group controlId='ticketType'>
            <Form.Label>Ticket Type:</Form.Label>
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
        <p className='mt-2'>
          You have selected <strong>{totalSelectedSeats}</strong>{' '}
          {totalSelectedSeats === 1 ? 'seat' : 'seats'}:{' '}
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
        <hr />
        <Form>
          <Form.Group controlId='promoCode'>
            <Form.Label>Promotion Code:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter promotion code'
              value={promotion}
              onChange={e => setPromotion(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* <Link to='/order/summary' state={selectedSeats}>
        </Link> */}
        <Button
          onClick={createOrder}
          className='mt-4 w-100'
          disabled={totalSelectedSeats === 0}
        >
          Create Order
        </Button>
      </div>
    </PageContainer>
  )
}

export default Index
