import React from "react";
import { usePokemonController } from "../controllers/usePokemonController";
import { PokemonView } from "../components/PokemonView";

export default function HomeScreen() {
  const c = usePokemonController();

  return (
    <PokemonView
  pokemonName={c.pokemonName}
  onChangeName={c.setPokemonName}
  onSearch={c.search}
  loading={c.loading}
  error={c.error}
  pokemon={c.pokemon}
  favorites={c.favorites}
  isFavorite={c.isFavorite}
  onToggleFavorite={c.toggleFavorite}
  onLoadFavorite={c.loadFavorite}
/>
  );
}