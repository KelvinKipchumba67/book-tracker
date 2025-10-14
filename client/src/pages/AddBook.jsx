import React, { useState } from 'react';
import { useBookDispatch } from '../context/bookHooks';
import * as api from '../services/api';
export default function AddBook() {
const dispatch = useBookDispatch();
const [form, setForm] = useState({ title: '', author: '', genre: '', status:
'to read', progress: 0 });
const handleChange = (e) => setForm({ ...form, [e.target.name]:
e.target.value });
const handleSubmit = async (e) => {
e.preventDefault();
try {
const res = await api.addBook(form);
dispatch({ type: 'ADD_BOOK', payload: res.data });
setForm({ title: '', author: '', genre: '', status: 'to read', progress:
0 });
} catch (err) {
console.error(err);
}
};
return (
<form onSubmit={handleSubmit} className="p-4 max-w-md">
<input name="title" value={form.title} onChange={handleChange}
placeholder="Title" className="w-full mb-2 p-2 border rounded" />
<input name="author" value={form.author} onChange={handleChange}
placeholder="Author" className="w-full mb-2 p-2 border rounded" />
<input name="genre" value={form.genre} onChange={handleChange}
placeholder="Genre" className="w-full mb-2 p-2 border rounded" />
<div className="mb-2">
<label className="mr-2">Status</label>
<select name="status" value={form.status} onChange={handleChange}
className="border p-2 rounded">
<option value="to read">To Read</option>
<option value="reading">Reading</option>
<option value="finished">Finished</option>
</select>
</div>
<div className="mb-2">
<label className="mr-2">Progress (%)</label>
<input type="number" name="progress" value={form.progress}
onChange={handleChange} min={0} max={100} className="border p-2 rounded" />
</div>
<button type="submit" className="bg-blue-600 text-white px-4 py-2
rounded">Add Book</button>
</form>
);
}