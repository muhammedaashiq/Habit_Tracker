const StatsCards = ({ habits }) => {

    const totalHabits = habits.length;

    const totalCompleted = habits.reduce(
        (acc, habit) => acc + (habit.completedDates?.length || 0),
        0
    )

    const currentStreak = habits.reduce(
        (acc, habit) => acc + (habit.streak || 0),
        0
    );

    const longestStreak = Math.max(
        ...habits.map((habit) => habit.streak || 0),
        0
    );


    const cards = [
        {
            title: "Current Streak",
            value: currentStreak,
        },
        {
            title: "Longest Streak",
            value: longestStreak,
        },
        {
            title: "Habits Completed",
            value: totalCompleted,
        },
        {
            title: "Total Habits",
            value: totalHabits,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl"
                >
                    <h3 className="text-gray-400 mb-2">
                        {card.title}
                    </h3>

                    <p className="text-4xl font-bold text-red-500">
                        {card.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;