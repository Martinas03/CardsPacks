import React, {useState} from 'react';
import {SearchParamsStateType, setPageCountNumber, setPageNumber} from "../../state/pack-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {InitStateType, packsReducer} from "../../state/packs-reducer";
import {CardsPacksType} from "../../types/types";
import {buttonClasses} from "@mui/material";
import s from "./Pagination.module.css"
import {Selector} from '../Selector/Selector';

export const Pagination = () => {
    const dispatch = useDispatch()
    const page = useSelector<AppRootStateType, any>(state => state.PackSearchReducer.page)
    const pageCount = useSelector<AppRootStateType, any>(state => state.PackSearchReducer.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, any>(state => state.packsReducer.cardPacksTotalCount)
    const totalPage = Math.ceil(cardPacksTotalCount / pageCount)
    const firstPage = () => {
        dispatch(setPageNumber(1))
    }
    const lastPage = () => {
        dispatch(setPageNumber(totalPage))
    }

    const PrevPage = () => {
        dispatch(setPageNumber(page - 1))
    }

    const NextPage = () => {
        dispatch(setPageNumber(page + 1))
    }

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1)

    const [limit, setLimit] = useState(8)

    const options = [
        {value: 2, body: '2'},
        {value: 4, body: '4'},
        {value: 6, body: '6'},
        {value: 8, body: '8'}
    ]

    const changePage = (value: number) => {
        setLimit(value)
        dispatch(setPageCountNumber(value))
    }

    return (
        <nav>
            <div>
                <button onClick={PrevPage} disabled={page === 1}>&lt</button>
                {pagesArray.map(pg =>
                    <button key={pg} className={page == pg ? s.navButton_focus : s.navButton}
                            onClick={() => dispatch(setPageNumber(pg))}>{pg}</button>)}

                <button className={s.navButton} onClick={NextPage} disabled={page === totalPage}>&gt</button>
            </div>

            <div className={s.selector}>
                <h6>Show</h6>
                <Selector value={limit} options={options} onChange={(value: number) => changePage(value)}/>
            </div>
        </nav>


    );
};
