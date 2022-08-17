import { useState } from 'react';
import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';
dayjs.extend(arraySupport);

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
import InfoSessionTimeline from '../components/apply/timelines/InfoSessionTimeline';
import MoreInfo from '../components/apply/MoreInfo';

const useStyles = makeStyles((theme) => ({
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
    padding: 40,
    [theme.breakpoints.down('sm')]: {
      margin: '30px 5px 0px 5px',
      padding: 20,
    },
    height: '100%',
    border: '2px solid #8D8D8D',
  },
  infoHeading: {
    marginBottom: 35,
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

  const nonFreshmanDueDate = dayjs([2022, 8, 1, 23, 59]);
  const freshmanDueDate = dayjs([2022, 8, 29, 23, 59]);

  const nonFreshmanLink = 'https://forms.gle/xWpYYTj3oPMsavE29';
  const freshmanLink = 'https://forms.gle/AoyFXQXMUcuhjCBB8';

  // NOTE: dayjs months are 0-indexed
  const timelineData = [
    {
      date: dayjs([2022, 7, 24]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 7, 30]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 8, 1]),
      label: 'Project Team Fest',
      location: 'TBD',
    },
    {
      date: nonFreshmanDueDate,
      label: 'Upperclassmen Apps Due',
      type: 'deadline',
    },
    {
      date: dayjs([2022, 8, 15]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 8, 21]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: freshmanDueDate,
      label: 'Freshman Apps Due',
      type: 'deadline',
    },
  ];

  return (
    <div>
      <Header />
      <Head title='Apply | Cornell Rocketry Team' />

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
            <Typography variant='h6' align='center'>
              RECRUITMENT TIMELINE
            </Typography>
            <MobileTimeline
              timelineData={timelineData}
              freshmanLink={freshmanLink}
              nonFreshmanLink={nonFreshmanLink}
            />
            <MobileApplyButtons
              freshmanLink={freshmanLink}
              nonFreshmanLink={nonFreshmanLink}
              freshmanDueDate={freshmanDueDate}
              nonFreshmanDueDate={nonFreshmanDueDate}
            />
          </div>
        ) : (
          // end mobile content
          <div className={classes.applicationOpen}>
            <Typography variant='h3' align='center'>
              RECRUITMENT TIMELINE
            </Typography>
            <MainTimeline timelineData={timelineData} />
            <ApplyButtons
              freshmanLink={freshmanLink}
              nonFreshmanLink={nonFreshmanLink}
              freshmanDueDate={freshmanDueDate}
              nonFreshmanDueDate={nonFreshmanDueDate}
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

      <MoreInfo timelineData={timelineData} />
      <Footer />
    </div>
  );
}
