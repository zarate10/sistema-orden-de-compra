import { newTicketService, usuarioTicketOpenService, usuarioCargaComprobante } from '../services/tickets.services.js'
import { AuthInterface } from './Auth.jsx';
import { Notificacion } from './Notificacion.jsx'
import { useState, useEffect } from 'react';


import './../assets/css/modal.css'

import imgTicketEspera from './../assets/img/ticket_orange.png'
import imgTicketCheck from './../assets/img/ticket_green.png'
import imgIconWait from './../assets/img/ticket_wait.png'
import imgIconCheck from './../assets/img/ticket_check.png'

// esto es considerado una mala práctica, pero como son micro componentes, los creo acá.
function renderGenerarBoletaBtn(ticketNumber) {

    return (
        <button className='btn second' style={ticketNumber ? { display: "none" } : { display: "flex" }}><i className="fa-solid fa-credit-card"></i> Generar boleta</button>
    );
}

function renderBotonComprobante(boleta, handleSubmitComprobante, comprobante, setComprobante) {

    if (boleta !== undefined) {

        if (boleta) {
            return (
                <div className='form-subir-comprobante'>
                    <a href={boleta} rel="noopener noreferrer" className='btn-download' target="_blank"><i className="fa-solid fa-magnifying-glass"></i> Ver boleta</a>
                    <form onSubmit={handleSubmitComprobante}>
                        <p style={{ margin: 0, marginBottom: '10px' }}>Cuando realice el pago, deberá subir la imagen del comprobante a imgur.com y pegar el link aquí.</p>
                        <label>
                            <input
                                type="text"
                                value={comprobante}
                                onChange={(event) => setComprobante(event.target.value)}
                                placeholder='Subir comprobante'
                            ></input>
                            <button>Subir</button>
                        </label>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <h5 style={{ fontSize: '1.2em', fontWeight: 400 }}>Su boleta está siendo creada.</h5>
                    <p style={{ margin: 0 }}>Las boletas podrían tardar hasta 24 hs. en ser generadas.</p>
                    <a style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'none',
                        border: '2px dashed #262d34',
                        cursor: 'pointer',
                        marginTop: '20px',
                        background: '#141b23',
                        color: 'white',
                        fontSize: '0.7em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                    href='#'
                    rel="noopener noreferrer"
                    target='_blank'
                    ><i className="fa-brands fa-discord" style={{ fontSize: '1.6em' }}></i> Para agilizar los tiempos cree un ticket en nuestro discord.</a>
                </div>
            )
        }
    }
}


function renderMetodosPago(status, setMetodoPago) {
    if (status.length === 0) {
        return (
            <select className="pago" placeholder='Seleccione el método de pago' defaultValue={'DEFAULT'} onChange={(event) => setMetodoPago(event.target.value)} required>
                <option value="DEFAULT" disabled>Seleccione un método de pago</option>
                <option>Paypal</option>
                <option>Rapipago</option>
                <option>Pago fácil</option>
            </select>
        )
    }
}

function renderInputCoins(status, cantidadCoins, setCantidadCoins) {

    if (status.length !== 0) {
        return (
            <input
                type="number"
                value={status.cantidad_coins}
                onChange={e => { setCantidadCoins(e.target.value) }}
                name="cantidad_coins"
                placeholder='Introduzca la cantidad de coins a comprar'
                readOnly
            />
        )
    } else {
        return (
            <input
                type="number"
                onChange={e => { setCantidadCoins(e.target.value) }}
                name="cantidad_coins"
                placeholder='Introduzca la cantidad de coins a comprar'
                required
            />
        )
    }
}


const RenderFormComprarMonedas = ({ handleSubmit, dataSession, ticketStatus, setTicketStatus, cantidadCoins, setCantidadCoins, setMetodoPago, setEstadoProductos }) => {

    useEffect(() => { 
        usuarioConTicket(dataSession, setTicketStatus)
    }, [dataSession])

    return (
        <form className='modal' onSubmit={handleSubmit} style={{ paddingBottom: '1vh' }}>

            <div className="container-ticket-number">
                <h1 className="title">Comprar monedas</h1>
            </div>

            {
                dataSession !== null
                    ? renderMetodosPago(ticketStatus, setMetodoPago)
                    : <></>
            }

            <label className="icon-input" style={{ marginTop: '2vh' }}>
                <i className="fa-solid fa-circle-user"></i>
                {dataSession !== null
                    ? <input type="text" value={dataSession.username} required readOnly />
                    : <></>
                }
            </label>

            <label className="icon-input">
                <i className="fa-solid fa-coins"></i>
                {renderInputCoins(ticketStatus, cantidadCoins, setCantidadCoins)}
            </label>
            <div className='btn primary' onClick={() => setEstadoProductos(true)} style={{marginBottom: '10px'}}><i className="fa-solid fa-tag"></i> Ver productos</div>
            <p>Para realizar una compra efectiva, si es la primera vez que lo hace, deberá de registrarse con su nombre de personaje del servidor de samp, haciendo click en "Introduzca su nombre". Posteriormente siga estos pasos:</p>
            <div className="step">
                <p><span>1</span> Seleccione el método de pago</p>
                <p><span>2</span> Introduzca la cantidad de coins a comprar</p>
                <p><span>3</span> De click a "generar boleta"</p>
            </div>
            <p>Tenga en cuenta que su boleta podría tardar hasta 24 horas en generarse. <br/> Tipo de cambio: <b>1 COIN = 1 USD</b></p>

            {dataSession !== null ? renderGenerarBoletaBtn(ticketStatus.ticket_id) : <></>}
        </form>
    )
}

