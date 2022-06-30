const Recipe = require("../models/flavr.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


    module.exports = {

        findAllRecipes: (req, res)=>{
            Recipe.find()
                .populate("createdBy", "username email")
                .then((allRecipes)=>{
                    console.log(allRecipes);
                    res.json(allRecipes);
                })
                .catch((err)=>{
                    console.log("findAllRecipes has failed!");
                    res.json({ message: "Error in findAllRecipes", error: err })
                })
        },

        createNewRecipe: (req, res)=>{

            const newRecipeObject = new Recipe(req.body);

            const decodedJWT = jwt.decode(req.cookies.usertoken,{
                complete:true
            })

            newRecipeObject.createdBy = decodedJWT.payload.id;

            newRecipeObject.save()

                .then((newRecipe)=>{
                    console.log(newRecipe);
                    res.json(newRecipe);
                })
                .catch((err)=>{
                    console.log("Error creating new recipe");
                    res.status(400).json(err)
                })
        },

        findOneRecipe: (req, res)=>{
            Recipe.findOne({ _id: req.params.id })
                .populate("createdBy", "username email")
                .then((oneRecipe)=>{
                    console.log(oneRecipe);
                    res.json(oneRecipe);
                })
                .catch((err)=>{
                    console.log("Find One Recipe failed");
                    res.json({ message: "Error in findOneRecipe", error: err })
                })
        },

        deleteOneRecipe: (req, res)=>{
            Recipe.deleteOne({_id: req.params.id})
                .then((deletedRecipe)=>{
                    console.log(deletedRecipe);
                    res.json(deletedRecipe);
                })
                .catch((err)=>{
                    console.log("Error deleteOneRecipe");
                    res.json({ message: "Error in deleteOneRecipe", error: err })
                })
        },


        updateRecipe: (req, res)=>{
            Recipe.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
                .then((updatedRecipe)=>{
                    console.log(updatedRecipe)
                    res.json(updatedRecipe)
                })
                .catch((err)=>{
                    console.log("Error in updateRecipe");
                    res.status(400).json(err) 
                })
        },


        findAllRecipesByUser: (req, res)=>{

            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");

                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn)=>{
                        Recipe.find({createdBy: userNotLoggedIn._id})
                            .populate("createdBy", "username")
                            .then((allRecipesFromUser)=>{
                                console.log(allRecipesFromUser);
                                res.json(allRecipesFromUser);
                            })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Recipe.find({ createdBy: req.jwtpayload.id })
                    .populate("createdBy", "username")
                    .then((allRecipesFromLoggedInUser) => {
                        console.log(allRecipesFromLoggedInUser);
                        res.json(allRecipesFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

        }


    }


