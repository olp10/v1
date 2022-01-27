import { describe, expect, it } from "@jest/globals";
import { makeDataset } from '../src/make-html.js';

describe("html", () => {
    it.only("makes html", () => {
        expect(makeDataset([0,1])).toBe(1213);
    });
});