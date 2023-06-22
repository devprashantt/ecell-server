export async function verify(req, res) {
    try {

        const { passcode, email } = req.body;

        // Check if the passcode is valid
        if (passcode !== process.env.EVENT_CREATION_PASSCODE) {
            return res.status(401).json({
                success: false,
                message: 'Invalid passcode',
            });
        }

        // Check if the requesting user's email is allowed
        const allowedEmails = ['officialprashanttt@gmail.com'];

        if (!allowedEmails.includes(email)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized user',
            });
        }

        // Return a success response
        return res.status(201).json({
            success: true,
            message: 'Logged-in successfully',
            allowedEmails,
        });
    } catch (error) {
        // Handle any errors that occurred during event creation
        console.error('Error occurred:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to login',
            error: error.message,
        });
    }
};