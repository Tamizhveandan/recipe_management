const {Router} = require("express")

const router = Router()

router.get('/',(req,res) =>{
    res.json({message:"hi there"})
})


module.exports = router