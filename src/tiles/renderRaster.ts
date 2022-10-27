import { Raster } from "./rasterize";

export const renderRaster = (raster: Raster<string>) => (ctx: CanvasRenderingContext2D) => {  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
  ctx.fillRect(0, 0, raster.length, raster[0].length);
  
  for (let i = 0; i < raster.length; i++) {
    for (let j = 0; j < raster[i].length; j++) {
      ctx.fillStyle = raster[i][j];
      ctx.fillRect(j, i, 1, 1);
    }
  }
  
  return ctx;
}