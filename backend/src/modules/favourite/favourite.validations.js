
export const validateBookId = (bookId)=>{
    if(!bookId){
        const error = new Error("bookId must be provided!");
        error.status = 400;
        throw error;
    }
}