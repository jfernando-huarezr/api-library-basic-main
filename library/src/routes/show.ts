import express, { Request, Response } from "express";
import { Book } from "../models/book"
import mongoose from "mongoose";

const router = express.Router();

router.get(
    '/api/library/:id',
    async(req: Request, res: Response) => {

        try {
            const { id } = req.params;
            //Consultar con la base de datos y traer el registro que coincida con el ID
            const book = await Book.findById(id)

            if(!book || Object.keys(book).length === 0) {
                res.status(404).json({
                    error: "Not found"
                })
            }
    
            res.send(book)

        } catch(error: any) {
            res.status(500).json({
                error: error.withMessage
            })
        }

    }
);

export { router as showBookRouter}