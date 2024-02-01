import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator'
import { Book } from "../models/book";

const router = express.Router();

router.post(
    '/api/library',

    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('title is required'),
        body('description')
            .not()
            .isEmpty()
            .withMessage('description is required'),
        body('author')
            .not()
            .isEmpty()
            .withMessage('author is required'),
        body('year')
            .not()
            .isEmpty()
            .withMessage('year is required'),
        body('ISBN')
            .not()
            .isEmpty()
            .withMessage('ISBN is required'),
        body('hardcover')
            .not()
            .isEmpty()
            .withMessage('hardcover is required'),
        body('countryOrigin')
            .not()
            .isEmpty()
            .withMessage('countryOrigin is required'),
        body('cost')
            .not()
            .isEmpty()
            .withMessage('cost is required'),
        body('autographed')
            .not()
            .isEmpty()
            .withMessage('autographed is required'),
        body('category')
            .not()
            .isEmpty()
            .withMessage('category is required'),
    ],

    async(req: Request, res: Response) => {
        //Guardar un registro con la base de datos y revolver el registro guardado

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }
        
        const { title, description, author, year, ISBN, hardcover, countryOrigin, cost, autographed, category } = req.body;

        const book = Book.build({ 
            title,
            description,
            author,
            year,
            ISBN,
            hardcover,
            countryOrigin,
            cost,
            autographed,
            category
        });

        await book.save();

        res.status(201).send(book);
    }
);

export { router as createBookRouter };