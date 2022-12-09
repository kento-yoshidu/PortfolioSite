export type Styles = {
  'count': string;
  'errorMessage': string;
  'errorText': string;
  'errorWrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
