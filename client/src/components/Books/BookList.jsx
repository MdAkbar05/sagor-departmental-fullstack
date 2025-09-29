import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../features/bookSlice";
import BookForm from "./BookForm";

const BookList = () => {
  const books = useSelector((state) => state.booksReducer.books);
  const [editBook, setEditBook] = React.useState();

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };
  const handleEdit = (editedBook) => {
    setEditBook(editedBook);
  };
  return (
    <>
      <BookForm edit={editBook} />
      <div className="h-screen  flex flex-col items-center justify-center">
        <div className="text-3xl text-red-500">BookList</div>
        <div className="flex flex-wrap gap-4 p-2">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="shadow-md flex flex-col justify-around gap-3 p-4 bg-slate-100 max-w-72"
              >
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="italic">{book.author}</p>
                <div className="flex justify-between">
                  <p className="text-green-600">{book.price}$</p>
                  <p>{book.quantity}</p>
                </div>
                <p>{book.description}</p>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-700 text-white p-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-orange-700 text-white p-2 rounded-md"
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookList;
