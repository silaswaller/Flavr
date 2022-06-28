const RecipeController = require("../controllers/flavr.controller");
const { authenticate } = require("../config/jwt.config")


module.exports = (app) => {
    app.get("/api/Recipes", RecipeController.findAllRecipes);
    app.post("/api/Recipes", authenticate, RecipeController.createNewRecipe);
    app.get("/api/Recipes/:id", RecipeController.findOneRecipe);
    app.get("/api/Recipesbyuser/:username", authenticate, RecipeController.findAllRecipesByUser);
    app.delete("/api/Recipes/:id", RecipeController.deleteOneRecipe);
    app.put("/api/Recipes/:id", RecipeController.updateRecipe);
}