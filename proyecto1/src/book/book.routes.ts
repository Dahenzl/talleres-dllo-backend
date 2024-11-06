import { Router, Request, Response } from "express";
import { createBook, getBookById, getBooksByFilters, deleteBook, updateBook } from "./book.controller";
import { CreateBookType, DeleteBookType, ReadFiltersBookType, ReadIdBookType, UpdateBookType } from "./book.types";
import { AuthMiddlewareCreateBook, AuthMiddlewareDeleteBook, AuthMiddlewareUpdateBook } from "../middleware/auth";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetBookById(request: Request<ReadIdBookType>, response: Response) {
    if(!request.params._id) {
        response.status(400).json({
            message: "Failure",
            information: "Missing _id to search."
        });

        return;
    }

    try {
        const bookData = { _id: request.params._id, active: request.query.active === "false" ? false : true }
        const book = await getBookById(bookData);

        if(!book) {
            response.status(404).json({
                message: "Failure",
                information: "Book not found."
            });

            return;
        }

        response.status(200).json({
            message: "Success.",
            book: book,
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as any).toString()
        });
    }
}

async function GetBooksByFilters(request: Request<ReadFiltersBookType>, response: Response) {
    try {
        const books = await getBooksByFilters(request.query);

        if(!books) {
            response.status(404).json({
                message: "Failure",
                information: "Books not found."
            });

            return;
        }

        response.status(200).json({
            message: "Success.",
            books: books,
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as any).toString()
        });
    }
}

async function UpdateBook(request: Request<UpdateBookType>, response: Response) {
    if(!request.body._id) {
        response.status(400).json({
            message: "Failure",
            information: "Missing _id to update."
        });

        return;
    }

    try {
        const book = await updateBook(request.body);

        response.status(200).json({
            message: "Success.",
            book: book,
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as any).toString()
        });
    }
}

async function CreateBook(request: Request<CreateBookType>, response: Response) {
    if (!request.body.titulo || !request.body.autor || !request.body.genero || !request.body.fecha_publicacion || !request.body.editorial) {
        response.status(400).json({
            message: "Failure",
            information: "Missing required fields."
        });

        return;
    }

    try {
        const books = await createBook(request.body);
    
        response.status(200).json({
            message: "Success.",
            book: books,
        });

    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as any).toString()
        });
    }
}

async function DeleteBook(request: Request<DeleteBookType>, response: Response) {
    if(!request.params._id) {
        response.status(400).json({
            message: "Failure",
            information: "Missing _id to delete."
        });

        return;
    }

    try {
        // Añadimos el campo active: true, para que no se desactive un libro que ya este desactivado.
        const bookData = { _id: request.params._id, active: true }
        const book = await deleteBook(bookData);

        if(!book) {
            response.status(404).json({
                message: "Failure",
                information: "Book not found."
            });

            return;
        }

        response.status(200).json({
            message: "Success.",
            book: book,
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as any).toString()
        });
    }
}

// DECLARE ENDPOINTS
bookRoutes.get("/:_id", GetBookById);
bookRoutes.get("/", GetBooksByFilters);
bookRoutes.post("/", AuthMiddlewareCreateBook, CreateBook);
bookRoutes.put("/", AuthMiddlewareUpdateBook, UpdateBook);
bookRoutes.delete("/:_id", AuthMiddlewareDeleteBook, DeleteBook);

// EXPORT ROUTES
export default bookRoutes;