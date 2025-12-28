const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    },
});

router.post('/register', registerUser);
router.post('/login', loginUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, upload.single('profileImage'), (req, res, next) => {
        if (req.file) {
            req.body.profileImage = `/uploads/${req.file.filename}`;
        }
        next();
    }, updateUserProfile);

module.exports = router;
