import React, {useEffect, useState} from 'react';
import {
    setPageCountNumber,
    setPageNumber
} from "../../state/pack-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import s from "./Pagination.module.css"
import {Selector} from "../selector/Selector";
import {options} from "../../helpers/helpers";
import {setCardsPageCountNumber, setCardsPageNumber} from "../../state/card-search-reducer";

type PaginationPropsType = {
    page: number
    pageCount: number
    totalCount: number
    isCard: boolean
}


export const Pagination = (props: PaginationPropsType) => {
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading);
    const dispatch = useDispatch<any>();

    useEffect(()=> {
        console.log('isCard: ' + props.isCard)
    }, []);


    const [index, setIndex] = useState(1);

    const totalPage = Math.ceil(props.totalCount / props.pageCount
        || 8
    );
    let diapason = 5;

    const countOfListsPages = Math.ceil(totalPage / diapason);

    const firstPage = () => {
        props.isCard ? dispatch(setCardsPageNumber(1)) : dispatch(setPageNumber(1));
        setIndex(1)
    };

    const lastPage = () => {
        props.isCard ? dispatch(setCardsPageNumber(totalPage)) : dispatch(setPageNumber(totalPage));
        setIndex(1 + diapason * (countOfListsPages - 1))
    };

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1) ;

    const changeCardsPerPage = (value: number) => {
        props.isCard ? dispatch(setCardsPageCountNumber(value)) : dispatch(setPageCountNumber(value))
    };

    const onChangePageNumber = (page: number) => {
        props.isCard ? dispatch(setCardsPageNumber(page)) : dispatch(setPageNumber(page));
    };

    return (
        <div className={s.navWrapper}>
            <div>
                <button className={s.button} onClick={() => {
                    setIndex(index - diapason)
                }} disabled={index === 1}>{'<<'}</button>
                {index > 1 && <>
                    <button disabled={loading} className={props.page === 1 ? s.navButton_focus : s.navButton} onClick={firstPage}>1</button>
                    <span>...</span>
                </>}
                {pagesArray.map((pg, i) => {
                    let iPlusOne = i + 1;
                    if (iPlusOne >= index && iPlusOne < (index + diapason)) {
                        return <button key={i} disabled={loading}
                                       className={props.page === pg ?s.navButton_focus : s.navButton  }
                                       onClick={() => onChangePageNumber(pg)
                                       }>{pg}</button>
                    } else {
                        return <></>
                    }
                })}
                {index + diapason < totalPage && <>
                    <span>...</span>
                    <button disabled={loading} className={props.page === totalPage ? s.navButton_focus : s.navButton} onClick={lastPage}>{totalPage}</button>
                </>}
                <button className={s.button} onClick={() => {
                    setIndex(index + diapason)
                }} disabled={index + diapason >= totalPage}>{'>>'}</button>
            </div>
            <div className={s.selector}>
                <h6>Show</h6>
                <Selector value={props.pageCount} options={options} onChange={changeCardsPerPage}/>
                <h6>Cards per Page</h6>
            </div>
        </div>
    );
};

