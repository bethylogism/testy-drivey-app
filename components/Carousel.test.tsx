// Carousel.test.tsx

import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Carousel } from "./Carousel";

afterAll(cleanup);

describe("carousel", () => {
  it("Should render slides with titles", () => {
    render(
      <SafeAreaView>
        <Carousel
          data={[
            {
              id: 1,
              uri: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
              title: "Dahlia",
            },
            {
              id: 2,
              uri: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
              title: "Zinnia",
            },
            {
              id: 3,
              uri: "https://images.unsplash.com/photo-1587814213271-7a6625b76c33",
              title: "Tulip",
            },
            {
              id: 4,
              uri: "mock_uri",
              title: "Another flower",
            },
          ]}
        />
      </SafeAreaView>
    );
    expect(screen.queryByText("Dahlia")).toBeTruthy();
    expect(screen.queryByText("Zinnia")).toBeTruthy();
    expect(screen.getByText("Tulip")).toBeTruthy();
    expect(screen.getByText("Tulip")).toBeDefined();
    expect(screen.getByText("Another flower")).toBeDefined();

    // screen.debug();
  });
});
