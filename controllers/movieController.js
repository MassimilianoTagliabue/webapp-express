
//index
const index = (req,res,next) =>{

    res.json("sono index");
    
};

const show = (req,res,next) =>{
    res.json("sono show");
    
}

module.exports = {
    index,
    show,
};