import Media from "../../models/Media.js";
import fs from "fs";

// @desc    Get author's media files
// @route   GET /api/author/media
// @access  Private/Author
export const getMyMedia = async (req, res, next) => {
  try {
    const media = await Media.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload media file
// @route   POST /api/author/media
// @access  Private/Author
export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "Please upload a file" });
    }

    const file = req.files.file;
    if (file.size > 50 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: "File size must be less than 50MB" });
    }

    const fileName = `author_${req.user._id}_${Date.now()}_${file.name}`;
    const uploadPath = `uploads/media/${fileName}`;

    let fileType = "other";
    if (file.mimetype.startsWith("image/")) fileType = "image";
    else if (file.mimetype.startsWith("video/")) fileType = "video";
    else if (file.mimetype.includes("pdf") || file.mimetype.includes("document")) fileType = "document";

    await file.mv(uploadPath);

    const media = await Media.create({
      filename: fileName,
      originalName: file.name,
      mimetype: file.mimetype,
      size: file.size,
      path: uploadPath,
      uploadedBy: req.user._id,
      fileType,
    });

    res.status(201).json({ success: true, message: "File uploaded", data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete author's media file
// @route   DELETE /api/author/media/:id
// @access  Private/Author
export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findOne({ _id: req.params.id, uploadedBy: req.user._id });
    if (!media) return res.status(404).json({ success: false, message: "Media not found" });

    if (fs.existsSync(media.path)) fs.unlinkSync(media.path);

    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Media deleted" });
  } catch (error) {
    next(error);
  }
};
