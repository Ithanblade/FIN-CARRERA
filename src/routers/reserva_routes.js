import { Router } from 'express'
import  verificarAutenticacion  from '../middlewares/autenticacion.js'
import { actualizarReserva, crearRerserva, detalleReserva, eliminarReserva, listarReserva } from '../controllers/reserva_controller.js'

const router = Router()

router.get('/reservas',verificarAutenticacion,listarReserva)
router.get('/reservas/:id',verificarAutenticacion,detalleReserva)
router.put('/reservas/:id',verificarAutenticacion,actualizarReserva)
router.delete('/reservas/:id',verificarAutenticacion,eliminarReserva)
router.post('/reservas',verificarAutenticacion,crearRerserva)

export default router