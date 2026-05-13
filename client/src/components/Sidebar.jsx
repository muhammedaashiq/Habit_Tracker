import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
    const location = useLocation();

    const navClass = (path) =>
        location.pathname === path
            ? "w-full text-left bg-[#161b22] p-3 rounded-lg text-red-400"
            : "w-full text-left hover:bg-[#161b22] p-3 rounded-lg text-gray-300";

    return (
        <div className="w-64 h-screen bg-[#0d1117] border-r border-gray-800 p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-red-500 mb-10">
                    HabitTrack
                </h1>

                <div className="space-y-4">
                    <Link to={"/dashboard"}>
                        <button className={navClass("/dashboard")}>
                            Dashboard
                        </button>
                    </Link>

                    <Link to={"/allhabits"}>
                        <button className={navClass("/allhabits")}>
                            All Habits
                        </button>
                    </Link>

                    <Link to={"/analytics"}>
                        <button className={navClass("/analytics")}>
                            Analytics
                        </button>
                    </Link>

                    <Link to={"/newHabit"}>
                        <button className={navClass("/newhabit")}>
                            New Habit
                        </button>
                    </Link>

                </div>
            </div>

            <button className="border border-red-500 text-red-500 p-3 rounded-lg hover:bg-red-500 hover:text-black transition">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;