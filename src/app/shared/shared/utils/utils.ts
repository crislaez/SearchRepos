import { IonContent } from "@ionic/angular";

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const emptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getResponseInfo = (link:string, toSplit:string ='next', actualPage: string): number => {
  const linkSplited = link?.split(',');
  const itemResult = (linkSplited ||[]).find(item => item.includes(toSplit))
  if(!itemResult) {
    if(toSplit === 'next') return (Number(actualPage) +1)
    else return Number(actualPage)
  }
  const splitedItemResult = itemResult.split('=')
  const result = splitedItemResult[1]?.split('&')[0]
  return Number(result)
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
