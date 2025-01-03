import type { Command } from "prosemirror-state";

import { type DialogFilter, save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import { sendNotification } from "@tauri-apps/plugin-notification";

import { type exporterFunc } from "../../exporters";

export default (
    title: string,
    exporter: exporterFunc,
    filters?: DialogFilter[],
  ): Command =>
  (state) => {
    const isEmpty =
      (document.querySelector(".ProseMirror")?.textContent ?? "").trim()
        .length === 0;

    if (isEmpty) {
      sendNotification({
        title,
        body: "Your document is empty. There is nothing to export.",
      });
      return false;
    }

    (async () => {
      const dest = await save({ filters });

      if (dest === null) {
        return false;
      }

      const contents = await exporter(state);
      await writeFile(dest, contents);

      return true;
    })()
      .then((isExported: boolean) => {
        if (isExported) {
          sendNotification({
            title,
            body: "Your file has been exported",
          });
        }
      })
      .catch((err: Error) => {
        const error = err.message ?? JSON.stringify(err);
        sendNotification({
          title,
          body: `Failed to export file: ${error}`,
        });
      });

    return true;
  };
