import {ImageDimension} from './types';

export class ImageLoader {
  public static promiseLoadImage(imagePath: string) {
    return new Promise<ImageDimension>((resolve, reject) => {
      if (!imagePath){
        reject();
      }

      const imageO = new Image();
      imageO.src = imagePath;

      /** if image cached */
      if ( imageO.complete ) {
        resolve(ImageLoader.createImageDimension(imageO));
      }

      imageO.onload = () => resolve(ImageLoader.createImageDimension(imageO));
      imageO.onerror= () => reject();
    });
  }

  private static createImageDimension(imageO: HTMLImageElement): ImageDimension {
    return {
      naturalWidth: imageO.naturalWidth,
      naturalHeight: imageO.naturalHeight
    };
  }
}
