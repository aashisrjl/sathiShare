exports.errorHandler = (fn)=>{
    return (req,res)=>{
        fn(req,res).catch((err)=>{
            res.status(500).json({
                message: "internal/server error",
                err
            })
        })   
     }
}