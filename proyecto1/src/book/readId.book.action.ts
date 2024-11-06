import { BookModel, BookType } from "./book.model";
import { ReadIdBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function readBookByIdAction(bookData: ReadIdBookType): Promise<BookType | null> {
    const book = await BookModel.findOne(bookData);

    return book;
}

// EXPORT ACTION FUNCTION
export default readBookByIdAction;