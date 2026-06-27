import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';
import { connectDatabase } from '../config/database';

const seedData = async (): Promise<void> => {
  await connectDatabase();

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await LeaderboardEntry.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.create([
    { name: 'Ava', email: 'ava@example.com', role: 'captain' },
    { name: 'Ben', email: 'ben@example.com', role: 'member' }
  ]);

  await Team.create({
    name: 'Momentum Squad',
    description: 'A high-energy training team',
    members: [users[0]._id, users[1]._id]
  });

  await Activity.create({ type: 'run', duration: 30, user: users[0]._id });
  await LeaderboardEntry.create({ user: users[0]._id, score: 120 });
  await Workout.create({ title: 'HIIT Circuit', difficulty: 'intermediate', duration: 20 });

  console.log('Seed data inserted');
};

seedData().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
