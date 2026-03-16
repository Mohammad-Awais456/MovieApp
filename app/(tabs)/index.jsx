import { useEffect } from "react";
import Container from "../../components/Container";
import SearchBar from "../../components/SeachBar";
import MovieCard from "../../components/MovieCard";
import { fetch_movies } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Keyboard,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../global-stylesheet";
export default function Index() {
  const { loading, data, error } = useFetch(() =>
    fetch_movies({ search_query: "", pageNumber: 1 }),
  );

  const navigation = useNavigation();

  const handleSearch = (query) => {
    if (!query.trim()) return;

    navigation.navigate("search", {
      query: query,
    });
  };

  return (
    <Container>
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SearchBar handleSearch={handleSearch} />
        <Text style={[styles.h2, { marginTop: 30 }]}>
          Discover Trending Movies
        </Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 60 }} />
        ) : (
          <FlatList
            data={data.results.filter(
              (item) => item.poster_path && item.release_date,
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </Pressable>
    </Container>
  );
}
