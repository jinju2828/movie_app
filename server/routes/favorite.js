const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", auth, (req, res) => {
//    Find favorite information inside Favorite Collection by Movie id
   Favorite.find({"movieId": req.body.movieId})
       .exec((err, favorite)=>{
           if(err) return res.status(400).send(err)
           res.status(200).json({success: true, favoriteNumber:favorite.length})
       })
});

router.post("/favorited", auth, (req, res) => {
//Find favorite information inside Favorite Collection by Movie Id, userFrom (my user id)
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, favorite)=>{
            if(err) return res.status(400).send(err)

            //how can we know if I already favorite it?
            var result = false;
            if(favorite.length !==0) {
                result = true
            }
            res.status(200).json({success:true, favorited: result});
        })
});

router.post("/addToFavorite", auth, (req, res) => {
    console.log("req body", req.body);
    //Save the information about the movie user ID inside Favorite Collection

      const favorite = new Favorite(req.body);
      favorite.save((err,doc)=>{
          if(err) return res.json({success: false, err})
          return res.status(200).json({success: true, doc});
      })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success:true,doc})
        })
});


module.exports = router;
