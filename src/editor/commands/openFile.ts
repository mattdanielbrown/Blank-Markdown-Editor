import type { Command } from "prosemirror-state";
import { defaultMarkdownParser } from "prosemirror-markdown";

import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { sendNotification } from "@tauri-apps/plugin-notification";

import { path } from "../../state";

export default (): Command => (state, dispatch) => {
  (async () => {
    const newPath = await open({
      filters: [{ name: "Markdown", extensions: ["md"] }],
    });
    if (typeof newPath === "string") {
      path.value = newPath;
      const content = await readTextFile(path.value);
      const doc = defaultMarkdownParser.parse(content);
      if (dispatch && doc !== null) {
        dispatch(state.tr.replaceWith(0, state.doc.content.size, doc));
      }
    }
  })().catch((err) => {
    sendNotification(`Failed to open file: ${JSON.stringify(err)}`);
  });

  return true;
};
