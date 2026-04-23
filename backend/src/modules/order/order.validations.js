
export const validateOrders = (orders)=>{
    return;
}

export const validateStatus = (status)=>{
    if(!status){
        const error = new Error("status not found");
        error.status = 404;
        throw error;
    }
    if(!["Order Placed", "Out For Delivery","Delivered","Canceled"].includes(status)){
        const error = new Error(`status must be in ["Order Placed", "Out For Delivery","Delivered","Canceled"]`);
        error.status = 404;
        throw error;
    }
    return;
}
