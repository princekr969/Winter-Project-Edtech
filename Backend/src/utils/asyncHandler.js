const asyncHandler = (fn) => (requestHandler) =>{
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err));
    }
}


return {asyncHandler}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message:error.message
//         })
//     }
// }
