import express, { Request, Response } from "express";
import { Book } from "../models/book";

const router = express.Router();

router.get(
    '/api/library',
    async(req: Request, res: Response) => {
        //Consultar con la base de datos y traer la lista de registros
        const books = await Book.find({
            bookId: undefined,
        })

        res.send(books)
    }
);

export { router as indexBookRouter}