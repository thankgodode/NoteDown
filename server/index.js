const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();

app.use(cors({ origin: "http://localhost:8081", credentials: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json({ limit: "5mb" }))

app.use("/api/toDocx", require("./routes/docx"))

app.listen(5000, () => {
    console.log("Routing...")
});