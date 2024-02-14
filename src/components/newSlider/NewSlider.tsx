import React from 'react';
import ReactSlider from "react-slider";
import  './NewSlider.module.css'
import {Slider} from "@mui/material";

const NewSlider = () => {
    return (

        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={10}

        />
    );
};

export default NewSlider;