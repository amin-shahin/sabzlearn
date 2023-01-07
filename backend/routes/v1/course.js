const express = require("express");
const multer = require("multer");

const courseController = require("../../controllers/v1/course");
const multerStorage = require("../../util/multerStorage");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const loginUser = require('./../../middlewares/loginUser')

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  .post(
    // multer({ storage: multerStorage }).single('cover'),
    authenticatedMiddleware,
    isAdminMiddleware,
    courseController.create
  )
  .get(courseController.getAll);

router
  .route("/:id/sessions")
  .post(isAdminMiddleware, courseController.createSession);

router.route("/:shortName").post(loginUser, courseController.getOne);

router.route("/:id/register").post(courseController.register);

router.route('/category/:categoryName').get(courseController.getCategoryCourses)

module.exports = router;
