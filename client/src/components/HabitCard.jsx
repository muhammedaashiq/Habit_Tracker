const HabitCard = ({ 
    habit,
    completeHabit,
    deleteHabit
 }) => {
  const miniGraph = Array.from({ length: 35 });

  const getColor = () => {
    const colors = [
      "bg-[#161b22]",
      "bg-red-900",
      "bg-red-700",
      "bg-red-500",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 mb-6 hover:border-red-500 transition duration-300 hover:scale-[1.01]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {habit.title}
          </h2>

          <p className="text-gray-400 mt-2">
            {habit.description}
          </p>
        </div>

        <div className="text-red-500 text-2xl font-bold">
          🔥 {habit.streak}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-6">
        {miniGraph.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-sm ${getColor()}`}
          ></div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-red-500 hover:bg-red-600 hover:scale-105 text-black px-5 py-2 rounded-lg font-semibold transition duration-300" onClick={() => completeHabit(habit._id)}>
          Complete
        </button>

        <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:scale-105 px-5 py-2 rounded-lg transition duration-300" onClick={() => deleteHabit(habit._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;