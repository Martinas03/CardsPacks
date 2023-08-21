import {Dispatch} from "redux";
import {packsApi} from "../api/api";
import {CardsPacksType} from "../types/types";
import {AppRootStateType} from "./store";


export type InitStateType = {
    cardsPacks: CardsPacksType[],
    cardPacksTotalCount: number,
    pageCount: number
    loading: boolean
    index: number
}
let initialState: InitStateType = {
    cardsPacks: [],
    cardPacksTotalCount: 0,
    pageCount: 0,
    loading: true,
    index: 3
}

type ActionType =
    SetCardPacksActionType
    | DeleteCardPacksActionType
    | AddNewCardPackActionType
    | ChangeCardPackTitleActionType
    | SetTotalCardPacksCountType
    | SetLoadingType
    | SetIndexType

export type SetCardPacksActionType = {
    type: 'packs/SET_CARD_PACKS';
    data: CardsPacksType[];
}

export  type AddNewCardPackActionType = {
    type: 'packs/ADD_NEW_CARD_PACK';
    newPack: any
}

export type DeleteCardPacksActionType = {
    type: 'packs/DELETE_CARD_PACKS';
    packId: string;
}

export type ChangeCardPackTitleActionType = {
    type: 'packs/CHANGE_CARD_PACK_TITLE'
    packId: string
    newTitle: string
}

export type SetTotalCardPacksCountType = {
    type: 'packs/SET_TOTAL_CARD_PACKS_COUNT'
    totalCount: number
}

export type SetLoadingType = {
    type: 'packs/SET_LOADING'
    loading: boolean
}

export type SetIndexType = {
    type: 'packs/SET_INDEX'
    index: number
}


const SET_CARD_PACKS = 'packs/SET_CARD_PACKS'
const DELETE_CARD_PACKS = 'packs/DELETE_CARD_PACKS'
const ADD_NEW_CARD_PACK = 'packs/ADD_NEW_CARD_PACK'
const CHANGE_CARD_PACK_TITLE = 'packs/CHANGE_CARD_PACK_TITLE'
const SET_TOTAL_CARD_PACKS_COUNT = 'packs/SET_TOTAL_CARD_PACKS_COUNT'
const SET_LOADING = 'packs/SET_LOADING'
const SET_INDEX = 'packs/SET_INDEX'

export const packsReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case SET_CARD_PACKS: {
            return {
                ...state,
                cardsPacks: action.data
            }
        }
        case DELETE_CARD_PACKS: {
            return {
                ...state, cardsPacks: state.cardsPacks.filter(pack => pack._id != action.packId)
            }
        }
        case ADD_NEW_CARD_PACK: {
            return {
                ...state,
                cardsPacks: [action.newPack, ...state.cardsPacks]
            }
        }
        case CHANGE_CARD_PACK_TITLE: {
            return {
                ...state,
                cardsPacks: state.cardsPacks.map(pack => pack._id === action.packId ? {
                    ...pack,
                    name: action.newTitle
                } : pack)
            }
        }
        case SET_TOTAL_CARD_PACKS_COUNT: {
            return {
                ...state,
                cardPacksTotalCount: action.totalCount
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case SET_INDEX: {
            return {
                ...state,
                index: action.index
            }
        }

        default:
            return state
    }
}

export const setCardPacks = (data: CardsPacksType[]): SetCardPacksActionType => ({
    type: SET_CARD_PACKS, data
})

export const deleteCardPack = (packId: string): DeleteCardPacksActionType => ({
    type: DELETE_CARD_PACKS, packId
})

export const addNewCardPack = (newPack: CardsPacksType): AddNewCardPackActionType => ({
    type: ADD_NEW_CARD_PACK, newPack
})

export const changeCardPackTitle = (packId: string, newTitle: string): ChangeCardPackTitleActionType => ({
    type: CHANGE_CARD_PACK_TITLE, packId, newTitle
})
export const setTotalCardPackCount = (totalCount: number) => ({
    type: SET_TOTAL_CARD_PACKS_COUNT, totalCount
})

export const setLoading = (loading: boolean) => ({
    type: SET_LOADING, loading
})

export const setIndex = (index: number) => ({
    type: SET_INDEX, index
})


export const getCardPacksTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            getState().packsReducer.loading = true
            packsApi.getPacks(getState().packSearchReducer)
                .then((data) => {
                    dispatch(setCardPacks(data.cardPacks))
                    dispatch(setTotalCardPackCount(data.cardPacksTotalCount))
                    // if(data) {
                    getState().packsReducer.loading = false
                    // }
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const deleteCardPacksTC = (id: string) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.deletePack(id)
                .then(() => {
                    dispatch(deleteCardPack(id))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const addNewCardPackTC = (newPackName: string) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.addPack(newPackName)
                .then((data) => {
                    dispatch(addNewCardPack(data.newCardsPack))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const changeCardPackTitleTC = (packId: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.editPack(packId, newTitle)
                .then((data) => {
                    dispatch(changeCardPackTitle(data.updatedCardsPack._id, data.updatedCardsPack.name))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

