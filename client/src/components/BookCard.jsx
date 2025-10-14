import React from 'react';
import * as api from '../services/api';
import { useBookDispatch } from '../context/bookHooks';
export default function BookCard({ book, onDelete }) {
const dispatch = useBookDispatch();
const changeStatus = async (status) => {
try {
const res = await api.updateBook(book._id, { status });
dispatch({ type: 'UPDATE_BOOK', payload: res.data });
} catch (err) {
console.error(err);
}
};
return (
<div className="border p-4 rounded shadow-sm">
<h3 className="font-bold text-lg">{book.title}</h3>
<p className="text-sm">{book.author}</p>
<p className="text-xs italic">{book.genre}</p>
<p className="mt-2">Status: {book.status}</p>
<p>Progress: {book.progress}%</p>
<div className="flex gap-2 mt-3">
<button onClick={() => changeStatus('reading')} className="border px-2
py-1 rounded">Mark Reading</button>
<button onClick={() => changeStatus('finished')} className="border px-2
py-1 rounded">Mark Finished</button>
<button onClick={() => onDelete(book._id)} className="textred-600">Delete</button>
</div>
</div>
);
}
