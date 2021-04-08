import React from "react";
import styles from '../styles/SearchBar.modules.css'
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {useHistory} from "react-router-dom";
import { Slider, Typography } from "@material-ui/core/";


export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  var desiredPrice = 100;
  const marks = [
    {
      value: 0,
      label: "$0"
    },
    {
      value: 25,
      label: "$25"
    },
    {
      value: 50,
      label: "$50"
    },
    {
      value: 75,
      label: "$75"
    },
    {
      value: 100,
      label: "$100"
    }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    e.target.value.length === 0
      ? history.push(`/search/allgames/${desiredPrice}`)
      : history.push(`/search/${e.target.value}/${desiredPrice}`);
  }

  function valuetext(value) {
    desiredPrice = value
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar-searchArea">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            }}
          />
        </div>
      </div>
      <div className="search-bar-slider">
        <div className={classes.root}>
          <Typography
            id="discrete-slider-small-steps"
            gutterBottom
            style={{ fontColor: "yellow"}}
          ></Typography>
          <Slider
            defaultValue={100}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-small-steps"
            step={5}
            marks={marks}
            min={-0}
            max={100}
            valueLabelDisplay="auto"
            style={{ color: "green"}}
          />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    width: "100%",
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  root: {
    width: '100%',
    height: 28.5,
    background: "linear-gradient(90deg, green, red)",
  },
}));