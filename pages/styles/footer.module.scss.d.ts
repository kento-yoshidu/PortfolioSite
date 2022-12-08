export type Styles = {
  'footer': string;
  'footerTitle': string;
  'icon': string;
  'link': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
