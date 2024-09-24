// Free Cocktail API: https://www.thecocktaildb.com/api.php

import express from "express";
import axios from 'axios'

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
    try {
        const drink =  await generateCocktail();
        res.render("cocktail.ejs", {
            cocktail: drink,
            ingredients: [
                drink.strIngredient1,
                drink.strIngredient2,
                drink.strIngredient3,
                drink.strIngredient4,
                drink.strIngredient5,
                drink.strIngredient6,
                drink.strIngredient7,
                drink.strIngredient8,
                drink.strIngredient9,
                drink.strIngredient10,
                drink.strIngredient11,
                drink.strIngredient12,
                drink.strIngredient13,
                drink.strIngredient14,
                drink.strIngredient15,
            ]
        });
    } catch (error) {
        res.render("cocktail.ejs");
    }
    res.render("cocktail.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

async function generateCocktail () {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        return response.data.drinks[0];
    } catch (error) {
        console.log(error.message);
    }

}