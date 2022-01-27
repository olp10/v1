import { describe, expect, it } from "@jest/globals";
import { parses } from '../src/parser';

describe("parser", () => {
    it("parses a file with numbers", () => {
      const fuu = parses(3,5);
      expect(fuu).toBe(3.5);
    });
  });
  