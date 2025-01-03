import pdfmake from "pdfmake";
import vfs from "./exporters/pdf/pdfmake-vfs";

import { bootStorage } from "./storage";
import { bootEditor } from "./editor";
import { bootUI } from "./ui";

import "./scss/main.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
pdfmake.addVirtualFileSystem(vfs);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
pdfmake.addFonts({
  "DejaVu Sans": {
    normal: "dejavu-sans.ttf",
    bold: "dejavu-sans.ttf",
    italics: "dejavu-sans.ttf",
    bolditalics: "dejavu-sans.ttf",
  },
});

(async () => {
  await bootStorage();
  await bootEditor();
  bootUI();
})();
