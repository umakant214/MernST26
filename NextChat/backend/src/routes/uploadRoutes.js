const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let uploadedFile = req.files.file;
  const fileName = Date.now() + "_" + uploadedFile.name;
  const uploadPath = __dirname + "/../../uploads/" + fileName;

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "File uploaded!", url: `/uploads/${fileName}` });
  });
});

module.exports = router;
