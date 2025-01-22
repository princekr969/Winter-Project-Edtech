// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };




const asyncHandler = (fn) => async (req, res, next) => {
    try {
            await fn(req, res, next);
        } catch (error) {
                res.status(500).json({
                        success: false,
                        message:error.message
                    })
                }
            }
            
export {asyncHandler};