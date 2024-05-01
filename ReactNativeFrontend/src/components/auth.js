const bcrypt = require('bcrypt');

// Function to securely store username and password
async function storeCredentials(username, password) {
    try {
        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store username and hashed password in database
        // TO DO: Replace the following line with a call to the actual database
        await Database.insertCredentials(username, hashedPassword);

        console.log('Credentials stored successfully');
    } catch (error) {
        console.error('Error storing credentials:', error);
    }
}

export default storeCredentials;