export type Styles = {
  'animateDot': string;
  'card': string;
  'dot': string;
  'number': string;
  'percent': string;
  'show': string;
  'svg': string;
  'svgAnime': string;
  'text': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
