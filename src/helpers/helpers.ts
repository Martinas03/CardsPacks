import {SearchParamsStateType} from "../state/pack-search-reducer";
import {CSSProperties} from "react";
import {log} from "util";

export function changeDateFormat(date: string) {
    let n = 0;
    let arr = date.split('');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'T') {
            n = arr.indexOf('T')
        }
    }
    let dateTilDay = date.split('')
        .filter((l, i) => i < n)
        .map(e => e === '-' ? '.' : e).join('')
        .split('.');
    let reverseDate = [dateTilDay[0], dateTilDay[1], dateTilDay[2]] = [dateTilDay[2], dateTilDay[1], dateTilDay[0]];
    return reverseDate.join('.')
}

export type ObjectType = {[key: string]: string | number}

export function objectToString(obj: ObjectType) {
    let str = Object.entries(obj).map(ar => ar.join('=')).join('&');
        // console.log(str);
    return str
}

export const options = [
    {value: 2, body: '2'},
    {value: 4, body: '4'},
    {value: 6, body: '6'},
    {value: 8, body: '8'}
];

export const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export const starsObjects = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
]

