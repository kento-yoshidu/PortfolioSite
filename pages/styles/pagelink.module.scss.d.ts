export type Styles = {
  'icon': string;
  'linkItem': string;
  'linkTitle': string;
  'text': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
