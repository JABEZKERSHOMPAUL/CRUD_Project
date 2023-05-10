const MovieDetail = require('../modal/Movies')

const createMovies = async (req, res) => {
    try {
        const movieData = new MovieDetail({
            moviename:req.body.moviename,
            relesedate:req.body.relesedate,
            directedby: req.body.directedby,
            produced: req.body.produced,
            createdBy:req.userId
        })
        const createmovie = await movieData.save();
       
        if (createmovie){
            res.json({message:"Created"})

        }
     
    } catch (error) {
        console.log(error)
    }
}

const getAllMovie=async (req,res)=>{
    try {
        const getAll=await MovieDetail.find({createdBy:req.userId})
        if(getAll){
            res.send(getAll)
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

const getMovie = async(req,res)=>{
    try {
        const getmoviebyid =await MovieDetail.findById(req.params.id)
        if(getmoviebyid){
            res.send(getmoviebyid)
        }else{
            res.json({message:"Id not found"})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const updateMovie =async(req,res)=>{
    try {
        const update =await MovieDetail.findByIdAndUpdate(req.params.id,req.body)
        if(update){
            res.json({message:'Updated'})
        }else{
            res.json({message:"Not updated"})
        }
    } catch (error) {
        console.log(error)
    }
   
}

const deleteMovie =async (req,res)=>{
    try {
        const deletemovie = await MovieDetail.findByIdAndDelete(req.params.id)
        if(deletemovie){
            res.json({
                message:"deleted"
            })
        }else{
            res.json({
                message:"not deleted"
            })
        }
    } catch (error) {

        console.log(error)
        
    }
}

const movieListAggregation =async(req,res)=>{
    try {
        const {search,limit,skip}=req.body
       let query=[]
       if(search!==""){
        query.push({
            $match:{
                $or:[
                    {
                        moviename:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    },
                    {
                        directedby:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    },
                    {
                        produced:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    }
                ]
            }
        })
       }
       const withoutlimit =Object.assign([],query)
       withoutlimit.push({$count:'count'})

       query.push(
        {$skip:skip},
        {$limit:limit},
        {
            $project:{
                moviename:1,
                relesedate:1,
                produced:1,
                directedby:1
            }
        }
        )

        const finalquery =[
            {
                $facet:{
                    overall:withoutlimit,
                    documentdata:query
                }
            }
        ]

        const getAlldata = await MovieDetail.aggregate(finalquery)
        const data = getAlldata[0].documentdata
        const fullCount = getAlldata[0]?.overall[0]?.count

        if(data.length>0){
            res.json({
                status:1,
                response:{
                    result:data,
                    fullcount:fullCount,
                    length:data.length
                }
            })
        }else{
            res.json({
                status:0,
                response:{
                    result:[],
                    fullcount:fullCount,
                    length:data.length
                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}
module.exports= { createMovies,getAllMovie,getMovie,updateMovie,deleteMovie ,movieListAggregation}