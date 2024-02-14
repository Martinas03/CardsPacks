import React, {useState} from 'react';
import s from './Settings.module.css'
import Slider from "../slider/Slider";
import {useDispatch} from "react-redux";
import {setShowAllPacks} from "../../state/pack-search-reducer";

export type SettingsPropsType = {
    userId: string
}

const Settings = (props: SettingsPropsType) => {
    const [isMyActive, setIsMyActive] = useState(false);
    const [isAllActive, setIsAllActive] = useState(false);
    const dispatch = useDispatch<any>();


    const handleAllChange = () => {
        setIsAllActive(true);
        setIsMyActive(false);
        dispatch(setShowAllPacks(''))
    };

    const handleMyChange = () => {
        setIsAllActive(false);
        setIsMyActive(true);
        dispatch(setShowAllPacks(props.userId))
    };



    return (
        <div className={s.container}>
            <div>
                <h2>Show packs cards</h2>
                <div className={s.buttonsWrapper}>
                    <button onClick={handleMyChange} className={isMyActive ? s.active : s.button}>My</button>
                    <button onClick={handleAllChange} className={isAllActive ? s.active : s.button}>All</button>
                </div>
            </div>
            <div>
                <h2>Number of cards</h2>
                <div className={s.slider}>
                    <Slider/>
                </div>
            </div>

        </div>
    );
};

export default Settings;