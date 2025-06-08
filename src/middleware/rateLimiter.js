import ratelimit from "../config/upstash.js";
//since the type defined in the package.json is module you have to add the extension

const rateLimiter = async(req,res,next)=>{
    try{
        //it was just for understanding ratelimiting concept
        //in a real-world-app you'd like to put the userid or ipaddress as your key
        //in this you could have userid, ip 
        const {success} = await ratelimit.limit(
            "my-rate-limit"
        )
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again after sometime"
            })
        }
        next();
    }catch(error){
        console.log("Rate lmit error",error);
        next(error);
    }
}


export default rateLimiter;