import mongoose from "mongoose";

//interface permite crear una estructura (como en sql creas tablas). Esto es lo que se recibe
interface BookAttrs {
    title: string,
    description: string,
    author: string,
    year: number,
    ISBN: string,
    hardcover: boolean,
    countryOrigin: string,
    cost: number,
    autographed: boolean,
    category: string
}

//se tiene que crear una estructura para lo que se envia mongo y se guarda en la bsea de datos
interface BookDoc extends mongoose.Document {
    title: string,
    description: string,
    author: string,
    year: number,
    ISBN: string,
    hardcover: boolean,
    countryOrigin: string,
    cost: number,
    autographed: boolean,
    category: string
}

interface BookModel extends mongoose.Model<BookDoc> {
    build(attrs: BookAttrs): BookDoc;
}

//para guardar ser debe cumplir este esquema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    hardcover: {
        type: Boolean,
        required: true
    },
    countryOrigin: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    autographed: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
    
})

bookSchema.statics.build = (attrs: BookAttrs) => {
    return new Book(attrs)
}

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book }