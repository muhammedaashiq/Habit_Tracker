import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Sidebar from "../components/Sidebar";

const NewHabit = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/habits",
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            {/* <Sidebar /> */}
            <div className="relative w-full max-w-2xl bg-[#0d1117] border border-gray-800 rounded-2xl p-8">
                <h1 className="text-4xl font-bold text-red-500 mb-8">
                    Create New Habit
                </h1>



                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Habit title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#161b22] border border-gray-700 p-4 rounded-xl outline-none focus:border-red-500"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#161b22] border border-gray-700 p-4 rounded-xl outline-none focus:border-red-500 h-40 resize-none"
                    />

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-black font-bold px-8 py-4 rounded-xl transition duration-300"
                    >
                        Create Habit
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-black font-bold px-4 py-2 rounded-xl transition duration-300"
                    >
                        Back
                    </button>


                </form>
            </div>
        </div>
    );
};

export default NewHabit;