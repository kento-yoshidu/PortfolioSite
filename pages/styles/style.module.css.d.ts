export type Styles = {
  'icon': string;
  'link': string;
  'linkWrapper': string;
  'sec1': string;
  'sec3': string;
  'sec4': string;
  'section': string;
  'sectionTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
