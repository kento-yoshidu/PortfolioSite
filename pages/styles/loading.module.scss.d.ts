export type Styles = {
  'animate': string;
  'container': string;
  'hide': string;
  'loader': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
