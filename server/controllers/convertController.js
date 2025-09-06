const HtmlToDocx = require("html-to-docx")

const convertToDocx = async(req, res) => {
    const { content } = req.body;

    try {
        console.log("Posted")
        const docxBuffer = await HtmlToDocx(content);
        console.log("Docbuffer ", docxBuffer)
        
        res.status(200).json({message:docxBuffer})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Failed to generate document"})
    }
}

module.exports = {convertToDocx}