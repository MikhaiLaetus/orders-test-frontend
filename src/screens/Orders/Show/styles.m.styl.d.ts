declare namespace StylesMStylNamespace {
  export interface IStylesMStyl {
    head: string;
    items: string;
    orderNumber: string;
    row: string;
    screen: string;
    screenWrapper: string;
    tableRow: string;
  }
}

declare const StylesMStylModule: StylesMStylNamespace.IStylesMStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesMStylNamespace.IStylesMStyl;
};

export = StylesMStylModule;
