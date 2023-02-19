import { Grid, makeStyles } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InstagramIcon from '@material-ui/icons/Instagram';
import { LinkedIn } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import SocialMediaButton from '../SocialMediaButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: 'hidden',
    marginBottom: 30,
  },
  memberPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
  },
  semiBold: {
    fontWeight: '600',
  },
  socialMedia: {
    marginTop: 5,
    marginLeft: -10,
    marginBottom: -10,
    '& > *': {
      marginRight: 2,
    },
  },
}));

export default function MemberDialog({ imageDir, member, handleClose, open }) {
  const classes = useStyles();

  const { name, majors, minors, graduationYear, college } = member;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth='md'
      PaperProps={{
        style: { borderRadius: 0 },
      }}
    >
      <DialogTitle onClose={handleClose}>{name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={3}>
            <img
              src={`${imageDir}${name}.jpg`}
              alt={name}
              className={classes.memberPic}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h6' className={classes.semiBold}>
              {name}
            </Typography>
            <br />
            <Typography variant='body1'>
              <span className={classes.semiBold}>Major:</span>{' '}
              {majors.map((m, index) => (index == 0 ? m : ', ' + m))}
              <br />
              {minors.length != 0 && (
                <>
                  <span className={classes.semiBold}>Minor:</span>{' '}
                  {minors.map((m, index) => (index == 0 ? m : ', ' + m))}
                  <br />
                </>
              )}
              <span className={classes.semiBold}>Graduation Year:</span>{' '}
              {graduationYear}
              <br />
              <span className={classes.semiBold}>College: </span> {college}
              <br />
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptate aliquid iure ipsam consectetur, ad commodi cupiditate
              repudiandae eius quod, laborum dignissimos unde libero ducimus
              placeat eos dicta doloremque! Quos, totam!
            </Typography>
            <div className={classes.socialMedia}>
              <SocialMediaButton
                link='https://www.facebook.com/CornellRocketry/'
                icon={<InstagramIcon />}
              />
              <SocialMediaButton
                link='https://www.facebook.com/CornellRocketry/'
                icon={<LinkedIn />}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
