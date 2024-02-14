import {Dispatch} from "redux";
import {cardsApi, packsApi} from "../api/api";
import {CardsPacksType, CardsType} from "../types/types";
import {AppRootStateType} from "./store";
import {ObjectType} from "../helpers/helpers";
import {SearchParamsStateType} from "./pack-search-reducer";
import {setLoading} from "./packs-reducer";
import {getPackId, getPackUserId, getUserId} from "../utils/getPackId";


export type InitStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
    packUserId: string
    packId: string
    userId: string
    packTitle: string
}
let initialState: InitStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: getPackUserId(),
    packId: getPackId(),
    userId: getUserId(),
    packTitle: ''
    //     {
    //     min: 0,
    //     max: 25,
    //     page: 1,
    //     pageCount: 8,
    //     user_id: "",
    //     packName: "",
    //     sortPacks: ''
    // }
};

type ActionType =
    SetCardActionType
    | DeleteCardActionType
    | AddNewCardActionType
    | ChangeCardInfoActionType
    | SetTotalCardCountType
    | SetPackIdType
    | SetUserIdType
    | SetTitleType

export type SetCardActionType = {
    type: 'cards/SET_CARDS';
    data: CardsType[];
}

export  type AddNewCardActionType = {
    type: 'packs/ADD_NEW_CARD';
    newCard: any
}

export type DeleteCardActionType = {
    type: 'packs/DELETE_CARD';
    cardId: string;
}

export type ChangeCardInfoActionType = {
    type: 'packs/CHANGE_CARD_INFO'
    cardId: string,
    question: string,
    answer: string
}

export type SetTotalCardCountType = {
    type: 'packs/SET_TOTAL_CARD_COUNT'
    totalCount: number
}

export type SetPackIdType = {
    type: 'packs/SET_PACK_ID'
    packId: string
    packUserId: string,
}
export type SetUserIdType = {
    type: 'packs/SET_USER_ID'
    userId: string
}

export type SetTitleType = {
    type: 'packs/SET_TITLE'
    title: string
}


const SET_CARDS = 'cards/SET_CARDS';
const DELETE_CARD = 'packs/DELETE_CARD';
const ADD_NEW_CARD = 'packs/ADD_NEW_CARD';
const CHANGE_CARD_INFO = 'packs/CHANGE_CARD_INFO';
const SET_TOTAL_CARD_COUNT = 'packs/SET_TOTAL_CARD_COUNT';
const SET_PACK_ID = 'packs/SET_PACK_ID';
const SET_USER_ID = 'packs/SET_USER_ID';
const SET_TITLE = 'packs/SET_TITLE';

export const cardsReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return {
                ...state,
                cards: action.data
            }
        }
        case DELETE_CARD: {
            return {
                ...state, cards: state.cards.filter(pack => pack._id !== action.cardId)
            }
        }
        case ADD_NEW_CARD: {
            return {
                ...state,
                cards: [...state.cards, action.newCard]
            }
        }
        case CHANGE_CARD_INFO: {
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.cardId ? {
                    ...card,
                    question: action.question,
                    answer: action.answer
                } : card)
            }
        }
        case SET_TOTAL_CARD_COUNT: {
            return {
                ...state,
                cardsTotalCount: action.totalCount
            }
        }
        case SET_PACK_ID: {
            return {
                ...state,
                packId: action.packId,
                packUserId: action.packUserId
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId
            }
        }
        //
        case SET_TITLE: {

            return {
                ...state,
                packTitle: action.title
            }
        }

        default:
            return state
    }
};

export const setCards = (data: CardsType[]): SetCardActionType => ({
    type: SET_CARDS, data
});

export const deleteCard = (cardId: string): DeleteCardActionType => ({
    type: DELETE_CARD, cardId
});

export const addNewCard = (newCard: CardsType): AddNewCardActionType => ({
    type: ADD_NEW_CARD, newCard
});
//
export const changeCardInfo = (cardId: string, question: string, answer: string): ChangeCardInfoActionType => ({
    type: CHANGE_CARD_INFO, cardId, question, answer
});
export const setTotalCardCount = (totalCount: number) => ({
    type: SET_TOTAL_CARD_COUNT, totalCount
});

export const setPackId = (packId: string, packUserId: string) => ({
    type: SET_PACK_ID, packId, packUserId
});
export const setUserId = (userId: string) => ({
    type: SET_USER_ID, userId
});
//
export const setTitle = (title: string) => ({
    type: SET_TITLE, title
});



export const getCardsTC = (id: string, packUserId: string, userId: string) => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setLoading(true));
            dispatch(setPackId(id, packUserId));
            const response = await cardsApi.getCards(id, getState().searchCards);
            localStorage.setItem('userId', userId);
            const idOfUser = localStorage.getItem('userId')
            dispatch(setUserId(idOfUser || ''))
            dispatch(setCards(response.cards));
            dispatch(setTotalCardCount(response.cardsTotalCount))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const deleteCardTC = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            await cardsApi.deleteCard(id);
            dispatch(deleteCard(id))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const addNewCardTC = (packId: string, question: string, answer: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await cardsApi.addCard(packId, question, answer);
            dispatch(addNewCard(response.newCard))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const changeCardInfoTC = (packId: string, question: string, answer: string) => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setLoading(true));
            const response = await cardsApi.editCard(packId, question, answer);
            dispatch(changeCardInfo(response.updatedCard._id, response.updatedCard.question, response.updatedCard.answer))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
};

