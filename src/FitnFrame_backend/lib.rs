mod types;
use types::*;
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::{query, update};
use chrono::NaiveDate;

thread_local! {
    static WORKOUTS: RefCell<HashMap<String, Vec<WorkoutEntry>>> = RefCell::new(HashMap::new());
    static PROFILES: RefCell<HashMap<String, UserProfile>> = RefCell::new(HashMap::new());
    static STREAKS: RefCell<HashMap<String, StreakData>> = RefCell::new(HashMap::new());
}

// Add a workout + update streak
#[update]
fn add_workout(user: String, entry: WorkoutEntry) {
    // Log workout
    WORKOUTS.with(|w| {
        let mut map = w.borrow_mut();
        map.entry(user.clone()).or_default().push(entry.clone());
    });

    // Update streak
    let today = NaiveDate::parse_from_str(&entry.date, "%Y-%m-%d").unwrap();
    STREAKS.with(|s| {
        let mut map = s.borrow_mut();
        match map.get(&user) {
            Some(streak) => {
                let last = NaiveDate::parse_from_str(&streak.last_date, "%Y-%m-%d").unwrap();
                let days_diff = (today - last).num_days();
                let new_count = if days_diff == 1 {
                    streak.count + 1
                } else if days_diff == 0 {
                    streak.count
                } else {
                    1
                };
                map.insert(user.clone(), StreakData {
                    last_date: entry.date.clone(),
                    count: new_count,
                });
            },
            None => {
                map.insert(user.clone(), StreakData {
                    last_date: entry.date.clone(),
                    count: 1,
                });
            }
        }
    });
}

// Fetch all workouts
#[query]
fn get_workouts(user: String) -> Vec<WorkoutEntry> {
    WORKOUTS.with(|w| w.borrow().get(&user).cloned().unwrap_or_default())
}

// Fetch total calories burned
#[query]
fn get_total_calories(user: String) -> u32 {
    WORKOUTS.with(|w| {
        w.borrow().get(&user).map(|logs| {
            logs.iter().map(|e| e.calories).sum()
        }).unwrap_or(0)
    })
}

// Get current streak count
#[query]
fn get_streak(user: String) -> u32 {
    STREAKS.with(|s| {
        s.borrow().get(&user).map(|s| s.count).unwrap_or(0)
    })
}

// Set profile info
#[update]
fn set_profile(user: String, profile: UserProfile) {
    PROFILES.with(|p| {
        p.borrow_mut().insert(user, profile);
    });
}

// Fetch profile info
#[query]
fn get_profile(user: String) -> Option<UserProfile> {
    PROFILES.with(|p| p.borrow().get(&user).cloned())
}
