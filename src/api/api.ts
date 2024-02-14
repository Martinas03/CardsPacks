import axios from "axios";
import {ResponseCardsPackType, ResponseCardsType} from "../types/types";
import {objectToString, ObjectType} from "../helpers/helpers";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://cards-nya-back-production.up.railway.app/2.0/',
    headers: {
        'Content-Type': 'application/json'
    }
});


export const authApi = {
    getLogin: (email: string, password: string, rememberMe: boolean) => {
        return instance.post('auth/login', {email, password, rememberMe})
            .then((response) => {
                return response.data
            })
    },
    getRegister: (email: string, password: string) => {
        return instance.post('auth/register', {email, password})
            .then((response) => {
                return response.data
            })
    },

    authMe: (token: string) => {
        return instance.post('auth/me', {token})
            .then((response) => {
                return response.data
            })
    },

    logout: (token: string) => {
        return instance.delete('auth/me?' + token)
            .then((response) => {
                return response.data
            })
    }
};

export const packsApi = {
    getPacks: (objectOfParams: ObjectType) => {
        return instance.get<ResponseCardsPackType>(`cards/pack?${objectToString(objectOfParams)}`)
            .then((response) => {
                return response.data
            })
    },

    deletePack: (packId: string) => {
        return instance.delete('cards/pack?id=' + packId)
            .then((response) => {
                return response.data
            })
    },
    addPack: (newPackName: string) => {
        return instance.post('cards/pack', {cardsPack: {name: newPackName}})
            .then((response) => {
                return response.data
            })
    },
    editPack: (packId: string, newPackName: string) => {
        return instance.put('cards/pack', {
            cardsPack: {
                _id: packId,
                name: newPackName
            }
        })
            .then((response) => {
                return response.data
            })
    }
};

export const cardsApi = {
    getCards: (id: string, objectOfParams: ObjectType) => {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${id}&${objectToString(objectOfParams)}`)
            .then((response) => {

                return response.data
            })
    },

    deleteCard: (packId: string) => {
        return instance.delete('cards/card?id=' + packId)
            .then((response) => {
                return response.data
            })
    },
    addCard: (packId: string, question: string, answer: string) => {
        return instance.post('cards/card', {
            card: {
                cardsPack_id: packId,
                question: question,
                answer: answer
            }
        })
            .then((response) => {
                return response.data
            })
    },
    editCard: (cardId: string, question: string, answer: string) => {
        return instance.put('cards/card', {
            card: {
                _id: cardId,
                question: question,
                answer: answer
            }
        })
            .then((response) => {
                return response.data
            })
    }
};

