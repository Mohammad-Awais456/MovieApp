import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, useRouter } from "expo-router";
import Container from "../../components/Container";
import { fetch_movies } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import { formatDate, calculateRating, formatMoney } from "../../services/utils";
import { toggleMovieSave, isMovieSaved } from "../../services/storage";
import { useEffect, useState } from "react";
import { styles } from "../../global-stylesheet";
import { LinearGradient } from "expo-linear-gradient";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { TrailerCarousel } from "../../components/TrailerCarousel";
export default function SingleMovie() {
  const { id } = useLocalSearchParams();
  const { loading, data, error } = useFetch(() => fetch_movies({ id }));
  const [movieDetails, setMovieDetails] = useState(null);
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (movieDetails) {
        const result = await isMovieSaved(movieDetails.id);
        setSaved(result);
      }
    };

    checkSaved();
  }, [movieDetails]);

  useEffect(() => {
    if (data && loading === false) {
      setMovieDetails({ ...data });
    }
  }, [loading]);
  return (
    <Container showLogo={false}>
      {loading && !movieDetails === true && (
        <View className="flex-1 justify-center ">
          <ActivityIndicator size={50} />
        </View>
      )}
      {!loading && movieDetails !== null && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ position: "relative" }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${
                    !movieDetails.poster_path
                      ? movieDetails.backdrop_path
                      : movieDetails.poster_path
                  }`,
                }}
                style={{
                  width: "100%",
                  height: 566,
                  borderRadius: 10,
                }}
              />

              {/* Shadow Gradient */}
              <LinearGradient
                colors={[
                  "rgba(0,0,0,1)",
                  "rgba(0,0,0,0.9)",
                  "rgba(0,0,0,0.7)",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.1)",
                  "transparent",
                ]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 320,
                }}
              />
            </View>

            {/* Title + Rating */}
            <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={[styles.p, { marginLeft: 4 }]}
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-gray-200 "
              >
                {formatDate(movieDetails.release_date)}
              </Text>
              <Text
                style={styles.h1}
                numberOfLines={2}
                className="text-primary "
              >
                {movieDetails.title}
              </Text>

              <View className="flex flex-row items-center flex-nowrap">
                <StarRatingDisplay
                  style={{ marginLeft: -2, gap: 0 }}
                  color={"#00c4de"}
                  rating={calculateRating(movieDetails.vote_average)}
                  starSize={23}
                  starStyle={{ marginHorizontal: 1.5 }}
                />
                <Text
                  style={[styles.h3, { marginTop: 3 }]}
                  className="text-primary"
                >
                  {((movieDetails.vote_average / 10) * 5).toFixed(1)}
                </Text>
                {/* book mark button  */}
                <Pressable
                  onPress={async () => {
                    const isSaved = await toggleMovieSave(movieDetails);

                    Toast.show({
                      type: "success",
                      text1: isSaved
                        ? "Movie saved to watchlist"
                        : "Movie removed from watchlist",
                      visibilityTime: 2000,
                      topOffset: 50,
                    });

                    setSaved(isSaved);
                  }}
                  className="ml-auto flex flex-row  items-center"
                >
                  <Ionicons
                    name={saved ? "bookmark-sharp" : "bookmark-outline"}
                    size={23}
                    color={"white"}
                  />
                  <Text
                    style={[styles.h3, { marginTop: 3 }]}
                    className="text-primary"
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* movie description  */}
            <View className="w-full mt-3">
              <Text style={styles.p2}>{movieDetails.overview}</Text>
            </View>
            {/* movie other details  */}
            <View className="w-full gap-3 mt-3">
              {(!!movieDetails.budget || !!movieDetails.revenue) && (
                <View className="w-full gap-3 flex-row">
                  {!movieDetails.budget ? null : (
                    <Text style={styles.p2}>
                      Budget:{" "}
                      <Text className="text-accent">
                        {formatMoney(movieDetails.budget)}
                      </Text>
                    </Text>
                  )}
                  {!movieDetails.revenue ? null : (
                    <Text style={styles.p2}>
                      Revenue:{" "}
                      <Text className="text-accent">
                        {formatMoney(movieDetails.revenue)}
                      </Text>
                    </Text>
                  )}
                </View>
              )}

              {!!movieDetails.spoken_languages && (
                <View className="flex-row gap-2 items-center">
                  <Text style={styles.h3}>Languages:</Text>

                  <Text style={styles.p2}>
                    {movieDetails.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(", ")}
                  </Text>
                </View>
              )}
            </View>
            {!movieDetails.videos === false &&
              movieDetails.videos.length > 0 && (
                <View className="w-full mt-3">
                  <Text style={styles.h2}>Watch Trailers:</Text>
                  <TrailerCarousel trailers={movieDetails.videos.slice(0, 6)} />
                </View>
              )}
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-full bg-secondary  border border-accent justify-center flex flex-row items-center py-3  mt-6"
            >
              <Ionicons name="arrow-back" size={20} color="#00c4de" />
              <Text style={[styles.h3, { color: "#00c4de" }]}> Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Container>
  );
}
