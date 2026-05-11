const Topbar = ({ darkMode, setDarkMode }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-white">
                    Welcome back 👋
                </h1>

                <p className="text-gray-400 mt-2">
                    Build consistency every day.
                </p>
            </div>



            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-[#161b22] border border-gray-700 px-4 py-2 rounded-lg text-white hover:border-red-500 transition"
                >
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>

                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </div>
    );
};

export default Topbar;