import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history } from "prosemirror-history";
import { schema } from "prosemirror-markdown";

import { transaction } from "../state";
import { autocomplete, keymap } from "./plugins";
import { applyInitialDocument } from "./document";

export const bootEditor = async () => {
  const state = await applyInitialDocument(
    EditorState.create({
      schema,
      plugins: [history(), keymap(), autocomplete()],
    }),
  );
  const view = new EditorView(document.body, {
    state,
    handleDOMEvents: {
      blur: (view: EditorView, e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        window.setTimeout(() => view.focus(), 100);
        return true;
      },
    },
    dispatchTransaction(tx) {
      transaction.value = tx;
      view.updateState(view.state.apply(tx));
    },
  });
  transaction.value = view.state.tr;
  window.setTimeout(() => view.focus(), 100);
};
