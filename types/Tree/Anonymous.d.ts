declare namespace Less {
  interface Anonymous extends Node {
    constructor(
      value: string | number,
      index?,
      currentFileInfo?,
      mapLines?,
      rulesetLike?,
      visibilityInfo?
    );
  }
}
