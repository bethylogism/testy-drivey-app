// TestDrivenCarousel.test.tsx
import { CarouselProps, TestDrivenCarousel } from "./TestDrivenCarousel";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Dimensions } from "react-native";

describe("New test driven carousel", () => {
  it("WHEN given a list of flowers, THEN it should render a scrollable carousel, with the title and image of the first flower", () => {
    render(
      <TestDrivenCarousel
        data={[
          { title: "Dahlia", imageUri: "pretend-uri" },
          { title: "Lavendar", imageUri: "pretend-uri-2" },
        ]}
      />
    );
    expect(screen.getByText("Dahlia")).toBeTruthy();
    expect(screen.getByText("Lavendar")).toBeTruthy();
    expect(screen.getByLabelText("scroll right")).toBeTruthy();
  });

  test("WHEN given no data, THEN it should show a graceful fallback screen with explanatory text", () => {
    render(<TestDrivenCarousel data={undefined} />);

    expect(screen.getByText("Sorry, no data")).toBeTruthy();
  });

  test("WHEN given an empty array of data, THEN it should show a graceful fallback screen with explanatory text", () => {
    render(<TestDrivenCarousel data={[] as CarouselProps["data"]} />);

    expect(screen.getByText("Sorry, no data")).toBeTruthy();
  });

  test("WHEN given one slide, it should show only that slide, and no option to scroll right ", () => {
    render(
      <TestDrivenCarousel data={[{ title: "Rose", imageUri: "rosey-uri" }]} />
    );

    expect(screen.getByText("Rose")).toBeTruthy();
    expect(screen.queryByLabelText("scroll right")).toBeNull();
  });
  test("WHEN given a lot of slides, it should only render the first 3", () => {
    render(
      <TestDrivenCarousel
        data={[
          { title: "Rose", imageUri: "rosey-uri" },
          { title: "Dahlia", imageUri: "pretend-uri" },
          { title: "Lavendar", imageUri: "pretend-uri-2" },
          { title: "Bluebell", imageUri: "blueb-uri" },
          { title: "Snowdrop", imageUri: "snowy-uri" },
        ]}
      />
    );

    expect(screen.getByText("Rose")).toBeTruthy();
    expect(screen.queryByText("Bluebell")).toBeFalsy();
  });

  it("scrolls new images into view", async () => {
    render(
      <TestDrivenCarousel
        data={[
          { title: "Rose", imageUri: "rosey-uri" },
          { title: "Dahlia", imageUri: "pretend-uri" },
          { title: "Lavendar", imageUri: "pretend-uri-2" },
          { title: "Bluebell", imageUri: "blueb-uri" },
          { title: "Snowdrop", imageUri: "snowy-uri" },
        ]}
      />
    );

    // Accessible role 'adjustable' is used when an element can be "adjusted" (e.g. a slider).
    const carousel = screen.getByRole("adjustable");
    const { width } = Dimensions.get("window");
    const horizontalScroll = {
      nativeEvent: {
        contentOffset: {
          x: width, // scroll right, the width of the device
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
    await waitFor(() => screen.getByText("Bluebell"));

    const fourthSlide = screen.queryByText("Bluebell");
    await waitFor(() => fourthSlide);

    expect(fourthSlide).toBeTruthy();
  });
});
