import React, {useCallback, useState} from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import s from './Slider.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setMinMaxPacks} from "../../state/pack-search-reducer";
import {AppRootStateType} from "../../state/store";
import debounce from 'lodash.debounce'


const Slider = () => {
    const min = useSelector<AppRootStateType, number>(state => state.packSearchReducer.min);
    const max = useSelector<AppRootStateType, number>(state => state.packSearchReducer.max);
    const dispatch = useDispatch<any>();
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const setMinMaxDebounce = useCallback(debounce((min: number, max: number)=>{
        dispatch(setMinMaxPacks(min, max))
    }, 1000), []);

    const handleInput = (e: any) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
        setMinMaxDebounce(e.minValue, e.maxValue)
    };


    return (
        <div>
            <div className={s.slider}>
                <MultiRangeSlider
                    min={0}
                    max={25}
                    step={1}
                    ruler={false}
                    label={true}
                    preventWheel={true}
                    minValue={min}
                    maxValue={max}
                    barInnerColor={'blue'}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                />
            </div>
            <h3 className={s.values}>
                <div>min: {minValue}</div>
                <div>max: {maxValue}</div>
            </h3>

        </div>
    );
};

export default Slider;