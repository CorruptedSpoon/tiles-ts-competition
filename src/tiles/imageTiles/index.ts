import { Tile as TileAlg } from '../algebra';
import { Tile } from '../';

const imgTile = (imgSrc: string): Promise<TileAlg<string>> => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = function() {
        resolve(Tile.fromImage(img));
    };
    img.src = imgSrc;
  });
}

import uhSrc from './uh.png';
export const uh = await imgTile(uhSrc);

import fireSrc from './fireGirl.jpg';
export const fireGirl = await imgTile(fireSrc);