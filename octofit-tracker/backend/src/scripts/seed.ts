import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';
import { connectDatabase } from '../config/database';

const seedData = async (): Promise<void> => {
  await connectDatabase();

  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await LeaderboardEntry.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.create([
    { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain' },
    { name: 'Ben Ortiz', email: 'ben.ortiz@example.com', role: 'member' },
    { name: 'Chloe Kim', email: 'chloe.kim@example.com', role: 'member' }
  ]);

  await Team.create([
    {
      name: 'Momentum Squad',
      description: 'A high-energy training team focused on endurance.',
      members: [users[0]._id, users[1]._id]
    },
    {
      name: 'Peak Performers',
      description: 'A strength-focused crew that loves early morning sessions.',
      members: [users[1]._id, users[2]._id]
    }
  ]);

  await Activity.create([
    { type: 'run', duration: 35, user: users[0]._id },
    { type: 'strength', duration: 45, user: users[1]._id },
    { type: 'yoga', duration: 25, user: users[2]._id }
  ]);

  await LeaderboardEntry.create([
    { user: users[0]._id, score: 142 },
    { user: users[1]._id, score: 121 },
    { user: users[2]._id, score: 109 }
  ]);

  await Workout.create([
    { title: 'HIIT Circuit', difficulty: 'intermediate', duration: 20 },
    { title: 'Core Stability Flow', difficulty: 'beginner', duration: 15 },
    { title: 'Upper Body Strength', difficulty: 'advanced', duration: 35 }
  ]);

  console.log('Seed data inserted');
};

seedData().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
