import React, {ChangeEvent, CSSProperties, useCallback, useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType} from "../../../types/types";
import {changeDateFormat, override} from "../../../helpers/helpers";
import CommonModal from "../../../portals/CommonModal";
import {useDispatch, useSelector} from "react-redux";
import {addNewCardPackTC, changeCardPackTitleTC, deleteCardPacksTC, setLoading} from "../../../state/packs-reducer";
import {setPacksName, setSortPacks} from "../../../state/pack-search-reducer";
import {AppRootStateType} from "../../../state/store";
import {ClockLoader} from "react-spinners";
import debounce from 'lodash.debounce'
import {Pagination} from '../../pagination/Pagination'
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import {getCardsTC, setPackId, setTitle} from "../../../state/cards-reducer";
import {useNavigate} from "react-router-dom";
import del from './../../../assets/icons/delete.png';
import editEl from './../../../assets/icons/edit.png';
import learn from './../../../assets/icons/learn.png';
import {log} from "util";

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}


const PacksList = (props: PacksListType) => {
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading);
    const searchName = useSelector<AppRootStateType, string>((state => state.packSearchReducer.packName));
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const [inputValue, setInputValue] = useState(searchName);
    const [deleteId, setDeleteId] = useState('');
    const [editOpen, setEditOpen] = useState('');
    const [addPack, setAddPack] = useState(false);
    const [packName, setPackName] = useState('');
    const [newPackName, setNewPackName] = useState('');
    const [updated, setUpdated] = useState(true);

    const page = useSelector<AppRootStateType, number>((state) => state.packSearchReducer.page);
    const pageCount = useSelector<AppRootStateType, number>((state) => state.packSearchReducer.pageCount);
    const cardPacksTotalCount = useSelector<AppRootStateType, number>((state) => state.packsReducer.cardPacksTotalCount);

    // const pageCount = useSelector<AppRootStateType, any>((state) => state.packSearchReducer.pageCount);
    //
    // console.log('pageCount: ' + pageCount)

    const navigate = useNavigate();

    const SearchDebounce = useCallback(debounce((value: string) => {
        dispatch(setPacksName(value))
    }, 1000), []);

    const dispatch = useDispatch<any>();
    const onCloseDeleteModal = () => {
        setDeleteId('')
    };
    const openDeleteModal = (id: string) => {
        setDeleteId(id);
        console.log('Modal window open ' + id)
    };
    const onCloseEditModal = () => {
        setEditOpen('')
    };
    const openEditModal = (id: string, name: string) => {
        setEditOpen(id);
        setNewPackName(name);
        console.log('Modal window open')
    };
    const onCloseAddModal = () => {
        setAddPack(false)
    };
    const openAddModal = () => {
        setAddPack(true);
        console.log('Added pack')
    };

    const add = () => {
        dispatch(addNewCardPackTC(packName));
        setAddPack(false)
    };

    const deletePack = () => {
        dispatch(deleteCardPacksTC(deleteId));
        setDeleteId('')
    };

    const edit = () => {
        dispatch(changeCardPackTitleTC(editOpen, newPackName));
        setEditOpen('')
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    };

    const onChangeEditName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    };

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault()
        SearchDebounce(e.currentTarget.value);
        setInputValue(e.currentTarget.value);
    };
    // console.log(inputValue)
    const onClickSort = () => {
        setUpdated(!updated);
        if (updated) {
            dispatch(setSortPacks('updated'))
        } else {
            dispatch(setSortPacks(''))
        }
    };

    const onClickCards = (id: string, name: string, packUserId: string) => {
        navigate('/cards/'+userId);
        dispatch(getCardsTC(id, packUserId, userId));
        dispatch(setTitle(name));

    };

    return (
        <div className={s.container}>
            <div>
                <h1>Packs list</h1>
                <div className={s.searchAndAdd}>
                    <div className={s.searchWrapper}>
                        <input className={s.inputSearch} placeholder={'Search'} type="search" onChange={onChangeSearch}
                               value={inputValue}/>
                    </div>
                    <div>
                        <button className={s.button} onClick={openAddModal}>Add new pack</button>
                    </div>
                </div>
                {
                    loading ? <div className={s.loading}>
                            <ClockLoader
                                color={'blue'}
                                loading={loading}
                                cssOverride={override}
                                size={300}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div> :
                        <div className={s.content}>
                            <div className={s.tableWrapper}>
                                <table className={s.table}>
                                    <thead className={s.head}>
                                    <tr className={s.tr}>
                                        <th className={s.th}>Name</th>
                                        <th className={s.th}>Cards</th>
                                        <th className={s.th}>Last updated
                                            <button className={s.sortButton} onClick={onClickSort}>
                                                {updated ? <BiSolidDownArrow className={s.arrow}/> :
                                                    <BiSolidUpArrow className={s.arrow}/>}

                                            </button>
                                        </th>
                                        <th className={s.th}>created by</th>
                                        <th className={s.th}>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody className={s.tbody}>
                                    {props.packs.map((el, i) => {
                                        return <tr className={s.tr} key={i}>
                                            <td onClick={() => onClickCards(el._id, el.name, el.user_id)}
                                                className={s.td}>{el.name}</td>
                                            <td className={s.td}>{el.cardsCount}</td>
                                            <td className={s.td}>{changeDateFormat(el.updated)}</td>
                                            <td className={s.td}>{el.user_name}</td>
                                            <td className={s.td}>
                                                {
                                                    el.user_id === props.userId &&
                                                    <>
                                                            <img  onClick={() => openDeleteModal(el._id)} className={s.buttonIcon} src={del} alt="delete"/>
                                                            <img  onClick={() => openEditModal(el._id, el.name)} className={s.buttonIcon} src={editEl} alt="edit"/>
                                                    </>
                                                }
                                                    <img className={s.buttonIcon} src={learn} alt="learn"/>
                                            </td>
                                        </tr>
                                    })}
                                    <CommonModal onOpen={addPack}
                                                 onClose={onCloseAddModal}
                                                 buttonTitle={'Add'}
                                                 onAction={add}
                                                 title={'Add new pack'}
                                                 isDeleteModal={deleteId}
                                                 inputValue={packName}
                                                 onChange={onChangeName}
                                    />
                                    <CommonModal onOpen={editOpen}
                                                 onClose={onCloseEditModal}
                                                 buttonTitle={'Edit'}
                                                 onAction={edit}
                                                 title={'Change pack name'}
                                                 isDeleteModal={deleteId}
                                                 inputValue={newPackName}
                                                 onChange={onChangeEditName}
                                    />
                                    <CommonModal onOpen={deleteId}
                                                 onClose={onCloseDeleteModal}
                                                 buttonTitle={'Delete'}
                                                 onAction={deletePack}
                                                 title={'Delete Pack'}
                                                 isDeleteModal={deleteId}
                                    />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }</div>
            <Pagination page={page} pageCount={pageCount} totalCount={cardPacksTotalCount} isCard={false}/>
        </div>
    );
};

export default PacksList;
