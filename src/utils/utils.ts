import { IndexedObject } from "./types";

export const isEmptyObject = (obj: IndexedObject) => {
    for(let prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

export const publicUrl = (url: string) => {
    return `${process.env.PUBLIC_URL}${url}`;
};

export const shuffleArray = (arr: any[]) => 
    [...arr].sort(() => Math.random() - 0.5);
    //Đảo vị trí các phần tử trong 1 mảng bất kỳ
