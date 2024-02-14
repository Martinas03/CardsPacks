

type ActionsType =
    | ReturnType<typeof setPacksName>
    | ReturnType<typeof setPageNumber>
    | ReturnType<typeof setPageCountNumber>
    | ReturnType<typeof setMinMaxPacks>
    | ReturnType<typeof setShowAllPacks>
    | ReturnType<typeof setSortPacks>
    | setObjectType

type setObjectType = {
    type: 'SET_OBJECT'
    filter: any
}


export type SearchParamsStateType = {
    min: number
    max: number
    page: number
    pageCount: number
    user_id: string
    packName: string
    sortPacks: string
}

const initialSearchState: SearchParamsStateType = {
    min: 0,
    max: 25,
    page: 1,
    pageCount: 8,
    user_id: "",
    packName: "",
    sortPacks: ''
};

export const packSearchReducer = (state: SearchParamsStateType = initialSearchState, action: ActionsType): SearchParamsStateType => {
    switch (action.type) {
        case 'GET_PACKS_BY_SEARCH':
            return {...state, packName: action.packName};
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount};
        case 'SET_MIN_MAX_PACKS':
            return {...state, min: action.min, max: action.max};
        case 'SET_ALL_PACKS':
            return {...state, user_id: action.userId};
        case 'SET_SORT_PACKS':
            return {...state, sortPacks: action.sortBy};
        case 'SET_OBJECT': {
            return {...state,
                min: !Number(action.filter.min) ? state.min : Number(action.filter.min),
                max: !Number(action.filter.max) ? state.max : Number(action.filter.max),
                page: !Number(action.filter.page) ? state.page : Number(action.filter.page),
                pageCount: !Number(action.filter.pageCount) ? state.pageCount : Number(action.filter.pageCount),
                user_id: action.filter.user_id,
                packName: action.filter.packName,
                sortPacks: action.filter.sortPacks,
            }
        }

        default:
            return state
    }
};

export const setPacksName = (packName: string) => ({
    type: 'GET_PACKS_BY_SEARCH' as const, packName
});
export const setPageNumber = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page
});
export const setPageCountNumber = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount
});
export const setMinMaxPacks = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_PACKS' as const, min, max
});
export const setShowAllPacks = (userId: string) => ({
    type: 'SET_ALL_PACKS' as const, userId
});
export const setSortPacks = (sortBy: string) => ({
    type: 'SET_SORT_PACKS' as const, sortBy
});

export const setObject = (filter: any) => ({
    type: 'SET_OBJECT', filter
});



