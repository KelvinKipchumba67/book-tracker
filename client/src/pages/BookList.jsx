import React, { useState } from 'react';
import { useBookState, useBookDispatch } from '../context/bookHooks';
import * as api from '../services/api';
import BookCard from '../components/BookCard';
import useDebounce from '../hooks/useDebounce';


export default function BookList() {
const { books, loading } = useBookState();
const dispatch = useBookDispatch();


const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 400);
const [statusFilter, setStatusFilter] = useState('');


const handleDelete = async (id) => {
try {
await api.deleteBook(id);
dispatch({ type: 'DELETE_BOOK', payload: id });
} catch (err) {
console.error(err);
}
};


const filtered = books.filter((b) => {
if (statusFilter && b.status !== statusFilter) return false;
if (debouncedSearch) {
const q = debouncedSearch.toLowerCase();
return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
}
return true;
});


return (
<div className="p-4">
<div className="flex gap-2 mb-4">
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search by title or author"
className="border p-2 rounded flex-1"
/>


<select
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value)}
className="border p-2 rounded"
>
<option value="">All</option>
<option value="to read">To Read</option>
<option value="reading">Reading</option>
<option value="finished">Finished</option>
</select>
</div>


{loading ? (
<div>Loading...</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{filtered.map((book) => (
<BookCard key={book._id} book={book} onDelete={handleDelete} />
))}
</div>
)}
</div>
);
}