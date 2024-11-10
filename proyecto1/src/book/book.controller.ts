import createBookAction from "./create.book.action";
import readBookByIdAction from "./readId.book.action";
import readBooksByFiltersAction from "./readFilters.book.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";
import updateUserAction from "../user/update.user.action";
import { BookType } from "./book.model";
import { CreateBookType, DeleteBookType, ReadFiltersBookType, ReadIdBookType, UpdateBookType } from "./book.types";

// DECLARE CONTROLLER FUNCTION
async function getBookById(bookData: ReadIdBookType): Promise<BookType | null> {
    // Si se manda el paramatero active como false, incluye en la busqueda los libros desactivados, de lo contrario solo los activos :D
    if(bookData.active == false) {
        console.log("Including disabled books in the search.");
        delete bookData.active;
    } else{
        bookData.active = true;
    }

    try {
        const book = await readBookByIdAction(bookData);

        return book;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getBooksByFilters(filters: ReadFiltersBookType): Promise<BookType[]> {
    // Si se manda el paramatero active como false, incluye en la busqueda los libros desactivados, de lo contrario solo los activos :D
    if (filters.active as any == "false") {
        console.log("Including disabled books in the search.");
        delete filters.active;
    } else{
        filters.active = true;
    }

    if(filters.fecha_publicacion_min || filters.fecha_publicacion_max){
        filters.fecha_publicacion = {};
        if (filters.fecha_publicacion_min){
            filters.fecha_publicacion.$gte = new Date(filters.fecha_publicacion_min);
            delete filters.fecha_publicacion_min;
        } 
        if (filters.fecha_publicacion_max){
            filters.fecha_publicacion.$lte = new Date(filters.fecha_publicacion_max);
            delete filters.fecha_publicacion_max;
        }
    } else {
        delete filters.fecha_publicacion 
    }
    
    try {
        const books = await readBooksByFiltersAction(filters);

        return books;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function createBook(bookData: CreateBookType): Promise<BookType> {
    try {
        const newBook = await createBookAction(bookData);

        return newBook;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function updateBook(bookData: UpdateBookType): Promise<BookType | null> {
    // Explicacion logica: Si se manda el parametro tipo, significa que un usuario logueado esta reservando o entregando un libro, por lo que se debe actualizar el historial del libro y del mismo usuario.
    // De lo contrario, solo es un usuario con permisos de administrador actualizando la información del libro.
    try {
        if(bookData.tipo && bookData.authUser){
            console.log("Updating book and user with reservation or delivery.");
            bookData.$push = {historial: {fecha: new Date(), usuario_id: bookData.authUser, tipo: bookData.tipo}};
            const userPush = {
                _id: bookData.authUser,
                $push: {historial: {fecha: new Date(), libro_id: bookData._id, tipo: bookData.tipo}}
            }
            delete bookData.tipo;
            delete bookData.authUser;

            const updatedBook = await updateBookAction(bookData);
            if(updatedBook){
                await updateUserAction(userPush);
            }

            return updatedBook;
        } else {
            delete bookData.tipo;
            delete bookData.authUser;
            const updatedBook = await updateBookAction(bookData);

            return updatedBook;
        }
    } catch (error: any) {
        throw new Error(error);
    }
} 

async function deleteBook(bookData: DeleteBookType): Promise<BookType | null> {
    try {
        const deletedBook = await deleteBookAction(bookData);

        return deletedBook;
    } catch (error: any) {
        throw new Error(error);
    }
}

// EXPORT CONTROLLER FUNCTIONS
export { createBook, getBookById, getBooksByFilters, updateBook, deleteBook };