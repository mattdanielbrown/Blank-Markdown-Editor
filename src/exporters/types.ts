import { EditorState } from "prosemirror-state";

export type exporterFunc = (state: EditorState) => Promise<Uint8Array | ReadableStream<Uint8Array>>;
