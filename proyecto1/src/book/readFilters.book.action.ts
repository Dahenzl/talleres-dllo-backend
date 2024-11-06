import { BookModel, BookType } from "./book.model";
import { ReadFiltersBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function readBooksByFiltersAction(filters: ReadFiltersBookType): Promise<BookType[]> {
    const books = await BookModel.find(filters);

    return books;
}

// EXPORT ACTION FUNCTION
export default readBooksByFiltersAction;