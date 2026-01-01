import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

/* ---------- Fallback Chinese Food Items ---------- */
const defaultChineseFoods = [
  {
    id: "c1",
    name: "Veg Hakka Noodles",
    image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
    rating: 4.5,
    cuisine: "Chinese",
  },
  {
    id: "c2",
    name: "Manchurian",
    image: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
    rating: 4.6,
    cuisine: "Chinese",
  },
  {
    id: "c3",
    name: "Spring Rolls",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    rating: 4.4,
    cuisine: "Chinese",
  },
];

/* ---------- Component ---------- */
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeCuisine, setActiveCuisine] = useState("Italian");
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch API Data ---------- */
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        const allowedCuisines = ["Indian", "Italian", "Chinese"];

        let validRecipes = data.recipes.filter((recipe) =>
          allowedCuisines.includes(recipe.cuisine)
        );

        const chineseFromApi = validRecipes.filter(
          (recipe) => recipe.cuisine === "Chinese"
        );

        // Add fallback Chinese dishes if API has less
        if (chineseFromApi.length < 3) {
          validRecipes = [...validRecipes, ...defaultChineseFoods];
        }

        setRecipes(validRecipes);
        setFilteredRecipes(
          validRecipes.filter((r) => r.cuisine === "Italian")
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------- Filter Handler ---------- */
  const filterCuisine = (cuisine) => {
    setActiveCuisine(cuisine);
    setFilteredRecipes(recipes.filter((r) => r.cuisine === cuisine));
  };

  if (loading) return <p className="status">Loading recipes...</p>;

  return (
    <>
      {/* ---------- Cuisine Selector ---------- */}
      <section className="cuisine-container">
        <button
          className={`cuisine-card ${
            activeCuisine === "Indian" ? "active" : ""
          }`}
          onClick={() => filterCuisine("Indian")}
        >
          <img
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
            alt="Indian food"
          />
          <span>Indian</span>
        </button>

        <button
          className={`cuisine-card ${
            activeCuisine === "Italian" ? "active" : ""
          }`}
          onClick={() => filterCuisine("Italian")}
        >
          <img
            src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
            alt="Italian food"
          />
          <span>Italian</span>
        </button>

        <button
          className={`cuisine-card ${
            activeCuisine === "Chinese" ? "active" : ""
          }`}
          onClick={() => filterCuisine("Chinese")}
        >
          <img
            src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg"
            alt="Chinese food"
          />
          <span>Chinese</span>
        </button>
      </section>

      {/* ---------- Recipes Grid ---------- */}
      <section className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </>
  );
};

export default RecipeList;
