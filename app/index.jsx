import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { fetchPokemon } from "../services/pokemonApi";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null); // Pokemon | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setLoading(true);
      setPokemon(null);

      const data = await fetchPokemon(query);
      setPokemon(data);
    } catch (e) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />

      {loading && <Text>Loading...</Text>}
      {!!error && <Text style={{ color: "red" }}>{error}</Text>}

      {!!pokemon && (
        <View style={{ marginTop: 16, alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>{pokemon.name}</Text>

          {!!pokemon.image && (
            <Image source={{ uri: pokemon.image }} style={{ width: 120, height: 120 }} />
          )}

          <Text>Types: {pokemon.types?.join(", ")}</Text>
          <Text>Abilities: {pokemon.abilities?.join(", ")}</Text>

          <Text style={{ fontWeight: "600", marginTop: 8 }}>Moves (first 5):</Text>
          {pokemon.moves?.map((m) => (
            <Text key={m}>• {m}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 10 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
});