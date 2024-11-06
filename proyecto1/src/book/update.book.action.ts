import { BookModel, BookType } from "./book.model";
import { UpdateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function updateBookAction(bookData: UpdateBookType): Promise<BookType | null> {
    const updatedBook = await BookModel.findOneAndUpdate({ _id: bookData._id }, bookData, { new: true });

    return updatedBook;
}

export default updateBookAction;