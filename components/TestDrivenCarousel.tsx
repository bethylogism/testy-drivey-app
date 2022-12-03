// TestDrivenCarousel.tsx
import React, { useRef } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

export type CarouselProps = {
  data: Array<{ title: string; imageUri: string }> | undefined;
};

export const TestDrivenCarousel = (props: CarouselProps) => {
  const { data } = props;
  const scrollX = useRef(new Animated.Value(0)).current;

  if (!data || data.length === 0) {
    return (
      <View>
        <Text>Sorry, no data</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item: slide }) => (
          <View key={slide.title}>
            <Image source={{ uri: slide.imageUri }} />
            <Text>{slide.title}</Text>
          </View>
        )}
        initialNumToRender={3}
        accessibilityRole="adjustable"
        horizontal
        keyExtractor={(slide) => slide.title}
      />
      {data.length === 1 ? null : (
        <TouchableOpacity accessibilityLabel="scroll right">
          {`>`}
        </TouchableOpacity>
      )}
    </View>
  );
};
