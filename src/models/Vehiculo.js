import {Schema, model} from 'mongoose'

const vehiculosSchema = new Schema({
    marca:{
        type:String,
        require:true,
        trim:true
    },
    modelo:{
        type:String,
        require:true,
        trim:true
    },
    placa:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    color:{
        type:String,
        require:true,
        trim:true
    },
    kilometraje:{
        type:Number,
        require:true,
        trim:true,
    },
    anio_fabricacion:{
        type:Date,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true
    },
    tipo_vehiculo:{
        type:String,
        require:true,
        trim:true
    }
})


export default model('Vehiculos',vehiculosSchema)