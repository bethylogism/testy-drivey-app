// TabOneScreen.test.tsx
import { screen, fireEvent, cleanup } from "@testing-library/react-native";
import { testRender } from "../../testUtils/testRender";
import TabOneScreen from "../../screens/TabOneScreen";

describe("New test driven screen", () => {
  it("should render", () => {
    testRender(<TabOneScreen />);
    expect(screen.toJSON()).not.toBeNull();
  });
});
