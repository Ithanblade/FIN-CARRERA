import Reserva from "../models/Reservas.js";
import Cliente from "../models/Cliente.js";
import Vehiculo from "../models/Vehiculo.js"
import mongoose from "mongoose";

const crearRerserva = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body;

        if (!codigo || !descripcion || !id_cliente || !id_vehiculo ) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        if (codigo.length < 3) {
            return res.status(400).json({ msg: "El código debe tener al menos 3 caracteres" });
        }

        if (descripcion.length < 3) {
            return res.status(400).json({ msg: "La descripción debe tener al menos 3 caracteres" });
        }

        if (!mongoose.Types.ObjectId.isValid(id_cliente)) {
            return res.status(400).json({ msg: "ID de cliente no válido" });
        }

        if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
            return res.status(400).json({ msg: "ID de vehiculo no válido" });
        }

        const cliente = await Cliente.findById(id_cliente);
        if (!cliente) {
            return res.status(404).json({ msg: "Cliente no encontrado" });
        }

        const vehiculo = await Vehiculo.findById(id_vehiculo);
        if (!vehiculo) {
            return res.status(404).json({ msg: "Vehiculo no encontrado" });
        }

        const reservaExistente = await Reserva.findOne({ codigo });
        if (reservaExistente) {
            return res.status(400).json({ msg: "El código de la reserva ya está registrada" });
        }

        const reserva = new Reserva({ codigo, descripcion, id_cliente, id_vehiculo });
        await reserva.save();

        res.status(201).json({ msg: "Reserva creada correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al crear la reserva" });
    }
};

const listarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.find().populate("id_cliente", "nombre apellido email").populate("id_vehiculo", "marca modelo placa color");
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las reservas" });
    }
};

const detalleReserva = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reserva = await Reserva.findById(id).populate("id_cliente", "nombre apellido email").populate("id_vehiculo", "marca modelo placa color");

        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }

        res.status(200).json(reserva);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el detalle de la reserva" });
    }
};

const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reservaBDD = await Reserva.findById(id);
        if (!reservaBDD) {
            return res.status(404).json({ msg: "Reserva no encontrado" });
        }

        if (!codigo || !descripcion || !id_cliente || !id_vehiculo) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        if (!mongoose.Types.ObjectId.isValid(id_cliente)) {
            return res.status(400).json({ msg: "ID de cliente no válido" });
        }

        for (const id of id_vehiculo) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: `ID de vehiculo no válido` });
            }
        }

        const cliente = await Cliente.findById(id_cliente);
        if (!cliente) {
            return res.status(404).json({ msg: "Cliente no encontrado" });
        }

        const vehiculo = await Vehiculo.findById(id_vehiculo);
        if (!vehiculo) {
            return res.status(404).json({ msg: "Vehiculo no encontrado" });
        }

        if (codigo !== reservaBDD.codigo) {
            const reservaExistente = await Reserva.findOne({ codigo });
            if (reservaExistente) {
                return res.status(400).json({ msg: "El código de la reserva ya está registrado" });
            }
        }

        const reservaActualizado = await Reserva.findByIdAndUpdate(id,{ codigo, descripcion, id_cliente, id_vehiculo },{ new: true, runValidators: true });

        res.status(200).json({ msg: "Reserva actualizada correctamente"});

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la reserva" });
    }
};

const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrado" });
        }

        await Reserva.findByIdAndDelete(id);
        res.status(200).json({ msg: "Reserva eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la reserva" });
    }
};

export { 
    crearRerserva, 
    listarReserva, 
    detalleReserva, 
    actualizarReserva, 
    eliminarReserva 
};
