import mongoose, { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;
    titulo: string;
    autor: string;
    genero: string;
    fecha_publicacion: Date;
    editorial: string;
    disponibilidad: boolean;
    active: boolean;
    historial: HistoricalBookType[];
};

type HistoricalBookType = {
    fecha: Date;
    usuario_id: string;
    tipo: 'reserva' | 'entrega';
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    fecha_publicacion: {
        type: Date,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },
    historial: [{
        fecha: {
            type: Date,
            required: true,
            default: Date.now
        },
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tipo: {
            type: String,
            enum: ["reserva", "entrega"],
            required: true
        }
    }]
},{
    timestamps: true,
    versionKey: false
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookType, HistoricalBookType };