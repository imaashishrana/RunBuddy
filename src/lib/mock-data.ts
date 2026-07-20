export type RunEvent = {
  id: string;
  title: string;
  organizer: string;
  organizerAvatar: string;
  location: string;
  distance: number;
  pace: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  difficulty: "Easy" | "Moderate" | "Hard";
  cover: string;
  tags: string[];
};

const gradients = [
  "linear-gradient(135deg,#4CAF50,#2E7D32)",
  "linear-gradient(135deg,#FF6B35,#E63946)",
  "linear-gradient(135deg,#4CAF50,#1E88E5)",
  "linear-gradient(135deg,#FF9F1C,#FF6B35)",
  "linear-gradient(135deg,#2E7D32,#0F766E)",
  "linear-gradient(135deg,#7C3AED,#4CAF50)",
];

export const runEvents: RunEvent[] = [
  {
    id: "morning-loop",
    title: "Sunrise Central Park Loop",
    organizer: "Ava Nakamura",
    organizerAvatar: "AN",
    location: "Central Park, NYC",
    distance: 5,
    pace: "5:30/km",
    date: "Tomorrow",
    time: "06:30 AM",
    participants: 12,
    maxParticipants: 20,
    difficulty: "Easy",
    cover: gradients[0],
    tags: ["Morning", "Beginner Friendly"],
  },
  {
    id: "brooklyn-bridge",
    title: "Brooklyn Bridge Tempo",
    organizer: "Marco Silva",
    organizerAvatar: "MS",
    location: "Brooklyn Bridge",
    distance: 10,
    pace: "4:45/km",
    date: "Sat, Jul 25",
    time: "07:00 AM",
    participants: 24,
    maxParticipants: 30,
    difficulty: "Moderate",
    cover: gradients[1],
    tags: ["Weekend", "Tempo"],
  },
  {
    id: "hill-crusher",
    title: "Hill Crusher Trail Run",
    organizer: "Priya Shah",
    organizerAvatar: "PS",
    location: "Bear Mountain",
    distance: 15,
    pace: "5:10/km",
    date: "Sun, Jul 26",
    time: "08:00 AM",
    participants: 8,
    maxParticipants: 12,
    difficulty: "Hard",
    cover: gradients[2],
    tags: ["Trail", "Elevation"],
  },
  {
    id: "sunset-riverside",
    title: "Sunset Riverside Easy",
    organizer: "Leo Park",
    organizerAvatar: "LP",
    location: "Hudson River Greenway",
    distance: 6,
    pace: "6:00/km",
    date: "Today",
    time: "07:30 PM",
    participants: 18,
    maxParticipants: 25,
    difficulty: "Easy",
    cover: gradients[3],
    tags: ["Evening", "Chill"],
  },
  {
    id: "campus-crew",
    title: "Campus Crew Track Night",
    organizer: "NYU Runners",
    organizerAvatar: "NR",
    location: "NYU Athletic Center",
    distance: 8,
    pace: "5:00/km",
    date: "Wed, Jul 23",
    time: "06:00 PM",
    participants: 32,
    maxParticipants: 40,
    difficulty: "Moderate",
    cover: gradients[4],
    tags: ["Students", "Track"],
  },
];

export const groups = [
  { id: "1", name: "NYC Sunrise Crew", members: 1284, cover: gradients[0], emoji: "🌅" },
  { id: "2", name: "Trail Blazers", members: 872, cover: gradients[2], emoji: "⛰️" },
  { id: "3", name: "5AM Club", members: 2311, cover: gradients[5], emoji: "⏰" },
  { id: "4", name: "Marathon Prep", members: 543, cover: gradients[1], emoji: "🏅" },
];

export const weeklyDistance = [
  { day: "Mon", km: 4.2 },
  { day: "Tue", km: 0 },
  { day: "Wed", km: 6.8 },
  { day: "Thu", km: 3.1 },
  { day: "Fri", km: 8.5 },
  { day: "Sat", km: 12.4 },
  { day: "Sun", km: 5.0 },
];

export const achievements = [
  { id: "1", title: "Early Bird", desc: "5 runs before 7am", icon: "🌅", unlocked: true },
  { id: "2", title: "Century Club", desc: "100 km this month", icon: "💯", unlocked: true },
  { id: "3", title: "Trail Master", desc: "10 trail runs", icon: "⛰️", unlocked: true },
  { id: "4", title: "Speed Demon", desc: "Sub 4:00 pace", icon: "⚡", unlocked: false },
  { id: "5", title: "Marathon", desc: "Complete 42.2km", icon: "🏅", unlocked: false },
  { id: "6", title: "Streak 30", desc: "30 day streak", icon: "🔥", unlocked: false },
];

export const leaderboard = [
  { rank: 1, name: "Kenji Watanabe", km: 84.2, avatar: "KW", change: "+2" },
  { rank: 2, name: "Sofia Martinez", km: 79.5, avatar: "SM", change: "-1" },
  { rank: 3, name: "You", km: 68.3, avatar: "YO", change: "+3", isYou: true },
  { rank: 4, name: "James Okafor", km: 65.1, avatar: "JO", change: "0" },
  { rank: 5, name: "Elena Rossi", km: 61.9, avatar: "ER", change: "-2" },
  { rank: 6, name: "Ravi Kapoor", km: 58.7, avatar: "RK", change: "+1" },
];

export const pastRuns = [
  { id: "r1", title: "Morning Easy", date: "Today", distance: 5.2, pace: "5:24/km", time: "28:04", elev: 42 },
  { id: "r2", title: "Tempo Session", date: "Yesterday", distance: 8.1, pace: "4:52/km", time: "39:24", elev: 78 },
  { id: "r3", title: "Long Run", date: "Sun", distance: 15.4, pace: "5:38/km", time: "1:26:44", elev: 210 },
  { id: "r4", title: "Recovery Jog", date: "Fri", distance: 4.0, pace: "6:12/km", time: "24:48", elev: 18 },
];
