import { body } from "express-validator"

export const validateBookDetail = () => {
    return [body('title', 'Title must be 3 letters').isLength({ min: 3 }), body('desc', 'Description must be 10 letters').isLength({ min: 3 }), body('author','author name required').notEmpty(), body('url','A valid url is required').notEmpty().isURL(), body('price','price should be numeric').notEmpty().isNumeric(), body('language','language is required').notEmpty()]
}

export const validateSearchText = (text)=>{
    if(!text){
        const error = new Error("No Search Text Found");
        error.status = 400;
        throw error;
    }
}