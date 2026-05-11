import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Add Habit

    const addHabit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await API.post(
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

            setHabits([...habits, res.data]);

            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Habit Dashboard</h1>

            <form onSubmit={addHabit}>
                <input
                    type="text"
                    placeholder="Habit title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">Add Habit</button>
            </form>

            <br />
            <hr />
            <br />

            {habits.map((habit) => (
                <div
                    key={habit._id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{habit.title}</h3>
                    <p>{habit.description}</p>
                    <p>🔥 Streak: {habit.streak}</p>

                    <button onClick={() => completeHabit(habit._id)}>
                        Complete Today
                    </button>

                    <button onClick={() => deleteHabit(habit._id)}>
                        Delete
                    </button>

                </div>
            ))}
        </div>
    );
};

export default Dashboard;