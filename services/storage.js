import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
export const toggleMovieSave = async (movieDetails) => {
  try {
    const savedMovies = await AsyncStorage.getItem("savedMovies");

    let movies = savedMovies ? JSON.parse(savedMovies) : [];

    const index = movies.findIndex((movie) => movie.id === movieDetails.id);

    if (index !== -1) {
      // Movie already exists → remove it
      movies.splice(index, 1);
    } else {
      // Movie not saved → add it
      movies.push(movieDetails);
    }

    await AsyncStorage.setItem("savedMovies", JSON.stringify(movies));

    return index === -1; // true = saved, false = removed
  } catch (error) {
    console.log("Error toggling movie:", error);
  }
};
export const getSavedMovies = async () => {
  const savedMovies = await AsyncStorage.getItem("savedMovies");
  let movies = savedMovies ? JSON.parse(savedMovies) : [];
  return movies;
};
export const isMovieSaved = async (movieId) => {
  try {
    const savedMovies = await AsyncStorage.getItem("savedMovies");

    if (!savedMovies) return false;

    const movies = JSON.parse(savedMovies);

    const exists = movies.some((movie) => movie.id === movieId);

    // console.log("look for", movieId, exists);
    return exists;
  } catch (error) {
    console.log("Error checking saved movie:", error);
    return false;
  }
};
