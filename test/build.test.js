import { describe, expect, it } from "@jest/globals";

function x(num) {
  return num * 2;
}

describe("parser", () => {
  it("parses a file with numbers", () => {
    const fuu = x(3.5);
    expect(fuu).toBe(7);
  });
});
