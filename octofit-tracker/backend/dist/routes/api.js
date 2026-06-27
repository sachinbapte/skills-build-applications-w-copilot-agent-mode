"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
router.post('/users/', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().populate('members').lean();
    res.json(teams);
});
router.post('/teams/', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('user').lean();
    res.json(activities);
});
router.post('/activities/', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
    res.json(leaderboard);
});
router.post('/leaderboard/', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
router.post('/workouts/', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
