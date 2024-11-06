import mongoose, { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type UserType = {
    _id: string;
    nombre: string;
    correo: string;
    contraseña: string;
    active: boolean;
    canCreateBooks: boolean;
    canUpdateBooks: boolean;
    canDeleteBooks: boolean;
    canUpdateUsers: boolean;
    canDeleteUsers: boolean;
    historial: HistoricalUserType[];
};

type HistoricalUserType = {
    fecha: Date;
    libro_id: string;
    tipo: 'reserva' | 'entrega';
}

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    canCreateBooks: {
        type: Boolean,
        default: false
    },
    canUpdateBooks: {
        type: Boolean,
        default: false
    },
    canDeleteBooks: {
        type: Boolean,
        default: false
    },
    canUpdateUsers: {
        type: Boolean,
        default: false
    },
    canDeleteUsers: {
        type: Boolean,
        default: false
    },
    historial: [{
        fecha: {
            type: Date,
            required: true,
            default: Date.now
        },
        libro_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        tipo: {
            type: String,
            enum: ['reserva', 'entrega'],
            required: true
        }
    }]
},{
    timestamps: true,
    versionKey: false
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserType };
