// Carousel.test.tsx

import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import { Dimensions, Slider } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Carousel } from "./Carousel";

describe("carousel", () => {
  it("Should render slides with titles", async () => {
    render(
      <SafeAreaView>
        <Carousel
          data={[
            {
              id: 1,
              uri: "mock_uri_1",
              title: "Dahlia",
              isVisible: true,
            },
            {
              id: 2,
              uri: "mock_uri_2",
              title: "Zinnia",
              isVisible: true,
            },
            {
              id: 3,
              uri: "mock_uri_3",
              title: "Tulip",
              isVisible: true,
            },
            {
              id: 4,
              uri: "mock_uri",
              title: "Another flower",
              isVisible: true,
            },
          ]}
        />
      </SafeAreaView>
    );
    expect(screen.queryByText("Dahlia")).toBeTruthy();
    expect(screen.queryByText("Zinnia")).toBeTruthy();
    expect(screen.queryByText("Tulip")).not.toBeTruthy();
    // Initial render limited to 3:
    expect(screen.queryByText("Another flower")).toBeNull();

    // Test: only2 are visible at any point
    expect(screen.getAllByRole("image")).toHaveLength(2);

    const carousel = screen.getByAccessibilityHint("View more slides");
    const { width } = Dimensions.get("window");
    const horizontalScroll = {
      nativeEvent: {
        contentOffset: {
          x: width,
        },
        contentSize: {
          // Dimensions of the scrollable content
          width: width,
        },
        layoutMeasurement: {
          // Dimensions of the device
          width: width,
        },
      },
    };
    fireEvent.scroll(carousel, horizontalScroll);

    const slider = within(carousel);
    await waitFor(() => slider.getByText("Another flower"));

    expect(screen.queryByText("Another flower")).toBeTruthy();

    expect(screen.getByRole("image", { name: "Another flower" })).toBeTruthy();
  });
  it("Should disable the left button", async () => {
    render(
      <SafeAreaView>
        <Carousel
          data={[
            {
              id: 1,
              uri: "mock_uri_1",
              title: "Dahlia",
              isVisible: true,
            },
            {
              id: 2,
              uri: "mock_uri_2",
              title: "Zinnia",
              isVisible: true,
            },
            {
              id: 3,
              uri: "mock_uri_3",
              title: "Tulip",
              isVisible: true,
            },
            {
              id: 4,
              uri: "mock_uri",
              title: "Another flower",
              isVisible: true,
            },
          ]}
        />
      </SafeAreaView>
    );

    const leftbtnDisabled = screen.getByRole("button", {
      name: "Go To Previous Item",
      disabled: true,
    });

    expect(leftbtnDisabled).toBeTruthy();
    const leftbtnNotDisabled = screen.queryByRole("button", {
      name: "Go To Previous Item",
      disabled: false,
    });
    expect(leftbtnNotDisabled).toBeNull();
  });
});
