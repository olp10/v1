import { describe, expect, it } from "@jest/globals";
import { makeDataset } from "../src/make-html.js";

describe("html", () => {
  it.only("makes html", () => {
    expect(makeDataset([0, 1])).toBe(`
            <div class="row">
    <div class="col col-4">
      <h2>0</h2>
    </div>
    
    <div class="col col-4">
      <h2>1</h2>
    </div>
        
        </div>`);
  });
});
