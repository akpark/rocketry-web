import { useState } from 'react';
import * as dayjs from 'dayjs';
import clsx from 'clsx';
import {
  makeStyles,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Container,
  Avatar,
  IconButton,
} from '@material-ui/core';

import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import MainTimeline from '../components/apply/timelines/MainTimeline';

import MobileTimeline from '../components/apply/timelines/MobileTimeline';
import ApplyButtons from '../components/apply/ApplyButtons';
import MobileApplyButtons from '../components/apply/MobileApplyButtons';
import Hud from '../components/apply/Hud';

const useStyles = makeStyles((theme) => ({
  splash: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundOpen: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/new mexico.png')",
  },
  backgroundClosed: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/earth.jpg')",
  },

  applicationClosed: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  applicationOpenMobile: {
    marginTop: '10vh',
  },
  applicationOpen: {
    position: 'absolute',
    top: '52%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.up('lg')]: {
      width: '65vw',
    },
    [theme.breakpoints.only('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
  },

  scrollDownButton: {
    height: 100,
    width: 100,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '105%',
  },
  scrollDownIcon: {
    height: 80,
    width: 80,
  },

  moreInfo: {
    maxWidth: '100vw',
    paddingBottom: 150,
  },
  infoSection: {
    margin: '50px 20px 0px 20px',
    height: '100%',
    padding: 40,
    border: '2px solid #8D8D8D',
    // borderRadius: 10,
  },
  infoHeading: {
    marginBottom: 35,
  },
  infoTimeline: {
    paddingLeft: 0,
    // paddingTop: 30,
    position: 'relative',
  },
  infoDot: {
    listStyleType: 'none',
    paddingBottom: 20,
    borderLeft: '2px solid #C0C0C0',
    position: 'relative',
    paddingLeft: 20,
    marginLeft: 10,
    '&:last-child': {
      border: 0,
      paddingBottom: 0,
      marginLeft: 12,
    },
    '&:before': {
      content: "''",
      width: 18,
      height: 18,
      background: '#B22025',
      border: '3px solid black',
      borderRadius: '50%',
      position: 'absolute',
      left: -10,
      top: 0,
    },
  },
  infoText: {
    position: 'relative',
    top: -7,
  },
  infoLabel: {
    fontWeight: 600,
  },
  infoButton: {
    marginTop: 10,
  },
  alumni: {
    position: 'relative',
  },
  alumniPic: {
    marginTop: 20,
    marginBottom: 20,
    margin: 'auto',
    height: 200,
    width: 200,
  },
  alumniQuote: {
    marginTop: 20,
  },
}));

export default function Apply() {
  const classes = useStyles();
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [applicationOpen, setApplicationOpen] = useState(true);

  const freshmanDueDate = '2/1';
  const nonFreshmanDueDate = '9/8';

  const freshmanLink = 'https://forms.gle/AoyFXQXMUcuhjCBB8';
  const nonFreshmanLink = 'https://forms.gle/xWpYYTj3oPMsavE29';

  const newTimelineData = [
    { date: dayjs([2022, 8, 24]), label: 'Info Session' },
    {
      date: dayjs([2022, 8, 30]),
      label: 'Info Session',
    },
    {
      date: dayjs([2022, 9, 1]),
      label: 'Project Team Fest / Upperclassmen Apps Due',
      location: '@ 4‑7pm ELL',
    },
    {
      date: dayjs([2022, 9, 15]),
      label: 'Info Session',
    },
    {
      date: dayjs([2022, 9, 21]),
      label: 'Info Session',
    },
    {
      date: dayjs([2022, 9, 29]),
      label: 'Freshman Apps Due',
    },
  ];

  // ‑ no break hyphen, copy and paste
  const timelineData = [
    { date: '1/26', label: 'business applications go live' },
    {
      date: '1/31',
      label: 'information session @ zoom',
      location: '@ 5 pm zoom',
      link: 'https://cornell.zoom.us/j/98245271135?pwd=dHNhZDVoTVc4aUgwOFRzY1ZRTEhUQT09',
    },
    { date: freshmanDueDate, label: 'applications due' },
  ];

  return (
    <div>
      <Header />
      <Head title='Apply | Cornell Rocketry Team' />
      <div
        className={clsx(
          classes.splash,
          applicationOpen ? classes.backgroundOpen : classes.backgroundClosed
        )}
      >
        <Hud applicationOpen={applicationOpen}>
          {!applicationOpen ? (
            <div className={classes.applicationClosed}>
              <Typography variant='h3' align='center'>
                Applications for Fall 2022 will open soon.
              </Typography>
            </div>
          ) : mediaXs ? (
            //display different applicationOpen page when on mobile browsers
            <div className={classes.applicationOpenMobile}>
              <MobileTimeline
                timelineData={newTimelineData}
                freshmanLink={freshmanLink}
                nonFreshmanLink={nonFreshmanLink}
              />
              <MobileApplyButtons
                freshmanLink={freshmanLink}
                nonFreshmanLink={nonFreshmanLink}
              />
            </div>
          ) : (
            // end mobile content
            <div className={classes.applicationOpen}>
              <MainTimeline timelineData={newTimelineData} />
              <ApplyButtons
                freshmanLink={freshmanLink}
                nonFreshmanLink={nonFreshmanLink}
              />
              <IconButton className={classes.scrollDownButton}>
                <img
                  className={classes.scrollDownIcon}
                  src='/static/images/apply-page/scrolldown.svg'
                  alt='Scroll Down'
                />
              </IconButton>
            </div>
          )}
        </Hud>
      </div>
      <Container maxWidth='xl'>
        <Grid container justify='center' className={classes.moreInfo}>
          <Grid item md={6}>
            <div className={classes.infoSection}>
              <Typography variant='h3' className={classes.infoHeading}>
                Meet us at our information sessions.
              </Typography>
              <ul className={classes.infoTimeline}>
                {timelineData.map((data, index) => (
                  <li item xs key={index} className={classes.infoDot}>
                    <div className={classes.infoText}>
                      <Typography variant='h6' className={classes.infoLabel}>
                        {data.label.toUpperCase()}
                      </Typography>
                      <Typography variant='body1'>
                        {data.date.toUpperCase()}{' '}
                        {data.location && data.location.toUpperCase()}
                      </Typography>
                      {data.link && (
                        <Button
                          href={data.link}
                          target='_blank'
                          size='small'
                          variant='contained'
                          color='secondary'
                          className={classes.infoButton}
                        >
                          Join
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={classes.infoSection}>
              <Typography variant='h3' className={classes.infoHeading}>
                Words from our Alumni.
              </Typography>
              <div>
                <Avatar
                  className={classes.alumniPic}
                  alt='Matt Schneider'
                  src='/static/images/apply-page/alumni/mattschneider.png'
                />
                <Typography variant='h6' align='center'>
                  Matt Schneider '21
                </Typography>
                <Typography variant='body1' className={classes.alumniQuote}>
                  “As an incoming freshman, Cornell Rocketry provided me the
                  opportunity to work on challenging problems and be a part of
                  something bigger than myself. Early on I focused my efforts on
                  expressing my creative potential and honing my design
                  instincts, but came to see an equally significant value in the
                  friendships and mentorships gained along the way. The team
                  gave me the chance to develop as a leader, learning in the
                  moment from my mistakes and taking on more responsibilities
                  along the way. Without a doubt, my time on Cornell Rocketry
                  was THE formative experience of my time in college and I’m
                  grateful to have been able to contribute.”
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
