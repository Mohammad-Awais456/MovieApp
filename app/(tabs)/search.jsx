import Container from "../../components/Container";
import { useRoute } from "@react-navigation/native";
import SearchBar from "../../components/SeachBar";
import { fetch_movies } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import { styles } from "../../global-stylesheet";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import MovieCard from "../../components/MovieCard";
import { useEffect, useState } from "react";

const Search = () => {
  const route = useRoute();

  const { query } = route.params || {}; // <-- default to empty object
  const [searchQuery, setSearchQuery] = useState(query || "");
  const { loading, data, error } = useFetch(
    () => fetch_movies({ search_query: searchQuery, pageNumber: 1 }),
    [searchQuery],
  );
  const filteredMovies = (data?.results || []).filter(
    (item) => item.poster_path && item.release_date,
  );
  useEffect(() => {
    if (!!query) {
      setSearchQuery(query);
    }
  }, [query]);

  return (
    <Container>
      <SearchBar handleSearch={(q) => setSearchQuery(q)} defaultValue={query} />
      {!searchQuery ? null : (
        <Text style={[styles.h2, { marginTop: 20 }]}>
          Search Results for <Text className="text-accent">{searchQuery}</Text>
        </Text>
      )}

      {loading ? <ActivityIndicator style={{ marginTop: 60 }} /> : null}
      {!searchQuery ? (
        <View className="flex-1 min-h-[300px] w-full justify-center items-center ">
          <Text className="text-primary text-2xl">Search the movies</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingBottom: 30, marginTop: 20 }}
          ListEmptyComponent={() => (
            <View className="flex-1 min-h-[300px] w-full justify-center items-center ">
              <Text className="text-primary text-2xl">Not found!</Text>
            </View>
          )}
        />
      )}
    </Container>
  );
};

export default Search;
