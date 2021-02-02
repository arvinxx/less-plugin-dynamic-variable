declare namespace Less {
  interface Node {
    toCSS: (context: Context) => string;
    genCSS: (context: Context) => void;
  }
}
