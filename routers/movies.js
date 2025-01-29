const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

//index
router.get("/", movieController.index );

//show 
router.get("/:id" , movieController.show);

//salvataggio di una review
router.post("/:id/reviews" , movieController.storeReview);


module.exports = router;