function renderTicket(bg, imgStatus, data, username, estadoBoleta) {

    return (
        <div className='create-ticket-box'>
            <img src={bg} alt="IMG" />
            <div className="box-data-ticket">
                <div className="ticket-left">
                    <div className="ticket-left__top">
                        <img src={imgStatus} alt="IMG" />
                        <p>Hola,<br />
                            <span>
                                {username}
                            </span>
                        </p>
                    </div>
                    <div className="ticket-left__bottom">
                        <div className="box-data">
                            <div className="box-info">
                                <span>STATUS</span>
                                <p>{data.status}</p>
                            </div>
                            <div className="box-info">
                                <span>COINS</span>
                                <p>{data.cantidad_coins}</p>
                            </div>
                        </div>
                        <div className="box-data">
                            <div className="box-info">
                                <span>MÉTODO PAGO</span>
                                <p>{data.metodo_pago}</p>
                            </div>
                            <div className="box-info">
                                <span>ESTADO BOLETA</span>
                                <p>{estadoBoleta}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket-right">
                    <p>N°{String(data.ticket_id).padStart(5, "0")}</p>
                </div>
            </div>
        </div>
    )
}

function renderModalEspera(ticket, username) {

    if (ticket.url_boleta !== null) {
        return (
            <div className="modal-tickets">
                <h5>Ticket generado</h5>
                <h2>BOLETA GENERADA</h2>
                {renderTicket(imgTicketCheck, imgIconCheck, ticket, username, 'Generada')}
            </div>
        )
    } else {
        return (
            <div className='modal-tickets'>
                <h5>Ticket generado</h5>
                <h2>BOLETA EN ESPERA</h2>
                {renderTicket(imgTicketEspera, imgIconWait, ticket, username, 'Generándose')}
            </div>
        )
    }
}


export function mostrarMensaje(respuesta, setMessage) {
    if (respuesta) {
        setMessage([respuesta[Object.keys(respuesta)[0]], Object.keys(respuesta)[0]])
        setTimeout(() => {
            setMessage([null, null])
        }, 3000)
    }
}


// comprobamos si en la base de datos el usuario tiene un ticket open
async function usuarioConTicket(dataSession, setTicketStatus) {
    let ticketData;

    dataSession !== null
        ? ticketData = await usuarioTicketOpenService(dataSession.id)
        : ticketData = []

    ticketData ? setTicketStatus(ticketData) : setTicketStatus([])

}


export const ModalForm = ({ estadoAuth, setEstadoAuth, dataSession, userSession, setUserSession, setEstadoProductos }) => {
    const [message, setMessage] = useState([null, null])

    const [ticketStatus, setTicketStatus] = useState([])
    const [cantidadCoins, setCantidadCoins] = useState(0)
    const [metodoPago, setMetodoPago] = useState('')
    const [comprobante, setComprobante] = useState('')

    useEffect(() => {
        if (dataSession !== null) {
            setEstadoAuth(false)

            if (ticketStatus.length !== 0) {
                setCantidadCoins(ticketStatus.cantidad_coins)
            }
        }
        setTimeout(() => usuarioConTicket(dataSession, setTicketStatus), 10000)
    }, [ticketStatus])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const respuesta = await newTicketService({ id: dataSession.id, cantidad_coins: cantidadCoins, metodo_pago: metodoPago })
            usuarioConTicket(dataSession, setTicketStatus)
            mostrarMensaje(respuesta, setMessage)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmitComprobante = async (event) => {

        event.preventDefault()
        try {
            const respuesta = await usuarioCargaComprobante({ userId: dataSession.id, comprobante })
            mostrarMensaje(respuesta, setMessage)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='wrapper-container-main'>
            <Notificacion msg={message[0]} bg={message[1] === 'err' ? '#ff4d4d' : '#4BB543'} />

            <div className='userLogged' style={dataSession !== null ? { display: "block" } : { display: 'none' }}>

                {/* En el ternario de abajo verificamos si el usuario tiene un ticket creado. Si tiene mostramos mensaje de espera, si no, el form de compra.*/}
                
                {
                    ticketStatus.length === 0
                    ? <RenderFormComprarMonedas
                        
                        handleSubmit={handleSubmit}
                        dataSession={dataSession}
                        ticketStatus={ticketStatus}
                        setTicketStatus={setTicketStatus}
                        cantidadCoins={cantidadCoins}
                        setCantidadCoins={setCantidadCoins}
                        setMetodoPago={setMetodoPago}
                        setEstadoProductos={setEstadoProductos}
                    />
                    // ? renderFormComprarMonedas(handleSubmit, dataSession, ticketStatus, setTicketStatus, cantidadCoins, setCantidadCoins, setMetodoPago, setEstadoProductos)
                    : renderModalEspera(ticketStatus, dataSession.username)
                }



                <div className='modal' style={{ paddingTop: 0, paddingBottom: '5vh' }}>
                    {dataSession !== null ? renderBotonComprobante(ticketStatus.url_boleta, handleSubmitComprobante, comprobante, setComprobante) : <></>}
                </div>
            </div>
            <div className="notLoggedUser" style={estadoAuth ? { display: "block" } : { display: 'none' }}>

                <AuthInterface
                    estado={estadoAuth}
                    cambiarEstado={setEstadoAuth}
                    userSession={userSession}
                    setUserSession={setUserSession}
                    setEstadoProductos={setEstadoProductos}
                />

            </div>
        </div>
    )
}