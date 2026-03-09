import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { fetchPokemon } from "../services/pokemonApi";

export function usePokemonController() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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

  return {
    pokemonName,
    setPokemonName,
    loading,
    error,
    pokemon,
    search,
  };
}