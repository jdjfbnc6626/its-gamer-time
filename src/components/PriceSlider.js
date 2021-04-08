import React from "react";
import { Slider, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 28.5,
    background: 'linear-gradient(90deg, green, red)'
  },
});

function valuetext(value) {
  // console.log(value)
}

export default function PriceSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom style={{color:'green'}}>

      </Typography>
      <Slider
        defaultValue={100}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={5}
        marks
        min={-0}
        max={100}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
