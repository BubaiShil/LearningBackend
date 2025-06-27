// src/middleware/multer.middleware.js

import multer from "multer";
import path from "path";

// --- Storage Configuration (remains the same) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure this 'uploads/' directory exists in your project root
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// --- Image File Filter ---
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept images
    } else {
        cb(new Error("Only image files are allowed for this upload!"), false); // Reject others
    }
};

// --- Resume (PDF) File Filter ---
const resumeFileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") { // Check specifically for PDF MIME type
        cb(null, true); // Accept PDF
    } else {
        cb(new Error("Only PDF files are allowed for resume upload!"), false); // Reject others
    }
};

// --- Export specific Multer instances ---
export const uploadImage = multer({ storage, fileFilter: imageFileFilter });
export const uploadResume = multer({ storage, fileFilter: resumeFileFilter });

// (Optional) If you still have a default 'upload' being used elsewhere, you can keep it,
// but it's cleaner to explicitly import uploadImage or uploadResume.
// If you want to remove it, ensure no other files rely on `import upload from ...`
// export default uploadImage; // Or remove this line if you want only named exports