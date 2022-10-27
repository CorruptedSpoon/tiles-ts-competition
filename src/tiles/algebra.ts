export type Cw<A> = {
  readonly _tag: 'Cw';
  readonly tile: Tile<A>;
};

export type FlipH<A> = {
  readonly _tag: 'FlipH';
  readonly tile: Tile<A>;
};

export type Above<A> = {
  readonly _tag: 'Above';
  readonly tiles: Tile<A>[];
};

export type Pure<A> = {
  readonly _tag: 'Pure';
  readonly value: A;
};

export type Ap<A, B> = {
  readonly _tag: 'Ap';
  readonly functionTile: Tile<(_: B) => A>;
  readonly domainTile: Tile<B>
};

export type FromImage = {
  readonly _tag: 'FromImage',
  readonly img: HTMLImageElement
};

export type Tile<A, B = any> = 
  | Cw<A> 
  | FlipH<A> 
  | Above<A> 
  | Pure<A> 
  | Ap<A, B>
  | FromImage;

type Algebra = {
  cw: <A>(tile: Tile<A>) => Tile<A>,
  flipH: <A>(tile: Tile<A>) => Tile<A>,
  above: <A>(...tiles: Tile<A>[]) => Tile<A>,
  pure: <A>(value: A) => Tile<A>,
  ap: <B, A>(functionTile: Tile<(_: B) => A>, domainTile: Tile<B>) => Tile<A, B>,
  fromImage: (img: HTMLImageElement) => Tile<string>
};

const Alg: Algebra = {
  cw: (tile) => ({
    _tag: 'Cw',
    tile
  }),
  flipH: (tile) => ({
    _tag: 'FlipH',
    tile
  }),
  above: (...tiles) => ({
    _tag: 'Above',
    tiles
  }),
  pure: (value) => ({
    _tag: 'Pure',
    value
  }),
  ap: (functionTile, domainTile) => ({
    _tag: 'Ap',
    functionTile,
    domainTile
  }),
  fromImage: (img) => {
    return {
      _tag: 'FromImage',
      img
    };
  }
};

export {
  Alg
};