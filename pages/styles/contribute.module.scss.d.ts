export type Styles = {
  'box': string;
  'count': string;
  'green2': string;
  'green3': string;
  'green4': string;
  'green5': string;
  'info': string;
  'none': string;
  'week': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
