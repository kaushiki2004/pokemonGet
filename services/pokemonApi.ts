// src/services/pokemonApi.ts
import { Pokemon } from "../models/Pokemon";
import { PokemonBuilder } from "../models/PokemonBuilder";

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const q = name.trim().toLowerCase();
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);

  if (!res.ok) throw new Error(`Pokemon not found (status ${res.status})`);

  const json = await res.json();

  const types = (json.types ?? []).map((t: any) => t?.type?.name).filter(Boolean);
  const abilities = (json.abilities ?? []).map((a: any) => a?.ability?.name).filter(Boolean);
  const moves = (json.moves ?? []).map((m: any) => m?.move?.name).filter(Boolean).slice(0, 5);

  return new PokemonBuilder()
    .setName(json.name ?? q)
    .setImage(json.sprites?.front_default ?? "")
    .setTypes(types)
    .setAbilities(abilities)
    .setMoves(moves)
    .build();
}