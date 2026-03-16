import { View, FlatList, Dimensions } from "react-native";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

export function TrailerCarousel({ trailers }) {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
    setPlayingIndex(index);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={trailers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: width - 32,
              marginRight: 10,
            }}
          >
            <YoutubePlayer
              height={220}
              play={playingIndex === index}
              videoId={item.key}
              onChangeState={(state) => {
                if (state === "playing") setPlayingIndex(index);
              }}
            />
          </View>
        )}
      />

      {/* Pagination */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        {trailers.map((_, index) => (
          <View
            key={index}
            style={{
              width: activeIndex === index ? 16 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? "#00c4de" : "#fff",
            }}
          />
        ))}
      </View>
    </View>
  );
}
