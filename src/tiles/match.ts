import {Above, Ap, Cw, FlipH, FromImage, Pure, Tile} from './algebra';

/*

const n = match<number>({
  Cw       : ({tile}) => tile._tag && 1,
  FlipH    : ({tile}) =>  tile._tag && 2,
  Above    : ({tiles}) =>  tiles[0]._tag && 3,
  Pure     : ({value}) =>  value && 4,
  Ap       : ({functionTile, domainTile}) => functionTile && domainTile && 5,
  FromImage: ({img}) => img && 6
});

*/

export const match = <RetT, TileA = any, TileB = any>(
  fObj: {
    'Cw': (tile: Cw<TileA>) => RetT,
    'FlipH': (tile: FlipH<TileA>) => RetT,
    'Above': (tile: Above<TileA>) => RetT,
    'Pure': (tile: Pure<TileA>) => RetT,
    'Ap': (tile: Ap<TileA, TileB>) => RetT,
    'FromImage': (tile: FromImage) => RetT
  }
) => (
  tile: Tile<TileA, TileB>
) => (
  fObj[tile._tag as Tile<TileA, TileB>['_tag']](tile as any)
);

