import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../features/bookSlice";

const BookForm = ({ edit }) => {
  const [book, setBook] = React.useState({
    title: "",
    author: "",
    price: null,
    quantity: null,
    description: "",
  });
  useEffect(() => {
    if (edit) {
      setBook(edit);
    }
  }, [edit]);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setBook((prevBook) => ({ ...prevBook, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook({ ...book, id: nanoid() }));
  };
  return (
    <div className="mt-4 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto min-w-44 w-2/3 border bg-slate-200 p-4"
      >
        <h2 className="text-center text-orange-600">Add New Book</h2>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="px-2 py-1 mb-2"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Author"
          className="px-2 py-1 mb-2"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          className="px-2 py-1 mb-2"
          value={book.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Quantity"
          className="px-2 py-1 mb-2"
          value={book.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="px-2 py-1 mb-2"
          value={book.description}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-orange-600 rounded-md"
        >
          {edit ? "Update Book" : "Add Book"}
        </button>
        {edit ? (
          <button
            onClick={() =>
              setBook({
                title: "",
                author: "",
                price: "",
                quantity: "",
                description: "",
              })
            }
            className="w-full px-4 py-2 mt-4 text-white bg-orange-600 rounded-md"
          >
            Cancel
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default BookForm;
