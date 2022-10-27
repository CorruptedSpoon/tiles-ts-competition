import './style.css'
import { Tile } from './tiles';
import { fireGirl, uh } from './tiles/imageTiles';
import { rasterize } from './tiles/rasterize';
import { renderRaster } from './tiles/renderRaster';

const width = 600,
      height = 600;

const canvas = document.querySelector<HTMLCanvasElement>('#canvas') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

const tile = Tile.above(
  Tile.swirl(Tile.above(
    Tile.pure('blue'),
    Tile.pure('red')
  )),
  Tile.beside(
    uh, 
    fireGirl
  )
);

const raster = rasterize({width, height})(tile);

renderRaster(raster)(ctx);

console.log('done');