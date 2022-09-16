import { screen } from "@testing-library/react";
import App from "../pages";
import { render } from "./test-utils";

describe("App", () => {
  it("should render correctly App", () => {
    render(<App />);
    expect(screen.getByText(/leboncoin/)).toBeInTheDocument();
  });
});
