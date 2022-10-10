const jwt = require("jsonwebtoken");

exports.getUserId = async(token) => {
    try {
        const decodedToken = await jwt.verify(token,'net ninja secret');
        const userId = decodedToken._id;
        return userId;
    } catch (error) {
        return error;
    }
}