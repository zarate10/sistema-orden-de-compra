import conn from './../db.js'

// UPDATE tickets SET status='closed' WHERE created_by=2; HAY QUE CERRAR SI O SI CON ID USER PARA Q NO SE GNEERNE ERRORES

export const createTicketController = async (req, res) => {
    try { 
        const { title, cantidad_coins, metodo_pago, created_by } = req.body
        const userTicketsOpen = await conn.query('SELECT * FROM tickets WHERE created_by=? AND status="open"', [created_by])

        if (isNaN(parseInt(cantidad_coins))) { 
            res.send({ err: 'Los coins deben ser de tipo numéricos.' })
            return 
        }

        if (cantidad_coins < 1) { 
            res.send({ err: 'Se puede adquirir como valor mínimo 1 COIN.' })
            return 
        }

        if (cantidad_coins > 10000) { 
            res.send({ err: 'No se pueden adquirir más de 10.000 COINS' })
            return 
        }

        if (metodo_pago === '') { 
            res.send({ err: 'No seleccionó un método de pago' })
        } else { 
            if (!userTicketsOpen[0].length) { 
                await conn.query('INSERT INTO tickets (title, cantidad_coins, metodo_pago, created_by) VALUES (?, ?, ?, ?)', [title, cantidad_coins, metodo_pago, created_by])
                res.send({ info: 'Ticket creado correctamente.' })
            } else { 
                res.send({ err: 'Usted ya posee un ticket open' })
            }
        }

    } catch (e) {
        console.log(e)
    }
}

export const subirComprobanteCtrl = async (req, res) => { 
    try {
        const { userId, comprobante } = req.body 
        const ticket = await conn.query('SELECT * FROM tickets WHERE created_by=? AND status="open"', [userId])

        if (comprobante.startsWith('https://i.imgur.com') || comprobante.startsWith('https://imgur.com')){ 
            if (!ticket[0].length) { 
                res.send({ info: "No hay ticket abierto para este usuario" })
            } else { 
    
                if (!ticket[0][0].comprobante_cargado) { 
                    await conn.query('UPDATE tickets SET comprobante_cargado=1 WHERE created_by=?', [ticket[0][0].created_by])
                    await conn.query('INSERT INTO comprobantes (url_comprobante, ticket_id) VALUES (?, ?)', [comprobante, ticket[0][0].ticket_id])
                    res.send({ info: 'Comprobante cargado correctamente.' })
                } else { 
                    res.send({ err: 'El comprobante ya fue cargado.' })
                }
            }
        } else {  
            res.send({ err: 'El link debe pertenecer a imgur.com'})
        }
        
    } catch (e) { 
        console.log(e)
    }
}

export const cerrarTicketCtrl = async (req, res) => { 
    const ticket_id = req.params.id

    try { 
        const [ ticket ] = await conn.query('SELECT * FROM tickets WHERE ticket_id=? AND status="open"', [ticket_id])
        
        if (!ticket.length) { 
            res.send({ err: 'No hay un ticket open con ese id'})
        } else { 
            await conn.query('UPDATE tickets SET status="closed" WHERE ticket_id=?', [ticket_id])
            res.send({ info: 'Ticket ' + ticket_id + ' cerrado correctamente.'})
        }
    } catch (e) { 
        console.log(e)
    }
}   

export const verTicketsOpen = async (req, res) => { 
    try { 
        const [ ticketsOpen ] = await conn.query('SELECT * FROM tickets WHERE status="open"')
        res.send({
            tickets: ticketsOpen
        })
    } catch (e) { 
        console.log(e)
    }
}

export const verTicketsUsuarioId = async (req, res) => { 
    try { 
        const [ ticket ] = await conn.query('SELECT * FROM tickets WHERE status="open" AND created_by=?', [req.params.id])
        if (ticket.length) { 
            res.send(ticket)
        } else { 
            res.send([])
        }
    } catch (e) { 
        console.log(e)
    }
}

// viewTicketsAdm

export const subirBoletaCtrl = async (req, res) => { 
    try {
        const { ticketId, boleta } = req.body 
        const [ boletaEnDb ] = await conn.query('SELECT * FROM tickets WHERE ticket_id=?', [ticketId])
        
        if (boleta.length < 5) { 
            res.send({ err: 'Debe introducir un link válido.' })
            return
        }

        if (boletaEnDb[0].url_boleta !== null) { 
            res.send({ err: 'Ya se cargó la boleta para este ticket. '})
        } else { 
            await conn.query('UPDATE tickets SET url_boleta=? WHERE ticket_id=?', [boleta, ticketId])
            res.send({ info: 'Boleta cargada correctamente.'})
        }
    } catch (e) { 
        console.log(e)
    }
}

export const verNombreUsuarioId = async (req, res) => { 
    try { 
        const [ nombreUser ] = await conn.query('SELECT * FROM usuarios WHERE id=?', [req.params.id])
        if (nombreUser.length) { 
            res.send(nombreUser[0].username)
        } else { 
            res.send([])
        }
    } catch (e) { 
        console.log(e)
    }
}

export const traerComprobanteCtrl = async (req, res) => { 
    try { 
        const [ comprobante ] = await conn.query('SELECT * FROM comprobantes WHERE ticket_id=?', [req.params.id])
        if (comprobante.length) { 
            res.send(comprobante[0].url_comprobante)
        } else {
            res.send([])
        }
    } catch (e) { 
        console.log(e)
    }
}