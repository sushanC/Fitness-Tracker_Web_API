const axios = require("axios");
const querystring = require("querystring");

// Step 1: Redirect to Google OAuth
const googleAuth = (req, res) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: [
            "https://www.googleapis.com/auth/fitness.activity.read",
            "https://www.googleapis.com/auth/fitness.heart_rate.read",
            "https://www.googleapis.com/auth/fitness.body.read"
        ].join(" "),
        access_type: "offline",
        prompt: "consent",
    };

    res.redirect(`${rootUrl}?${querystring.stringify(options)}`);
};

// Step 2: Handle OAuth Callback
const googleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        });

        const { access_token, refresh_token } = tokenResponse.data;
        // TODO: Save tokens in your User DB
        res.json({ access_token, refresh_token });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Token exchange failed" });
    }
};

// Step 3: Example API Request (Steps)
const getGoogleSteps = async (req, res) => {
    const accessToken = req.headers["x-access-token"]; // for testing, send in header

    try {
        const response = await axios.post(
            "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            {
                aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
                bucketByTime: { durationMillis: 86400000 }, // 1 day
                startTimeMillis: Date.now() - 7 * 86400000, // last 7 days
                endTimeMillis: Date.now(),
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: "Error fetching steps" });
    }
};

module.exports = { googleAuth, googleCallback, getGoogleSteps };
