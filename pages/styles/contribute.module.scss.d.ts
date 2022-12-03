export type Styles = {
  'box': string;
  'green1': string;
  'green2': string;
  'green3': string;
  'green4': string;
  'green5': string;
  'info': string;
  'none': string;
  'test': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
