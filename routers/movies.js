const express = require("express");
const movieController = require("../controllers/movieController");
const upload = require("../middleware/fileUpload");

const router = express.Router();

//index
router.get("/", movieController.index );

//show 
router.get("/:id" , movieController.show);

//salvataggio di una review
router.post("/:id/reviews" , movieController.storeReview);

//salvataggio di un film
router.post("/", upload.single("image") , movieController.storeMovie)


module.exports = router;