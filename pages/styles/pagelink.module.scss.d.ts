export type Styles = {
  'icon': string;
  'link': string;
  'text': string;
  'title': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
