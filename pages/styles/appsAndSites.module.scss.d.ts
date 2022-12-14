export type Styles = {
  'details': string;
  'icon': string;
  'listItem': string;
  'summary': string;
  'technologies': string;
  'text': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
