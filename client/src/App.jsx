import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
export default function App() {
return (
<div className="min-h-screen bg-gray-50">
<nav className="bg-white shadow p-4 flex justify-between">
<div className="font-bold">Book Tracker</div>
<div className="flex gap-2">
<Link to="/" className="px-3">Home</Link>
<Link to="/add" className="px-3">Add Book</Link>
</div>
</nav>
<main className="p-4">
<Routes>
<Route path="/" element={<BookList />} />
<Route path="/add" element={<AddBook />} />
</Routes>
</main>
</div>
);
}