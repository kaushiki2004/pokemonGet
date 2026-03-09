import { useMemo, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { fetchPokemon } from "../services/pokemonApi";

export function usePokemonController() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // ✅ Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // ✅ Derived state (computed, not stored separately)
  const isFavorite = useMemo(() => {
    if (!pokemon) return false;
    return favorites.includes(pokemon.name);
  }, [pokemon, favorites]);

  async function search() {
    const q = pokemonName.trim();
    if (!q) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const p = await fetchPokemon(q);
      setPokemon(p);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Add / Remove favorite
  function toggleFavorite() {
    if (!pokemon) return;

    setFavorites((prev) => {
      if (prev.includes(pokemon.name)) {
        return prev.filter((name) => name !== pokemon.name);
      }
      return [...prev, pokemon.name];
    });
  }

  // ✅ Load a favorite Pokémon
  async function loadFavorite(name: string) {
    setPokemonName(name);
    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const p = await fetchPokemon(name);
      setPokemon(p);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return {
    pokemonName,
    setPokemonName,
    loading,
    error,
    pokemon,
    search,

    favorites,
    isFavorite,
    toggleFavorite,
    loadFavorite,
  };
}