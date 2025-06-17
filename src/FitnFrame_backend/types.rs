use candid::{CandidType, Deserialize};

#[derive(Clone, CandidType, Deserialize)]
pub struct WorkoutEntry {
    pub exercise: String,
    pub reps: u32,
    pub sets: u32,
    pub calories: u32,         // Calories burned
    pub notes: Option<String>, // Optional workout notes
    pub date: String,          // Format: "YYYY-MM-DD"
}

#[derive(Clone, CandidType, Deserialize)]
pub struct UserProfile {
    pub name: String,
    pub age: u8,
    pub goal: String,
}

#[derive(Clone, CandidType, Deserialize)]
pub struct StreakData {
    pub last_date: String,
    pub count: u32,
}
