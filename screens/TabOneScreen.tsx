import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { Carousel } from "../components/Carousel";

const data: ImageCarouselItem[] = [
  {
    id: 0,
    uri: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
    title: "Dahlia",
  }, // https://unsplash.com/photos/Jup6QMQdLnM
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
    title: "Sunflower",
  }, // https://unsplash.com/photos/oO62CP-g1EA
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
    title: "Zinnia",
  }, // https://unsplash.com/photos/gKMmJEvcyA8
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1587814213271-7a6625b76c33",
    title: "Tulip",
  }, // https://unsplash.com/photos/N7zBDF1r7PM
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4",
    title: "Chrysanthemum",
  }, // https://unsplash.com/photos/GsGZJMK0bJc
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e",
    title: "Hydrangea",
  }, // https://unsplash.com/photos/coIBOiWBPjk
];

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Carousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
