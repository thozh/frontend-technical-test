import { formatLastMessageTimestamp } from "../formatLastMessageTimestamp";

describe("formatLastMessageTimestamp", () => {
  test("should return the day number and month from a timestamp value", () => {
    expect(formatLastMessageTimestamp(1642150558000)).toBe("14 janv.");
    expect(formatLastMessageTimestamp(1651481758000)).toBe("02 mai");
    expect(formatLastMessageTimestamp(1625078400000)).toBe("30 juin");
    expect(formatLastMessageTimestamp(1666256158000)).toBe("20 oct.");
    expect(formatLastMessageTimestamp(1663318558000)).toBe("16 sept.");
  });
});
