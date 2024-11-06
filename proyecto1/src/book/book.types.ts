import { BookType } from "./book.model";

export type CreateBookType = Omit<BookType, "_id">
export type ReadIdBookType = Pick<BookType, "_id"> & Partial<Pick<BookType, "active">>;
export type ReadFiltersBookType = Partial<Omit<BookType, "historial" | "_id" | "fecha_publicacion">> & { fecha_publicacion?: any, fecha_publicacion_min?: Date, fecha_publicacion_max?: Date };
export type UpdateBookType = Partial<BookType> & {tipo?: "reserva" | "entrega", authUser?: string, $push?: {historial: {fecha: Date, usuario_id: string, tipo: "reserva" | "entrega"}}};
export type DeleteBookType = Pick<BookType, "_id" | "active">;