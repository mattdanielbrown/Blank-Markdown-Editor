import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";
import { EditorState } from "prosemirror-state";

import { clearMocks, mockWindows } from "@tauri-apps/api/mocks";

import { toggleTheme } from ".";
import { theme } from "../../state";

describe("command.toggleTheme", () => {
  beforeEach(() => {
    mockWindows("main");
  });

  afterEach(() => {
    clearMocks();
  });

  it("toggles", () => {
    expect(window).toBeDefined();

    const bodyTheme = () => document.body.dataset.theme;
    assert.equal(theme.value, "dark");
    assert.equal(bodyTheme(), undefined);

    toggleTheme()(new EditorState());

    assert.equal(theme.value, "light");
    assert.equal(bodyTheme(), "light");

    toggleTheme()(new EditorState());

    assert.equal(theme.value, "dark");
    assert.equal(bodyTheme(), "dark");
  });
});
