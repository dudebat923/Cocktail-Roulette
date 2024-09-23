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
            drinkName: drink.strDrink,
            drinkThumb: drink.strDrinkThumb
        });
    } catch (error) {
        res.render("cocktail.ejs", {drinkName: 'Failed to generate a cocktail'});
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