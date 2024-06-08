const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const { listingSchema , reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn , isOwner}=require("../middleware.js");
const {validateListing} = require("../middleware.js");


const listingController=require("../controllers/listings.js");


//index
router.get("/",wrapAsync(listingController.index));
  

//new

      router.get("/new",isLoggedIn, listingController.renderNewForm  );


//show

      router.get("/:id", wrapAsync(listingController.showListing));




//create
router.post("/",
isLoggedIn,
validateListing,
wrapAsync(listingController.createListing));





//edit route


      router.get("/:id/edit",
      isLoggedIn,
      isOwner,
      
       wrapAsync(listingController.renderEditForm))
      ;
      




//Update Route
router.put("/:id",
isLoggedIn,
isOwner,
validateListing,
wrapAsync(listingController.updateListing))
;


//delete
 router.delete("/:id",
 isLoggedIn,
 isOwner,
 wrapAsync(listingController.deleteListing
 ));

 module.exports=router;

 