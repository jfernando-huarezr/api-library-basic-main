import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator'
import { Book } from "../models/book"

const router = express.Router();

router.put(
    '/api/library/:id',

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
        //Consultar con la base de datos los campos para actualizar el registro con el {:id}

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }
        
        const { id } = req.params;
        const { title, description, author, year, ISBN, hardcover, countryOrigin, cost, autographed, category  } = req.body
        const book = await Book.findById(id);

        book?.set({ 
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

        await book?.save()

        res.send({book})
    }
);

export { router as updateBookRouter}