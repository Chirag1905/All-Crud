'use client'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash, FaXmark } from "react-icons/fa6"
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";

export default function Listing() {
    const [listings, setListings] = useState([]);
    const [editData, setEditData] = useState({ id: null, email: "", password: "", optionCountry: "", message: "" });

    useEffect(() => {
        handleListings();
    }, []);

    const handleEditClick = (user) => {
        setEditData({ id: user.id, email: user.email, password: user.password, optionCountry: user.optionCountry, message: user.message });
    };

    const handleCancelEdit = () => {
        setEditData({ id: null, email: "", password: "", optionCountry: "", message: "" });
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: editData.email, password: editData.password, optionCountry: editData.optionCountry, message: editData.message }),
            });
            if (response.ok) {
                toast.info("User Edited successfully");
                handleListings();
                handleCancelEdit();
            } else {
                throw new Error("Failed to edit user");
            }
        } catch (error) {
            toast.error("Error updating user");
        }
    };

    const handleListings = async () => {
        try {
            const response = await fetch("http://localhost:4000/users");
            if (!response.ok) throw new Error("Failed to fetch listings");
            const data = await response.json();
            setListings(data);
        } catch (error) {
            toast.error("Failed to fetch listings");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.error("User deleted successfully");
                setListings(listings.filter(user => user.id !== id));
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    return (
        <>
            <ToastContainer draggable theme="colored" />
            <div className="container mx-auto max-w-5xl px-4">
                <div className="row flex flex-wrap mx-[-15px]">
                    <div className="inline-col w-full">
                        <div className="card flex flex-col min-w-0 word-wrap break-words bg-gray-100 border-transparent rounded-none justify-center items-center">
                            <div className="card-body py-4 bg-gray-100 flex items-start mr-[600px] justify-between">
                                <h5 className="card-title uppercase mb-0 font-bold text-lg text-black">Manage Users</h5>
                                <Link href="/Login" className="button inline-flex items-center justify-center font-medium text-center text-sm h-8 w-24 text-cyan-700 bg-transparent border border-cyan-700 rounded-lg cursor-pointer">Logout</Link>
                            </div>
                            <div className="input-group2">
                                <table className="user-table w-full mb-0 text-lg border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-left text-black">#</th>
                                            <th className="p-4 text-left text-black">Email</th>
                                            <th className="p-4 text-left text-black">Password</th>
                                            <th className="p-4 text-left text-black">Country</th>
                                            <th className="p-4 text-left text-black">Message</th>
                                            <th className="p-4 text-left text-black">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listings.map((user, index) => (
                                            <tr key={index}>
                                                <td className="p-4 text-center border-t border-gray-100 text-black">{index + 1}</td>
                                                <td className="p-4 text-center border-t border-gray-100 text-black">
                                                    {editData.id === user.id ? (
                                                        <input
                                                            type="email"
                                                            className="form-control w-[10vw] p-1 text-base rounded-lg bg-gray-100 text-black"
                                                            value={editData.email}
                                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                        />
                                                    ) : (
                                                        user.email
                                                    )}
                                                </td>
                                                <td className="p-4 text-center border-t border-gray-100 text-black">
                                                    {editData.id === user.id ? (
                                                        <input
                                                            type="text"
                                                            className="form-control w-[10vw] p-1 text-base rounded-lg bg-gray-100 text-black"
                                                            value={editData.password}
                                                            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                                                        />
                                                    ) : (
                                                        user.password
                                                    )}
                                                </td>
                                                <td className="p-10 text-center border-t border-gray-100 text-black">
                                                    {editData.id === user.id ? (
                                                        <select
                                                            className="category-select block w-full p-2 text-base leading-6 text-cyan-700 bg-gray-100 border border-cyan-700 rounded-lg transition ease-in-out focus:border-blue-500 focus:shadow-outline"
                                                            value={editData.optionCountry}
                                                            onChange={(e) => setEditData({ ...editData, optionCountry: e.target.value })}
                                                        >
                                                            <option>United States</option>
                                                            <option>Canada</option>
                                                            <option>France</option>
                                                            <option>Germany</option>
                                                            <option>Thailand</option>
                                                        </select>
                                                    ) : (
                                                        user.optionCountry
                                                    )}
                                                </td>
                                                <td className="p-10 text-center border-t border-gray-100 text-black">
                                                    {editData.id === user.id ? (
                                                        <input
                                                            className="category-select block w-full p-2 text-base leading-6 text-cyan-700 bg-gray-100 border border-cyan-700 rounded-lg transition ease-in-out focus:border-blue-500 focus:shadow-outline"
                                                            value={editData.message}
                                                            onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                                                        />
                                                    ) : (
                                                        user.message
                                                    )}
                                                </td>
                                                <td className="p-4 text-center border-t border-gray-100 text-black">
                                                    {editData.id === user.id ? (
                                                        <>
                                                            <button type="button" onClick={() => handleUpdate(user.id)} className="button inline-flex items-center justify-center font-medium text-center text-sm h-8 w-8 text-cyan-700 bg-transparent border border-cyan-700 rounded-full cursor-pointer"><IoMdCheckmark /></button>
                                                            <button type="button" onClick={handleCancelEdit} className="button inline-flex items-center justify-center font-medium text-center text-sm h-8 w-8 text-cyan-700 bg-transparent border border-cyan-700 rounded-full cursor-pointer"><FaXmark /></button>
                                                        </>
                                                    ) : (
                                                        <button type="button" onClick={() => handleEditClick(user)} className="button inline-flex items-center justify-center font-medium text-center text-sm h-8 w-8 text-cyan-700 bg-transparent border border-cyan-700 rounded-full cursor-pointer"><FaRegEdit /> </button>
                                                    )}
                                                    <button type="button" onClick={() => handleDelete(user.id)} className="button inline-flex items-center justify-center font-medium text-center text-sm h-8 w-8 text-cyan-700 bg-transparent border border-cyan-700 rounded-full cursor-pointer"><FaTrash /> </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}