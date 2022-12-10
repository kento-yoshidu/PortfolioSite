export type Styles = {
  'box': string;
  'count': string;
  'errorMessage': string;
  'errorText': string;
  'errorWrapper': string;
  'green2': string;
  'green3': string;
  'green4': string;
  'green5': string;
  'info': string;
  'loadingMessage': string;
  'none': string;
  'week': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
