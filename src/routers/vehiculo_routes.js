import { Router } from 'express'
import  verificarAutenticacion  from '../middlewares/autenticacion.js'
import { actualizarVehiculo, crearVehiculo, detalleVehiculo, eliminarVehiculo, listarVehiculos } from '../controllers/vehiculo_controller.js'

const router = Router()

router.get('/vehiculos',verificarAutenticacion,listarVehiculos)
router.get('/vehiculos/:id',verificarAutenticacion,detalleVehiculo)
router.post('/vehiculos',verificarAutenticacion,crearVehiculo)
router.put('/vehiculos/:id',verificarAutenticacion,actualizarVehiculo)
router.delete('/vehiculos/:id',verificarAutenticacion,eliminarVehiculo)

export default router