import React from "react";
import RecipeList from "./components/RecipeList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🍽 Recipes Listing App</h1>
        <p>Discover delicious Indian, Italian & Chinese dishes</p>
      </header>

      <main>
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
