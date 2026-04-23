import './src/config/env.js';
import app from './app.js';
import connnectToDb from './src/config/db.js';

const startServer = () => {
    try {
        const PORT = process.env.PORT || 5500;

        connnectToDb().then((data) => {
            app.listen(PORT, () => {
                console.log("Server is running on PORT :", PORT);
            });
        });
        
    } catch (error) {
        console.error("Error : ", error);
    }
}

startServer();

