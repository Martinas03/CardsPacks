import {Dispatch} from "redux";
import {authApi} from "../api/api";


export type UserType = {
    userId: any
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}

export type InitialStateType = {
    user: UserType,
    isAuth: boolean
    isRegister: boolean
}
let initialState: InitialStateType = {
    user: {} as UserType,
    isAuth: false,
    isRegister: false
};
type ActionType = SetIsAuthUserType | SetUserDataActionType | SetRegisterDataActionType

export type SetUserDataActionType = {
    type: 'login/SET_USER_DATA'
    user: UserType
}

export type SetRegisterDataActionType = {
    type: 'register/SET_REGISTER_DATA'

    isRegister: boolean
}

export type SetIsAuthUserType = {
    type: 'login/SET_IS_AUTH'
    value: boolean

}

const SET_USER_DATA = 'login/SET_USER_DATA';
const SET_IS_AUTH = 'login/SET_IS_AUTH';
const SET_REGISTER_DATA = 'register/SET_REGISTER_DATA';

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_REGISTER_DATA: {
            return {
                ...state,
                isRegister: action.isRegister
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.user
            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.value
            }
        }
        default:
            return state
    }
};


export const setUserData = (user: UserType): SetUserDataActionType => ({
    type: SET_USER_DATA, user
});

export const setRegisterData = (isRegister: boolean): SetRegisterDataActionType => ({
    type: SET_REGISTER_DATA, isRegister
});

export const setIsAuth = (value: boolean): SetIsAuthUserType => ({
    type: SET_IS_AUTH, value
});





export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        try {
            authApi.getLogin(email, password, rememberMe)
                .then((data) => {
                    dispatch(setUserData(data));
                    console.log(data)
                    dispatch(setIsAuth(true));
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userId', data._id);
                })
        } catch (e) {
            console.log(e);
        }
    }
};

export const RegisterTC = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await authApi.getRegister(email, password);
            dispatch(setRegisterData(true))
        } catch (e) {
            console.log('error from register', e);
        }
    }
};

export const authMeTC = (navigate: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await authApi.authMe(token);
            localStorage.setItem("token", response.token);
            dispatch(setUserData(response));
            dispatch(setIsAuth( true))
        } else {
            navigate('/login')
        }
    } catch (e) {
        navigate('/login');
        console.log('error from register', e);
    }
};

export const logoutTC = (navigate: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await authApi.logout(token);
            localStorage.removeItem("token");
            dispatch(setUserData(response));
            dispatch(setIsAuth( false));
            navigate('/login')
        }
    } catch (e) {
        console.log(e);
    }
};


