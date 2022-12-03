import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ViewToken,
} from "react-native";

import { Text, View } from "../components/Themed";

const { width } = Dimensions.get("window");

const SPACING = 5;
const ITEM_LENGTH = width * 0.8; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;

interface ImageCarouselProps {
  data: ImageCarouselItem[];
}

export const Carousel: FC<ImageCarouselProps> = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    ImageCarouselItem[]
  >([]);
  const currentIndex = useRef<number>(0);
  const flatListRef = useRef<FlatList<ImageCarouselItem>>(null);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDataWithPlaceholders([
      { id: -1, uri: "", title: "", isVisible: false },
      ...data,
      { id: data.length + 1, uri: "", title: "", isVisible: false },
    ]);
    currentIndex.current = 1;
    setIsPrevDisabled(true);
  }, [data]);

  const handleOnViewableItemsChanged = useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const itemsInView = viewableItems.filter(
        ({ item }: { item: ImageCarouselItem }) => item.isVisible
      );

      if (itemsInView.length === 0) {
        return;
      }

      // @ts-ignore-next-line
      currentIndex.current = itemsInView[0].index;

      setIsNextDisabled(currentIndex.current === data.length);
      setIsPrevDisabled(currentIndex.current === 1);
    },
    [data]
  );

  const handleOnPrev = () => {
    if (currentIndex.current === 1) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current - 1,
      });
    }
  };

  const handleOnNext = () => {
    if (currentIndex.current === data.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current + 1,
      });
    }
  };

  // `data` perameter is not used. Therefore, it is annotated with the `any` type to merely satisfy the linter.
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        initialNumToRender={3}
        accessible={true}
        accessibilityLabel="Scroll horizontally"
        accessibilityHint="View more slides"
        renderItem={({ item, index }) => {
          if (!item.uri || !item.title) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [
              CURRENT_ITEM_TRANSLATE_Y * 2,
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y * 2,
            ],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_LENGTH }}>
              <Animated.View
                // aria-current={currentIndex.current === item.id}
                aria-accessibilityRole="image"
                accessibilityRole="image"
                style={[
                  {
                    transform: [{ translateY }],
                  },
                  styles.itemContent,
                ]}
              >
                <Image source={{ uri: item.uri }} style={styles.itemImage} />
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.title}
                </Text>
              </Animated.View>
            </View>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={handleOnPrev}
          disabled={isPrevDisabled}
          style={({ pressed }) => [
            {
              opacity: pressed || isPrevDisabled ? 0.5 : 1.0,
            },
            styles.arrowBtn,
          ]}
          accessibilityLabel="Go To Previous Item"
          accessibilityRole="button"
        >
          <Text style={styles.arrowBtnText}>◂</Text>
        </Pressable>
        <View style={styles.spacer} />
        <Pressable
          onPress={handleOnNext}
          disabled={isNextDisabled}
          style={({ pressed }) => [
            {
              opacity: pressed || isNextDisabled ? 0.5 : 1.0,
            },
            styles.arrowBtn,
          ]}
        >
          <Text
            style={styles.arrowBtnText}
            accessibilityLabel="Go To Next Item"
          >
            ▸
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  arrowBtn: {},
  arrowBtnText: {
    fontSize: 42,
    fontWeight: "600",
  },
  spacer: {
    width: 10,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y * 2 + ITEM_LENGTH,
    alignItems: "center",
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  item: {},
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: "absolute",
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: "white",
    fontWeight: "600",
  },
  itemImage: {
    width: "100%",
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: "cover",
  },
});
