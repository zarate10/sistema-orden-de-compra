import axios from 'axios'

const address = 'http://127.0.0.1:7777'

const endpointNewTicket = address + "/api/crear_ticket"
const queryTicketOpen = address + "/api/tickets/consultar/"
const endpointNewComprobante = address + "/api/comprobante"

export const newTicketService = async (datos) => { 
    const { data } = await axios.post(endpointNewTicket, {
        "title": 'CREAR BOLETA: ' + datos.metodo_pago, 
        "cantidad_coins": datos.cantidad_coins, 
        "metodo_pago": datos.metodo_pago, 
        "created_by": datos.id
    })
    return data 
}

export const usuarioTicketOpenService = async (id) => { 
    const response = await axios.get(queryTicketOpen + id)
    return response.data[0]
}

export const usuarioCargaComprobante = async (datos) => { 
    const response = await axios.post(endpointNewComprobante, datos)
    return response.data
}
