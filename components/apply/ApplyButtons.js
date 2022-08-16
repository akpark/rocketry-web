import React from 'react';
import * as dayjs from 'dayjs';
import clsx from 'clsx';

import { makeStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 50,
    [theme.breakpoints.up('md')]: {
      padding: '0 60px 0 60px',
    },
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    maxWidth: 500,
  },
  button: {
    transition: '300ms ease',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(140%)',
    },
    [theme.breakpoints.only('sm')]: {
      margin: '0 30px 0 30px',
    },
    [theme.breakpoints.only('xs')]: {
      margin: '0 5px 0 5px',
    },
  },
  leftButton: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: '5vw',
      marginRight: '1vw',
    },
    [theme.breakpoints.only('md')]: {
      marginLeft: 80,
      marginRight: 20,
    },
  },
  rightButton: {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5vw',
      marginLeft: '1vw',
    },
    [theme.breakpoints.only('md')]: {
      marginRight: 80,
      marginLeft: 20,
    },
  },
}));

export default function ApplyButtons({ freshmanLink, nonFreshmanLink }) {
  const classes = useStyles();

  const freshmanDueDate = dayjs([2022, 9, 29]);
  const nonFreshmanDueDate = dayjs([2022, 9, 1]);

  return (
    <Grid
      className={classes.buttons}
      container
      direction='row'
      // justifyContent='space-evenly'
      alignItems='center'
    >
      <Grid item xs className={classes.buttonContainer}>
        <a href={freshmanLink} target='_blank'>
          <img
            className={clsx(classes.button, classes.leftButton)}
            src='/static/images/apply-page/freshman button.svg'
            alt='Freshman Application'
          />
        </a>
        <Typography align='center' variant='body1'>
          DUE {freshmanDueDate.format('M/D')}
        </Typography>
      </Grid>
      <Grid item xs className={classes.buttonContainer}>
        <a href={nonFreshmanLink} target='_blank'>
          <img
            className={clsx(classes.button, classes.rightButton)}
            src='/static/images/apply-page/nonfreshman button.svg'
            alt='Non-Freshman Application'
          />
        </a>
        <Typography align='center' variant='body1'>
          DUE {nonFreshmanDueDate.format('M/D')}
        </Typography>
      </Grid>
    </Grid>
  );
}