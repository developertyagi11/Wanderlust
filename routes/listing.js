const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateList} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const{storage}= require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index)) //index route
//create route
.post(isLoggedIn, upload.single("listing[image]"),validateList ,wrapAsync(listingController.createListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))  //show route
//update route
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateList ,wrapAsync( listingController.updateListing))
//delete route
.delete( isLoggedIn,isOwner,wrapAsync( listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing ));



module.exports = router;