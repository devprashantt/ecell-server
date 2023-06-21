import User from '../models/user.js';

export async function getLeaderboard(req, res) {
    try {
        const leaderboard = await User.aggregate([
            {
                $group: {
                    _id: '$college',
                    totalScore: { $sum: '$score' },
                },
            },
            {
                $lookup: {
                    from: 'colleges',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'college',
                },
            },
            {
                $sort: { totalScore: -1 },
            },
        ]);

        res.status(200).json({ leaderboard });
    } catch (error) {
        console.error('Leaderboard retrieval error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
