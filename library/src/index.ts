import { app } from "./app"
import mongoose from "mongoose"

const start = async () => {
    console.log('Start library application ...')
    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongodb library')
    } catch (err) {
        console.error(err)
    }
    app.listen(3001, () => {
        console.log("library api service is online @ 3001")
    })
}

start();


