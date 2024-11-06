import { BookModel, BookType } from "./book.model";
import { DeleteBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function deleteBookAction(bookData: DeleteBookType): Promise<BookType | null> {
    const deletedBook = await BookModel.findOneAndUpdate(bookData, { active: false }, { new: true });

    return deletedBook;
}

// EXPORT ACTION FUNCTION
export default deleteBookAction;