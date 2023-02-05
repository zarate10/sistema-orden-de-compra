import { Router } from 'express'
import { createTicketController, subirComprobanteCtrl, cerrarTicketCtrl, verTicketsOpen, verTicketsUsuarioId, verNombreUsuarioId, subirBoletaCtrl, traerComprobanteCtrl} from './../controllers/tickets.controllers.js'

const router = Router()

router.post('/api/crear_ticket', createTicketController)
router.post('/api/comprobante', subirComprobanteCtrl)
router.post('/api/cerrar_ticket/:id', cerrarTicketCtrl)
router.post('/api/tickets/uploadBoleta', subirBoletaCtrl)
router.get('/api/tickets/open', verTicketsOpen)
router.get('/api/tickets/consultar/:id', verTicketsUsuarioId)
router.get('/api/tickets/nombre/:id', verNombreUsuarioId)
router.get('/api/tickets/comprobante/:id', traerComprobanteCtrl)

export default router 