import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import MovieCard from "../../components/MovieCard";
import { styles } from "@/global-stylesheet";
import { getSavedMovies } from "../../services/storage";

const saved = () => {
  const [savedMovies, setSavedMovies] = useState(null);

  const handleMoviesRendering = async () => {
    const movies = await getSavedMovies();
    setSavedMovies(movies);
  };

  useEffect(() => {
    handleMoviesRendering();
  }, [savedMovies]);

  return (
    <Container>
      {savedMovies === null || savedMovies.length < 1 ? (
        <>
          <View className="justify-center items-center flex-1 h-full">
            <Text style={{ fontSize: 24 }} className="text-accent">
              No Saved!
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </Container>
  );
};

export default saved;
