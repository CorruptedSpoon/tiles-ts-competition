import { pipe } from 'ramda';
import {Alg, Tile} from './algebra';
import {Monoid} from './monoid';

type TileToTile = <A>(tile: Tile<A>) => Tile<A>;
type SpreadTilesToTile = <A>(...tiles: Tile<A>[]) => Tile<A>;

type TileAPI = {
  clockwise: TileToTile,
  counterclockwise: TileToTile,
  flipHorizontal: TileToTile,
  flipVertical: TileToTile,
  beside: SpreadTilesToTile,
  above: SpreadTilesToTile,
  quad: <A>(upLeftTile: Tile<A>, upRightTile: Tile<A>, 
            downLeftTile: Tile<A>, downRightTile: Tile<A>) => Tile<A>,
  swirl: TileToTile,
  behind: <A>(monoid: Monoid<A>) => (backTile: Tile<A>, frontTile: Tile<A>) => Tile<A>,
  // combine?
  map: <A, B>(f: (_: A) => B) => (tile: Tile<A>) => Tile<B>,
  pure: <A>(value: A) => Tile<A>,
  ap: <B, A>(functionTile: Tile<(_: B) => A>) => (domainTile: Tile<B>) => Tile<A, B>,
  
  fromImage: (img: HTMLImageElement) => Tile<string>
}

const API: TileAPI = {
  clockwise: (tile) => Alg.cw(tile),
  counterclockwise: (tile) => pipe(
    API.clockwise, API.clockwise, API.clockwise
  )(tile),
  flipHorizontal: (tile) => Alg.flipH(tile),
  flipVertical: (tile) => pipe(
    API.clockwise, API.flipHorizontal, API.counterclockwise
  )(tile),
  beside: (...tiles) => (
    API.counterclockwise(API.above(...tiles.map(API.clockwise))) 
  ),
  above: (...tiles) => Alg.above(...tiles),
  quad: (upLeftTile, upRightTile, downLeftTile, downRightTile) => (
    API.above(
      API.beside(upLeftTile, upRightTile),
      API.beside(downLeftTile, downRightTile)
    )
  ),
  swirl: (tile) => (
    API.quad(
      tile, 
      API.clockwise(tile),
      API.counterclockwise(tile), 
      API.clockwise(API.clockwise(tile))
    )
  ),
  behind: <A>(monoid: Monoid<A>) => (backTile: Tile<A>, frontTile: Tile<A>) => (
    API.ap(API.map((a: A) => (b: A) => monoid.append(a, b) as A)
                  (frontTile))
          (backTile)
  ),
  map: (f) => (tile) => (
    API.ap(API.pure(f))(tile)
  ),
  pure: (value) => Alg.pure(value),
  ap: (functionTile) => (domainTile) => (
    Alg.ap(functionTile, domainTile)
  ),
  fromImage: (img) => (
    Alg.fromImage(img)
  )
};

export {
  API as Tile
}