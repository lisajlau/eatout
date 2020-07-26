import { formatCurrencyToPounds, formatDateTime } from "./utils";

describe("formatCurrencyToPounds", () => {
  it("returns £10.00", () => {
    expect(formatCurrencyToPounds(10)).toBe("£10.00");
  });
  it("returns £10.00 from string", () => {
    expect(formatCurrencyToPounds("10")).toBe("£10.00");
  });
});

describe("formatDateTime", () => {
  it("format date and time", () => {
    expect(formatDateTime(new Date("2020-07-26T18:47:23.757Z"))).toBe(
      "Sun, Jul 26, 2020, 07:47 PM"
    );
  });
});
