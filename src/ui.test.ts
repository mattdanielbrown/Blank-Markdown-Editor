import { assert, describe, expect, it, beforeAll } from "vitest";

import { bootUI } from "./ui";
import { path, textContent } from "./state";

beforeAll(() => {
  expect(window).toBeDefined();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.Notification = {
    permission: "granted",
  };
  bootUI();
});

describe("ui", () => {
  it("updates the file path display", () => {
    expect(window).toBeDefined();
    const uiTop = document.querySelector<HTMLElement>("#ui-top");
    assert.isNotNull(uiTop);

    if (!uiTop) return;
    assert.equal(uiTop.innerHTML, "» Untitled");

    path.value = "/this/is/a/test/path";

    assert.equal(uiTop.innerHTML, `» ${path.value}`);
  });

  it("updates the word and char count", () => {
    expect(window).toBeDefined();
    const uiBottom = document.querySelector<HTMLElement>("#ui-bottom");
    assert.isNotNull(uiBottom);

    if (!uiBottom) return;
    assert.equal(uiBottom.innerHTML, "0 words 0 chars");

    textContent.value = "one two three four";
    const charCount = textContent.value.length;
    const wordCount = textContent.value.split(/\s/).length;

    assert.equal(uiBottom.innerHTML, `${wordCount} words ${charCount} chars`);
  });
});
