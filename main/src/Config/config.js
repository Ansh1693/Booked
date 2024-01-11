export const configData = {
    // "REACT_APP_SERVER_URL": "http://ec2-15-206-116-126.ap-south-1.compute.amazonaws.com:5001",
    // "REACT_APP_SERVER_URL": "https://studio-x.in",
    "REACT_APP_SERVER_URL": "${process.env.REACT_APP_SERVER_URL}",
    "THEME_COLORS": {
        "PRIMARY": "#007bff",
        "SECONDARY": "#fc3"
    }
}

// current aws ip for studio-x.in = 13.233.134.213 - reverse proxy