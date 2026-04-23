
export const validateUser = (user) => {

    if (!user || !user.id) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }
    
}