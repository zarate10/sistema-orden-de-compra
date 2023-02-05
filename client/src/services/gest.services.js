import axios from 'axios'

const address = 'http://127.0.0.1:7777'

const endpointTicketsOpen = address + "/api/tickets/open"
const endpointCloseTicket = address + "/api/cerrar_ticket/"
const endpointConsultarUser = address + "/api/tickets/nombre/"
const endpointUploadBoleta = address + "/api/tickets/uploadBoleta"

export const verTicketsOpen = async () => { 
    const response = await axios.get(endpointTicketsOpen)
    return response.data.tickets
}

export const cerrarTicketService = async (id) => { 
    const { data } = await axios.post(endpointCloseTicket + id)
    return data 
}


export const queryUsernameService = async (id) => { 
    const { data } = await axios.get(endpointConsultarUser + id)
    return data 
}

export const getComprobanteService = async (id) => { 
    const { data } = await axios.get(address + '/api/tickets/comprobante/' + id)
    return data
}

export const uploadBoletaService = async (datos) => {
    const { data } = await axios.post(endpointUploadBoleta, { "ticketId": datos[1], "boleta": datos[0] })
    return data
}
