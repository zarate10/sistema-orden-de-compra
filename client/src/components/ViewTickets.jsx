import { useState, useEffect, Suspense } from 'react'
import { Notificacion } from './Notificacion'
import { mostrarMensaje } from './Modal'
import { queryUsernameService, uploadBoletaService, getComprobanteService, verTicketsOpen, cerrarTicketService } from '../services/gest.services'

import './../assets/css/viewtickets.css'

const RenderTicket = ({ ticket, setNewBoleta, handleTicketUpload, handleCloseTicket }) => {
    const [username, setUsername] = useState([])
    const [comprobante, setComprobante] = useState([])

    useEffect(() => {
        async function getUsername(id) {
            const username = await queryUsernameService(id)
            setUsername(username)
        }

        async function getComprobante(ticket_id) {
            const comprobante = await getComprobanteService(ticket_id)
            setComprobante(comprobante)
        }

        getUsername(ticket.created_by)
        getComprobante(ticket.ticket_id)
    }, [])


    return (
        <div className='box-ticket'>
            <h6>{ticket.title}</h6>
            <h6>TICKET N°{ticket.ticket_id} {username}<br /></h6>
            <h6>COINS {ticket.cantidad_coins}<br /></h6>
            <p className='date-ticket'>{ticket.created_date.split('T')[0]}</p>
            <form onSubmit={handleTicketUpload}>
                <input type="text" placeholder='URL BOLETA' onChange={e => setNewBoleta([e.target.value, ticket.ticket_id])} />
                <button type='submit'>Cargar</button>
            </form>
            <div className="buttons">
                <a style={ticket.comprobante_cargado ? { display: 'inline' } : { display: 'none' }} href={comprobante} rel="noopener noreferrer" target="_blank">Ver comprobante</a>
                <form className='botones-gest-ticket' onSubmit={e => handleCloseTicket(e, ticket.ticket_id)}>
                    <button type="submit">CERRAR TICKET</button>
                </form>
            </div>
        </div>
    )
}

const ViewTicketsAdm = ({ estado, cambiarEstado }) => {
    const [message, setMessage] = useState([null, null])

    const [ticketsOpen, setTicketsOpen] = useState(null)
    const [newBoleta, setNewBoleta] = useState('')
    const [reload, setReload] = useState(false)
 
    useEffect(() => {
        const traerTickets = async () => {
            setTicketsOpen(await verTicketsOpen())
        }
        traerTickets()
        setReload(false)
    }, [reload])


    const handleCloseTicket = async (event, ticketId) => {
        event.preventDefault()
        try {
            const respuesta = await cerrarTicketService(ticketId)

            mostrarMensaje(respuesta, setMessage)
            cambiarEstado(true)
            setReload(true)
        } catch (e) {
            console.log(e, '3')
        }
    }

    const handleTicketUpload = async (event) => {
        event.preventDefault()
        try {
            const respuesta = await uploadBoletaService(newBoleta)
            mostrarMensaje(respuesta, setMessage)
            cambiarEstado(true)
        } catch (e) {
            console.log(e, '4')
        }
    }


    return (
        <Suspense fallback={<div></div>}>
            <div className='view-tickets-wrapper' style={estado ? { display: 'flex' } : { display: 'none' }}>
                <button onClick={() => cambiarEstado(!estado)}>CERRAR</button>
                <div className='container-tickets' style={estado ? { display: 'flex' } : { display: 'none' }} >
                    <Notificacion msg={message[0]} bg={message[1] === 'err' ? '#ff4d4d' : '#4BB543'} />
                    {
                        ticketsOpen
                            ? ticketsOpen.map((ticket, index) => <RenderTicket key={index} ticket={ticket} setNewBoleta={setNewBoleta} handleTicketUpload={handleTicketUpload} handleCloseTicket={handleCloseTicket} />)
                            : <>Cargando tickets.</>
                    }
                </div>
            </div>
        </Suspense>
    )
}

export default ViewTicketsAdm