const {convertToDocx} = require("../controllers/convertController")

const express = require("express")
const router = express.Router();

router.route("/").post(convertToDocx)

module.exports = router