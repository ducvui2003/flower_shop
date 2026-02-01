declare module 'editorjs-html/.build/edjsHTML.node' {
  type EdjsParser = {
    parse: (blocks: unknown) => string;
  };

  type EdjsParserOptions = Record<string, unknown>;

  const edjsHTML: (options?: EdjsParserOptions) => EdjsParser;
  export default edjsHTML;
}
