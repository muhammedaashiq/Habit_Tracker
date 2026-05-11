const ContributionGraph = ({ habits }) => {
  const days = Array.from({ length: 140 });

  // combine all completed dates
  const completedDates = habits.flatMap(
    (habit) => habit.completedDates || []
  );

  const hasCompletedOnDate = (date) => {
    return completedDates.some(
      (d) =>
        new Date(d).toDateString() ===
        date.toDateString()
    );
  };

  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 mb-8">
      <h2 className="text-white text-2xl font-bold mb-6">
        Contribution Activity
      </h2>

      <div className="grid grid-cols-20 gap-2">
        {days.map((_, index) => {
          const date = new Date();

          date.setDate(date.getDate() - index);

          const completed = hasCompletedOnDate(date);

          return (
            <div
              key={index}
              className={`w-4 h-4 rounded-sm ${
                completed
                  ? "bg-red-500"
                  : "bg-[#161b22]"
              }`}
            ></div>
          );
        })}
      </div>

      <div className="flex justify-end items-center mt-4 gap-2 text-sm text-gray-400">
        <span>Less</span>

        <div className="w-4 h-4 bg-[#161b22] rounded-sm"></div>

        <div className="w-4 h-4 bg-red-500 rounded-sm"></div>

        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;