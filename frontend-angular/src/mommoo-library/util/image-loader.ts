import {ImageDimension} from './types';

export class ImageLoader {
  private constructor() {}

  public static isLoadedImage(imagePath: string) {
    const imageO = new Image();
    imageO.src = imagePath;
    return imagePath && imageO.naturalWidth > 0;
  }

  public static promiseLoadImage(imagePath: string) {
    return new Promise<ImageDimension>((resolve, reject) => {
      if (!imagePath) {
        reject('invalid image path');
        return;
      }

      const imageO = new Image();
      imageO.src = imagePath;

      imageO.onload = () => resolve(ImageLoader.createImageDimension(imageO));
      imageO.onerror = () => reject('error image load');
    });
  }

  public static async promiseLoadImages(...imagePaths: string[]) {
    return await Promise.all(imagePaths
      .map(imagePath => this.promiseLoadImage(imagePath)));
  }

  private static createImageDimension(imageO: HTMLImageElement): ImageDimension {
    const imageDimension: ImageDimension = {
      naturalWidth: 0,
      naturalHeight: 0
    };

    if ( imageO.naturalWidth === 0 && imageO.naturalHeight === 0 ) {
      document.body.appendChild(imageO);
      imageDimension.naturalWidth = imageO.offsetWidth;
      imageDimension.naturalHeight = imageO.offsetHeight;
      document.body.removeChild(imageO);
    } else {
      imageDimension.naturalWidth = imageO.naturalWidth;
      imageDimension.naturalHeight = imageO.naturalHeight;
    }

    return imageDimension;
  }
}
