import React from 'react';
import filledStar from './../../assets/icons/black-star.png'
import star from './../../assets/icons/star.png'
import s from './Star.module.css'

type StarPropsType = {
    filled: boolean
}

export const Star = (props: StarPropsType) => {
    return (
        <div>
            <span>
                <img className={s.star} src={props.filled ? filledStar : star} alt="rating"/>
            </span>
        </div>
    );
};

