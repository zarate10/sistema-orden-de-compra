import React, { useEffect, useState, Suspense, lazy } from 'react'

import './../assets/css/styles.css'
import personaje from './../assets/img/person.png'

import { Header } from './Header.jsx'
import { Background } from './Background.jsx'
import { ModalForm } from './Modal.jsx'
import { ViewMembresias } from './ViewMembresias'

const ViewFormItems = lazy(() => import('./ViewFormItems'))  // import { ViewFormItems } from './ViewFormItems'
const ViewProducts = lazy(() => import('./ViewProducts')) // import { ViewProducts } from './ViewProducts'
const ViewTicketsAdm = lazy(() => import('./ViewTickets')) // import { ViewTicketsAdm } from './ViewTickets'
const ViewGeneradorBoleta = lazy(() => import('./ViewGeneradorBoleta'))

export const Main = () => {
    const [userSession, setUserSession] = useState(sessionStorage.getItem('session'))
    const [sessionCasteada, setSessionCasteada] = useState(null)

    const [viewProduct, setViewProduct] = useState(false)
    const [viewMembresias, setViewMembresias] = useState(true)
    const [viewItemsAdm, setViewItemsAdm] = useState(false)
    const [viewTicketAdm, setViewTicketAdm] = useState(false)
    const [viewGenerador, setViewGenerador] = useState(false)

    const [estadoAuth, setEstadoAuth] = useState(true)

    useEffect(() => {
        if (userSession) {
            let session = userSession.split('x')
            setSessionCasteada({ id: parseInt(session[3]), username: session[5], admin: parseInt(session[1]) })
        }
    }, [userSession])

    return (
        <Suspense fallback={<div></div>}>
            <section className='main-wrapper'>
                <Header
                    setViewItemsAdm={setViewItemsAdm}
                    setViewGenerador={setViewGenerador}
                    setEstadoTicketsAdmin={setViewTicketAdm}
                    estadoTicketsAdmin={viewTicketAdm}
                    dataSession={sessionCasteada} 
                />
                <Background />
                {
                    viewMembresias
                        ? <ViewMembresias estado={viewMembresias} cambiarEstado={setViewMembresias} />
                        : (
                            <div className='contenido'>
                                <div className="left" >
                                    <img src={personaje} alt='img' className="object" data-value="1"></img>
                                </div>
                                <div className="right">
                                    <ModalForm

                                        dataSession={sessionCasteada}

                                        estadoAuth={estadoAuth}
                                        setEstadoAuth={setEstadoAuth}

                                        userSession={userSession}
                                        setUserSession={setUserSession}

                                        setEstadoProductos={setViewProduct}
                                    />
                                </div>
                            </div>

                        )
                }
                {
                    viewTicketAdm
                        ? <ViewTicketsAdm estado={viewTicketAdm} cambiarEstado={setViewTicketAdm} />
                        : <></>
                }
                {
                    viewItemsAdm
                        ? <ViewFormItems estado={viewItemsAdm} cambiarEstado={setViewItemsAdm} />
                        : <></>
                }
                {
                    viewGenerador
                        ? <ViewGeneradorBoleta estado={viewGenerador} cambiarEstado={setViewGenerador} />
                        : <></>
                }
                <ViewProducts estado={viewProduct} cambiarEstado={setViewProduct} />
            </section>
        </Suspense>
    )
}
