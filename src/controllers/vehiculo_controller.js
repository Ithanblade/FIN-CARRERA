import Vehiculo from "../models/Vehiculo.js"
import mongoose from "mongoose";

const listarVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find();
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los vehiculos" });
    }
};

const detalleVehiculo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }
        const vehiculo = await Vehiculo.findById(id);

        if (!vehiculo) {
            return res.status(404).json({ msg: "Vehiculo no encontrado" });
        }
        res.status(200).json(vehiculo);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el vehiculo" });
    }       
};

const crearVehiculo = async (req, res) => {
    try {
        const { marca, modelo, placa, color, kilometraje, anio_fabricacion, descripcion, tipo_vehiculo } = req.body;

        if (!marca || !modelo || !placa || !color || !kilometraje || !anio_fabricacion || !descripcion || !tipo_vehiculo) {
            return res.status(400).json({ msg: "Todos los campos obligatorios deben ser proporcionados" });
        }

        const vehiculoExistente = await Vehiculo.findOne({ placa });
        if (vehiculoExistente) {
            return res.status(400).json({ msg: "La placa del vehiculo ya está registrado" });
        }

        if (modelo.length < 2 ) {
            return res.status(400).json({ msg: "El modelo debe contener al menos 2 caracteres" });
        }

        if (placa.length > 7 || placa.length < 6) {
            return res.status(400).json({ msg: "La placa tener 3 letras y entre 3 o 4 numeros" });
        }

        if (marca.length < 2) {
            return res.status(400).json({ msg: "La marca debe contener al menos 2 caracteres" });
        }

        if (typeof kilometraje !== "number" || kilometraje < 0) {
            return res.status(400).json({ msg: "El kilometraje debe ser un número y no debe ser menor a 0" });
        }

        if (color.length < 2) {
            return res.status(400).json({ msg: "El color debe contener al menos 2 caracteres" });
        }

        const fecha = new Date(anio_fabricacion);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            return res.status(400).json({ msg: "La fecha de fabricacion no es válida o es futura y debe tener el formato YYYY-MM-DD" });
        }

        if (descripcion.length < 2) {
            return res.status(400).json({ msg: "La descripcion debe tener al menos 2 caracteres" });
        }

        if (tipo_vehiculo.length < 2) {
            return res.status(400).json({ msg: "El tipo de vehiculoi debe tener al menos 2 caracteres" });
        }

        const nuevoVehiculo = new Vehiculo({ marca, modelo, placa, color, kilometraje, anio_fabricacion, descripcion, tipo_vehiculo });
        await nuevoVehiculo.save();

        res.status(201).json({ msg: "Vehiculo creado correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al crear el vehiculo" });
    }
};


const actualizarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, placa, color, kilometraje, anio_fabricacion, descripcion, tipo_vehiculo } = req.body;

        if (!marca || !modelo || !placa || !color || !kilometraje || !anio_fabricacion || !descripcion || !tipo_vehiculo) {
            return res.status(400).json({ msg: "Todos los campos obligatorios deben ser proporcionados" });
        }

        const vehiculoExistente = await Vehiculo.findOne({ placa });
        if (vehiculoExistente) {
            return res.status(400).json({ msg: "La placa del vehiculo ya está registrado" });
        }

        if (modelo.length < 2 ) {
            return res.status(400).json({ msg: "El modelo debe contener al menos 2 caracteres" });
        }

        if (placa.length > 7 || placa.length < 6) {
            return res.status(400).json({ msg: "La placa tener 3 letras y entre 3 o 4 numeros" });
        }

        if (marca.length < 2) {
            return res.status(400).json({ msg: "La marca debe contener al menos 2 caracteres" });
        }

        if (typeof kilometraje !== "number" || kilometraje < 0) {
            return res.status(400).json({ msg: "El kilometraje debe ser un número y no debe ser menor a 0" });
        }

        if (color.length < 2) {
            return res.status(400).json({ msg: "El color debe contener al menos 2 caracteres" });
        }

        const fecha = new Date(anio_fabricacion);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            return res.status(400).json({ msg: "La fecha de fabricacion no es válida o es futura y debe tener el formato YYYY-MM-DD" });
        }

        if (descripcion.length < 2) {
            return res.status(400).json({ msg: "La descripcion debe tener al menos 2 caracteres" });
        }

        if (tipo_vehiculo.length < 2) {
            return res.status(400).json({ msg: "El tipo de vehiculoi debe tener al menos 2 caracteres" });
        }

        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id,{ marca, modelo, placa, color, kilometraje, anio_fabricacion, descripcion, tipo_vehiculo },{ new: true, runValidators: true });

        res.status(200).json({ msg: "Vehiculo actualizado correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el vehiculo" });
    }
};

const eliminarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const vehiculo = await Vehiculo.findById(id);
        if (!vehiculo) {
            return res.status(404).json({ msg: "Vehiculo no encontrado" });
        }

        await Vehiculo.findByIdAndDelete(id);

        res.status(200).json({ msg: "Vehiculo eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el vehiculo" });
    }
};


export { 
    listarVehiculos, 
    detalleVehiculo, 
    crearVehiculo, 
    actualizarVehiculo, 
    eliminarVehiculo 
};