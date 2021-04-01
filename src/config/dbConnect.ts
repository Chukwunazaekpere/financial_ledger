import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: "./src/config/config.env"});


const connectDb = async () => {
    console.log('\n\t Initiating DB connection...');
    try {
        const dbConnect = new pg.Client(process.env.LEDGER_URI as string || process.env.LEDGER_URI_LOCAL)
        console.log('\n\t DB connected successfully...');
        return dbConnect;
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    };
};


export default connectDb;