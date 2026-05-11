import { useState } from "react";

const AddHabit = ({ addHabit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addHabit(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Create New Habit
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Habit title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#161b22] border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-red-500"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#161b22] border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-red-500 hover:bg-red-600 text-black font-bold px-6 py-3 rounded-xl transition"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;