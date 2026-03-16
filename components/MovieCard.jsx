import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { styles } from "../global-stylesheet";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { formatDate, calculateRating } from "../services/utils";
const MovieCard = ({
  poster_path,
  title,
  vote_average,
  release_date,
  backdrop_path,
  id,
}) => {
  const router = useRouter();

  if (!poster_path && !release_date) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${id}`)}
      className="min-h-[100px] w-[48%] mb-4 "
    >
      <View className="flex w-full gap-1 ">
        <View
          style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#00c4de",
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${!poster_path ? backdrop_path : poster_path}`,
            }}
            style={{
              borderRadius: 10,

              width: "100%",
              resizeMode: "stretch",
              height: 266,
            }}
          />
        </View>
        <Text
          style={styles.p}
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-gray-200 "
        >
          {formatDate(release_date)}
        </Text>
        <Text
          style={styles.h3}
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-primary "
        >
          {title}
        </Text>
        <View className="flex flex-row flex-nowrap">
          <StarRatingDisplay
            style={{ marginLeft: -2, gap: 0 }}
            color={"#00c4de"}
            rating={calculateRating(vote_average)}
            starSize={13}
            starStyle={{ marginHorizontal: 1.5 }}
          />
          <Text className="text-primary">
            {((vote_average / 10) * 5).toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
