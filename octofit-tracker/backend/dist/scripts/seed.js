"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const database_1 = require("../config/database");
const seedData = async () => {
    await (0, database_1.connectDatabase)();
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await models_1.User.deleteMany({});
    await models_1.Team.deleteMany({});
    await models_1.Activity.deleteMany({});
    await models_1.LeaderboardEntry.deleteMany({});
    await models_1.Workout.deleteMany({});
    const users = await models_1.User.create([
        { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain' },
        { name: 'Ben Ortiz', email: 'ben.ortiz@example.com', role: 'member' },
        { name: 'Chloe Kim', email: 'chloe.kim@example.com', role: 'member' }
    ]);
    await models_1.Team.create([
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
    await models_1.Activity.create([
        { type: 'run', duration: 35, user: users[0]._id },
        { type: 'strength', duration: 45, user: users[1]._id },
        { type: 'yoga', duration: 25, user: users[2]._id }
    ]);
    await models_1.LeaderboardEntry.create([
        { user: users[0]._id, score: 142 },
        { user: users[1]._id, score: 121 },
        { user: users[2]._id, score: 109 }
    ]);
    await models_1.Workout.create([
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
