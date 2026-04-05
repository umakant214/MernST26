import Media from "../../models/Media.js";
import path from "path";
import fs from "fs";

// @desc    Get all media files
// @route   GET /api/admin/media
// @access  Private/Admin
export const getAllMedia = async (req, res, next) => {
  try {
    const { fileType, search } = req.query;
    let query = {};
    if (fileType && fileType !== "All Types") query.fileType = fileType.toLowerCase();
    if (search) query.originalName = { $regex: search, $options: "i" };

    const media = await Media.find(query)
      .populate("uploadedBy", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload media file
// @route   POST /api/admin/media
// @access  Private/Admin
export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "Please upload a file" });
    }

    const file = req.files.file;
    const fileName = `media_${Date.now()}_${file.name}`;
    const uploadPath = `uploads/media/${fileName}`;

    let fileType = "other";
    if (file.mimetype.startsWith("image/")) fileType = "image";
    else if (file.mimetype.startsWith("video/")) fileType = "video";
    else if (file.mimetype.includes("pdf") || file.mimetype.includes("document") || file.mimetype.includes("spreadsheet")) fileType = "document";

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

    res.status(201).json({ success: true, message: "File uploaded successfully", data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media file
// @route   DELETE /api/admin/media/:id
// @access  Private/Admin
export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: "Media not found" });

    if (fs.existsSync(media.path)) fs.unlinkSync(media.path);

    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Media deleted" });
  } catch (error) {
    next(error);
  }
};
