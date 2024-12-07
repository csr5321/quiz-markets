const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Create admin user
        const adminUser = await User.create({
            username: 'admin',
            email: 'admin@quizmarkets.com',
            password: 'admin123',
            role: 'admin'
        });

        // Add questions with admin as creator
        const questionsWithCreator = sampleQuestions.map(q => ({
            ...q,
            createdBy: adminUser._id
        }));

        await Question.insertMany(questionsWithCreator);
        
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

module.exports = { sampleQuestions, seedDatabase };