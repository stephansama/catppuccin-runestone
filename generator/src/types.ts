// Shape of a `.runestonetheme` file, reverse-engineered from themes
// exported by the Runestone app.

/** `#rrggbb` / `#rrggbbaa`, or `"system"`/`"default"` for the iOS default. */
export type Color = `#${string}` | "system" | "default";

export interface Scope {
  /** Tree-sitter capture name, e.g. `function.method`. */
  name: string;
  color: Color;
  fontStyle: "regular" | "italic";
  fontWeight: "regular" | "bold";
}

export interface EditorColors {
  background: Color;
  text: Color;
  caret: Color;
  selectedLineBackground: Color;
  invisibleCharacters: Color;
  highlightedTextBackground: Color;
  insertedTextBackground: Color;
  removedTextBackground: Color;
  scrollIndicatorStyle: "white" | "black" | "default";
  gutter: {
    background: Color;
    hairline: Color;
    lineNumber: Color;
    selectedLinesBackground: Color;
    selectedLinesLineNumber: Color;
  };
  pageGuide: {
    background: Color;
    hairline: Color;
  };
}

export interface InterfaceColors {
  statusBarStyle: "default";
  keyboardAppearance: "default";
  leadingHairline: Color;
  trailingHairline: Color;
  header: {
    background: Color;
    hairline: Color;
    filename: Color;
    tint: Color;
    chevron: Color;
    unsavedChangesIndicator: Color;
    done: Color;
    language: Color;
    more: Color;
  };
  drawer: {
    background: Color;
    stroke: Color;
    grabber: Color;
    shadow: Color;
    wellBackground: Color;
    wellHairline: Color;
  };
  cursorPosition: {
    background: Color;
    stroke: Color;
    text: Color;
  };
  search: {
    inputs: {
      inputStroke: Color;
      menu: Color;
      menuActive: Color;
      queryInputBackground: Color;
      queryInputText: Color;
      queryInputPlaceholder: Color;
      queryInputIcon: Color;
      queryInputClear: Color;
      replaceInputBackground: Color;
      replaceInputText: Color;
      replaceInputPlaceholder: Color;
      replaceInputIcon: Color;
      replaceInputClear: Color;
    };
    results: {
      topHairline: Color;
      bottomHairline: Color;
      lineNumber: Color;
      selection: Color;
      emptyStateTitle: Color;
      textPreviewStroke: Color;
    };
    toolbar: {
      done: Color;
      nextResult: Color;
      previousResult: Color;
      replaceAll: Color;
      resultCount: Color;
    };
  };
}

export interface RunestoneTheme {
  appearance: "light" | "dark";
  editor: EditorColors;
  interface: InterfaceColors;
  scopes: Scope[];
}
