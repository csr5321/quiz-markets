const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, difficulty, tags } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { text: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (tags) query.tags = { $in: tags.split(',') };

        const questions = await Question.find(query)
            .populate('createdBy', 'username')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Question.countDocuments(query);

        res.json({
            questions,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalQuestions: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createQuestion = async (req, res) => {
    try {
        const question = new Question({
            ...req.body,
            createdBy: req.user.userId
        });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (question.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(question, req.body);
        await question.save();
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (question.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await question.deleteOne();
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};