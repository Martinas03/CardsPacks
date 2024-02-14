

type ActionsType =
    | ReturnType<typeof setCardsPageNumber>
    | ReturnType<typeof setCardsPageCountNumber>
    | ReturnType<typeof setMinMaxCards>
    | ReturnType<typeof setSortCards>
    | SetCardObjectType

type SetCardObjectType = {
    type: 'SET_CARD_OBJECT'
    filter: any
}


export type SearchCardsParamsStateType = {
    cardAnswer: string,
    cardQuestion: string,
    min: number
    max: number
    page: number
    pageCount: number
    sortCards: string
}

const initialSearchState: SearchCardsParamsStateType = {
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 25,
    page: 1,
    pageCount: 8,
    sortCards: ''
};

export const cardsSearchReducer = (state: SearchCardsParamsStateType = initialSearchState, action: ActionsType): SearchCardsParamsStateType => {
    switch (action.type) {

        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount};
        case 'SET_MIN_MAX_CARDS':
            return {...state, min: action.min, max: action.max};
        case 'SET_SORT_CARDS':
            return {...state, sortCards: action.sortBy};
        case 'SET_CARD_OBJECT': {
                return {...state,
                    min: !Number(action.filter.min) ? state.min : Number(action.filter.min),
                    max: !Number(action.filter.max) ? state.max : Number(action.filter.max),
                    page: !Number(action.filter.page) ? state.page : Number(action.filter.page),
                    pageCount: !Number(action.filter.pageCount) ? state.pageCount : Number(action.filter.pageCount),
                    sortCards: action.filter.sortCards,
                }
            }

        default:
            return state
    }
};

export const setCardsPageNumber = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page
});
export const setCardsPageCountNumber = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount
});
export const setMinMaxCards = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_CARDS' as const, min, max
});
export const setSortCards = (sortBy: string) => ({
    type: 'SET_SORT_CARDS' as const, sortBy
});

export const setCardObject = (filter: any) => ({
    type: 'SET_CARD_OBJECT', filter
})



