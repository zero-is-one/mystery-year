export interface Photo {
  year: number;
  imageId: string;
  title: string;
}

export enum PhotoSetting {
  ImageHost = "https://firebasestorage.googleapis.com/v0/b/mystery-year.appspot.com/o/images%2F",
}
