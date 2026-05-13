import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HabitCard from "../components/HabitCard";
import API from "../services/api";

const AllHabits = () => {
  const [habits, setHabits] = useState([]);

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
      console.log(error);
    }
  };

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
      console.log(error);
    }
  };

  return (
    <div className="md:flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          All Habits
        </h1>

        {habits.length === 0 ? (
          <p className="text-gray-400">
            No habits created yet.
          </p>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              completeHabit={completeHabit}
              deleteHabit={deleteHabit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllHabits;