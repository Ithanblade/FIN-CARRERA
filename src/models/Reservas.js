import {Schema, model} from 'mongoose'


const reservaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },
    id_vehiculo:{
            type: Schema.Types.ObjectId,
            ref: 'Vehiculos',
            required: true
    }
})

export default model('Reserva',reservaSchema)