export type Styles = {
  'footer': string;
  'footerTitle': string;
  'icon': string;
  'imgWrapper': string;
  'link': string;
  'linkWrapper': string;
  'sec1': string;
  'sec3': string;
  'sec4': string;
  'section': string;
  'sectionTitle': string;
  'sectionWrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
