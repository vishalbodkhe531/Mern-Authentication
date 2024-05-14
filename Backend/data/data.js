import mongoose from "mongoose";

export const databaseConnection = () => {
    mongoose.connect(process.env.DB_URI, { DbName: "Company" })
        .then(() => console.log(`Database successfully connected`))
        .catch((e) => console.log(`error while connection ${e}`));
}