export type Styles = {
  'box': string;
  'buttonWrapper': string;
  'count': string;
  'errorMessage': string;
  'errorText': string;
  'errorWrapper': string;
  'info': string;
  'loadingMessage': string;
  'none': string;
  'week': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
