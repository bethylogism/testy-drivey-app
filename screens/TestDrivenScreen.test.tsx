// TestDrivenScreen.test.tsx
import { TestDrivenScreen } from "./TestDrivenScreen";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react-native";

describe("New test driven screen", () => {
  it("should render", () => {
    render(<TestDrivenScreen />);
    expect(screen.toJSON()).not.toBeNull();
  });
});
