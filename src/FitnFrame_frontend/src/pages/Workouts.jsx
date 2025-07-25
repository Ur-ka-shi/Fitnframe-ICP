import { useState, useEffect } from "react";
import { FitnFrame_backend as backend } from "../../../declarations/FitnFrame_backend";
import { motion } from "framer-motion";
import { Play, Clock, BarChart2, Star } from "lucide-react";

const Workouts = () => {
  const workoutCategories = [
    { name: "Strength Training", count: 12, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500" },
    { name: "Cardio", count: 8, image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=500" },
    { name: "HIIT", count: 10, image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=500" },
    { name: "Yoga", count: 6, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500" },
  ];

  const featuredWorkouts = [
    {
      title: "Full Body Power",
      duration: "45 min",
      difficulty: "Intermediate",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Core Crusher",
      duration: "30 min",
      difficulty: "Advanced",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Cardio Blast",
      duration: "35 min",
      difficulty: "Beginner",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=500",
    },
  ];

  const [user, setUser] = useState("demoUser");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [calories, setCalories] = useState(0);
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [logs, setLogs] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const logWorkout = async () => {
    await backend.add_workout(user, {
      exercise,
      reps,
      sets,
      calories,
      notes: [],
      date: today,
    });
    fetchAll();
  };

  const saveProfile = async () => {
    await backend.set_profile(user, {
      name,
      age,
      goal,
    });
    alert("Profile Saved!");
  };

  const fetchAll = async () => {
    const streak = await backend.get_streak(user);
    const total = await backend.get_total_calories(user);
    const all = await backend.get_workouts(user);
    setStreak(Number(streak));
    setTotalCalories(Number(total));
    setLogs(all);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Workout Library</h1>
          <p className="text-gray-400">Choose from our collection of AI-powered workouts</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {workoutCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.count} workouts</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Featured Workouts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWorkouts.map((workout, index) => (
              <motion.div
                key={workout.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-purple-600/0 group-hover:bg-purple-600/80 transition-colors">
                    <Play className="h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{workout.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {workout.duration}
                      </span>
                      <span className="flex items-center">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        {workout.difficulty}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEW SECTION: Logger + Tracker */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl mt-12">
          <h2 className="text-xl font-bold mb-4">🏋️ Track Your Workouts</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <input className="w-full mb-2 p-2 rounded" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
              <input className="w-full mb-2 p-2 rounded" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <input className="w-full mb-2 p-2 rounded" type="number" placeholder="Age" onChange={(e) => setAge(Number(e.target.value))} />
              <input className="w-full mb-2 p-2 rounded" placeholder="Fitness Goal" onChange={(e) => setGoal(e.target.value)} />
              <button onClick={saveProfile} className="w-full bg-purple-600 py-2 rounded text-white hover:bg-purple-700">
                Save Profile
              </button>
            </div>

            <div>
              <input className="w-full mb-2 p-2 rounded" placeholder="Exercise" onChange={(e) => setExercise(e.target.value)} />
              <input className="w-full mb-2 p-2 rounded" type="number" placeholder="Reps" onChange={(e) => setReps(Number(e.target.value))} />
              <input className="w-full mb-2 p-2 rounded" type="number" placeholder="Sets" onChange={(e) => setSets(Number(e.target.value))} />
              <input className="w-full mb-2 p-2 rounded" type="number" placeholder="Calories Burned" onChange={(e) => setCalories(Number(e.target.value))} />
              <button onClick={logWorkout} className="w-full bg-green-600 py-2 rounded text-white hover:bg-green-700">
                Log Workout
              </button>
            </div>
          </div>

          <div className="text-gray-300">
            <p>🔥 Current Streak: <strong>{streak} days</strong></p>
            <p>🔥 Total Calories Burned: <strong>{totalCalories}</strong> kcal</p>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Workout History</h4>
            <ul className="text-sm text-gray-400 space-y-1 max-h-40 overflow-y-auto">
              {logs.map((log, i) => (
                <li key={i}>
                  {log.exercise} — {log.reps} reps × {log.sets} sets — {log.calories} cal on {log.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
