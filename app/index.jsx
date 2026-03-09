import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  async function handleSearch() {
    const q = pokemon?.trim().toLowerCase();

    if (!q) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);

      if (!res.ok) {
        setError(`Pokemon not found (status ${res.status})`);
        return;
      }

      const json = await res.json();
      setPokemon(json);
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemon}
        onChangeText={setPokemon}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />

      {loading && <Text>Loading...</Text>}
      {!!error && <Text style={{ color: "red" }}>{error}</Text>}
      {!!pokemon && <Text>Found: {pokemon.name}</Text>}
      {!!pokemon && (
  <View style={{ marginTop: 16, alignItems: "center", gap: 8 }}>
    <Text style={{ fontSize: 20, fontWeight: "600" }}>{pokemon.name}</Text>

    {!!pokemon.sprites?.front_default && (
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 120, height: 120 }}
      />
    )}

    <Text>Types: {pokemon.types?.map((t: any) => t.type.name).join(", ")}</Text>

    <Text>
      Abilities: {pokemon.abilities?.map((a: any) => a.ability.name).join(", ")}
    </Text>

    <Text style={{ fontWeight: "600", marginTop: 8 }}>Moves (first 5):</Text>
    {pokemon.moves?.slice(0, 5).map((m: any) => (
      <Text key={m.move.name}>• {m.move.name}</Text>
    ))}
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});