import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import ContributionGraph from "../components/ContributionGraph";
import HabitCard from "../components/HabitCard";
// import AddHabit from "../components/AddHabit";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") !== "light";
    });

    const navigate = useNavigate();

    // Add Habit

    // const addHabit = async (title, description) => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         const res = await API.post(
    //             "/habits",
    //             {
    //                 title,
    //                 description,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         setHabits([res.data, ...habits]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // COMPLETE HABITS

    const completeHabit = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.put(
                `/habits/${id}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedHabits = habits.map((habit) =>
                habit._id === id ? res.data : habit
            );

            setHabits(updatedHabits);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // DELETE HABITS

    const deleteHabit = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const filteredHabits = habits.filter(
                (habit) => habit._id !== id
            );

            setHabits(filteredHabits);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    const fetchHabits = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/habits", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHabits(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    //LOGOUT

    const logout = () => {
        localStorage.removeItem("token");

        navigate("/");
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="md:flex bg-black min-h-screen">
            <Sidebar />

            <div className="flex-1 md:p-8">
                <Topbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <StatsCards habits={habits}/>

                {/* <AddHabit addHabit={addHabit} /> */}

                <ContributionGraph habits={habits} />

                <div>
                    {habits.map((habit, index) => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            completeHabit={completeHabit}
                            deleteHabit={deleteHabit}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;