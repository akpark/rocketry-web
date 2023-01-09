import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Grid, Typography, Container, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

import { promises as fs } from 'fs';
import path from 'path';
import SubteamTooltip from '../components/team/SubteamTooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    // overflow: 'hidden',
  },
  blueprint: {
    backgroundImage: 'url("/static/images/team-page/blueprint/blueprint.svg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '12vh',
    // [theme.breakpoints.only('lg')]: {
    //   padding: '80px 0 80px 0',
    // },
    [theme.breakpoints.down('lg')]: {
      padding: '60px 10px 60px 10px',
    },
  },
  blueprintGrid: {
    minHeight: '80vh',
  },
  blueprintComponent: {
    margin: '0 10px 0 10px',
    position: 'relative',
    zIndex: 3,
    maxHeight: '40vh',
    opacity: 0.5,
    cursor: 'pointer',
    transition: '200ms',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.01)',
    },
  },
  recoveryAndBusiness: {
    margin: '20px 0 20px 0',
  },
  blueprintRocket: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '75vh',
  },
  structures: {
    maxHeight: '75vh',
    display: 'block',
    height: '65%',
    zIndex: 1,
    '&:hover': {
      zIndex: 3,
    },
  },
  propulsion: {
    display: 'block',
    marginTop: 3,
    // height: '15.635%', //structures height * the ratio between the svg heights
    // [theme.breakpoints.down('xs')]: {
    //   height: '15.56%'
    // },
    height: '42.3%',
    zIndex: 2,
  },
  viewAll: {
    marginTop: 22,
    marginBottom: 5,
    opacity: 0.75,
    transform: 'scale(0.9)',
    cursor: 'pointer',
    textDecoration: 'underline 1px',
    textUnderlineOffset: '2px',
    transition: '200ms',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  blueprintCircuitBoard: {
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('lg')]: {
      height: 100,
    },
  },
  circuitBoardComponent: {
    position: 'absolute',
  },
  dividerLine: {
    marginTop: 0,
    color: 'white',
    backgroundColor: 'white',
    height: 2,
    border: 'none',
    // marginBottom: 12,
  },
  teamHeading: {
    color: theme.palette.secondary.main,
    margin: '40px 0 20px 0',
  },
  teamLeadPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 210,
  },
  subteam: {
    marginBottom: 8,
    color: '#bbbbbb',
  },
  subteamLeadPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 200,
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
    // whiteSpace: 'nowrap',
  },
  subteamLeadLabel: {
    color: '#bbbbbb',
  },

  subteamsContainer: {
    marginBottom: 100,
  },
}));

export default function Team({ members, subteamLeads, teamLeads }) {
  const xs = useMediaQuery('(max-width:600px)'); //true for extra small screen sizes
  const classes = useStyles();
  const divider = useRef();

  const [selectedSubteam, setSelectedSubteam] = useState(-1);

  useEffect(() => {
    if (selectedSubteam != -1) {
      const yOffset = !xs ? -80 : -50;
      const element = divider.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
  /*
  -1 - default state, no subteam selected, show team leads and subteam leads
  0 - show all state, show team leads, and all subteams but not subteam leads
  1 - business 
  2 - electrical
  3 - embedded software
  4 - propulsion
  5 - recovery & payload
  6 - structures
 */

  const subteamDescriptions = {
    electrical:
      "The Electrical subteam designs, manufactures, and tests electrical systems for launching the vehicle's payload. This subteam is responsible for the design and manufacture of an aerial system that will navigate the descending rocket to a predetermined GPS coordinate. Our sub team focuses on both data acquisition and interfacing with the payload for deployment. We take various measurements mid-flight, store the data, and communicate it to the ground using radio communication, and we focus on electrical design.",
    embeddedSoftware:
      "The Embedded Software team designs and creates a module to be flown on the launch vehicle which provides the team with continuous information about the rocket's position and velocity. Once the launch vehicle has landed, the subteam handles recovery and tracking. This often includes designing custom flight software for the launch vehicle and ground station which involves collecting and analyzing data to determine when to launch the parachutes and the payload.",
    propulsion:
      'The propulsion team handles the lift requirements of the launch vehicle. As a research and development based team, propulsion designs, simulates, manufactures, and tests rocket motors and engines for use on the launch vehicle. Design focus is on lifting the launch vehicle to a prescribed altitude while maintaining control of thrust throughout the ascent.',
    recoveryAndPayload:
      'The Recovery and Payload subteam is responsible for the design and manufacture of an aerial system that will navigate the descending rocket to a predetermined GPS coordinate. The payload is an autonomous flight vehicle that deploys from the descending rocket and navigates to the ground. Each year the subteam decides on a new payload, designing and fabricating it from scratch.',
    business:
      "The Business team handles the team's finances, web development, content and design creation, sponsorship relations, events, and logistics. The business team ensures that the team always has the funding to complete our operations, and always has the organization to bring our team to the Spaceport America Cup.",
    structures:
      'The Structures subteam handles the overall structure and recovery systems of the competition launch vehicle. The subteam chooses the rocket motor, performs rocket motion simulations to accurately predict the launch vehicle’s attitude of apogee, and designs various parts of the rocket including the parachute recovery system, the nose cone, and the booster section. Structures is also responsible for other components such as the AV pay, motor mount and rocket fins.',
  };

  return (
    <div className={classes.root}>
      <Head title='Team | Cornell Rocketry Team' />
      <Header />
      <div className={classes.blueprint}>
        <Container maxWidth='lg' disableGutters>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={0}
            className={classes.blueprintGrid}
          >
            <Grid item xs={5} lg={4}>
              <SubteamTooltip title={subteamDescriptions.recoveryAndPayload}>
                <img
                  src='/static/images/team-page/blueprint/recoveryandpayload.svg'
                  alt='Recovery & Payload'
                  className={clsx(
                    classes.blueprintComponent,
                    classes.recoveryAndBusiness
                  )}
                  onClick={() => setSelectedSubteam(5)}
                />
              </SubteamTooltip>
              <SubteamTooltip title={subteamDescriptions.business}>
                <img
                  src='/static/images/team-page/blueprint/business.svg'
                  alt='Business'
                  className={clsx(
                    classes.blueprintComponent,
                    classes.recoveryAndBusiness
                  )}
                  onClick={() => setSelectedSubteam(1)}
                />
              </SubteamTooltip>
            </Grid>
            <Grid item xs={2} lg={4}>
              <div className={classes.blueprintRocket}>
                <SubteamTooltip title={subteamDescriptions.structures}>
                  <img
                    src={
                      !xs
                        ? '/static/images/team-page/blueprint/structures.svg'
                        : '/static/images/team-page/blueprint/structures xs.svg'
                    }
                    alt='Structures'
                    className={clsx(
                      classes.blueprintComponent,
                      classes.structures
                    )}
                    onClick={() => setSelectedSubteam(6)}
                  />
                </SubteamTooltip>
                <SubteamTooltip title={subteamDescriptions.propulsion}>
                  <img
                    src={
                      !xs
                        ? '/static/images/team-page/blueprint/propulsion.svg'
                        : '/static/images/team-page/blueprint/propulsion xs.svg'
                    }
                    alt='Propulsion'
                    className={clsx(
                      classes.blueprintComponent,
                      classes.propulsion
                    )}
                    onClick={() => setSelectedSubteam(4)}
                  />
                </SubteamTooltip>
                <Typography
                  variant='h5'
                  align='center'
                  className={classes.viewAll}
                  onClick={() => setSelectedSubteam(0)}
                >
                  VIEW ALL
                </Typography>
              </div>
            </Grid>
            <Grid item xs={5} lg={4} className={classes.blueprintCircuitBoard}>
              <SubteamTooltip title={subteamDescriptions.electrical}>
                <img
                  src='/static/images/team-page/blueprint/electrical.svg'
                  alt='Electrical'
                  className={clsx(
                    classes.blueprintComponent,
                    classes.circuitBoardComponent
                  )}
                  onClick={() => setSelectedSubteam(2)}
                />
              </SubteamTooltip>

              <SubteamTooltip title={subteamDescriptions.embeddedSoftware}>
                <img
                  src='/static/images/team-page/blueprint/embeddedsoftware.svg'
                  alt='Embedded Software'
                  className={clsx(
                    classes.blueprintComponent,
                    classes.circuitBoardComponent
                  )}
                  onClick={() => setSelectedSubteam(3)}
                />
              </SubteamTooltip>
            </Grid>
          </Grid>
        </Container>
      </div>
      <hr ref={divider} className={classes.dividerLine} />

      {(selectedSubteam == -1 || selectedSubteam == 0) && (
        <Container maxWidth='lg' className={classes.teamLeadContainer}>
          <Typography
            variant='h4'
            align='center'
            className={classes.teamHeading}
          >
            TEAM LEADS
          </Typography>
          <Grid
            container
            justifyContent='center'
            alignItems='flex-start'
            spacing={3}
          >
            {teamLeads.fileNames.map((name) => (
              <Grid item sm={4} md={3} key={name}>
                <img
                  src={teamLeads.dir + '\\' + name}
                  alt={name}
                  className={classes.teamLeadPic}
                />
                <Typography
                  variant='body1'
                  align='center'
                  className={classes.name}
                >
                  {name.split('.')[0]}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {selectedSubteam == -1 && (
        <Container maxWidth='lg' className={classes.subteamLeadContainer}>
          <Typography
            variant='h4'
            align='center'
            className={classes.teamHeading}
          >
            SUBTEAM LEADS
          </Typography>
          <Grid
            container
            justifyContent='space-evenly'
            alignItems='flex-start'
            spacing={3}
          >
            {subteamLeads.map((subteam) => (
              <Grid item sm={4} md={4} lg={2} key={subteam}>
                <Typography
                  variant='body1'
                  align='center'
                  className={classes.subteam}
                >
                  {subteam.subteam.toUpperCase()}
                </Typography>

                {subteam.fileNames.map((fileName) => (
                  <div key={fileName}>
                    <img
                      src={subteam.dir + '\\' + fileName}
                      alt={fileName}
                      className={classes.subteamLeadPic}
                    />
                    <Typography
                      variant='body1'
                      align='center'
                      className={classes.name}
                    >
                      {fileName.split('.')[0]}
                    </Typography>
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Container maxWidth='lg' className={classes.subteamsContainer}>
        {members.map((subteam, index) => (
          <div key={subteam}>
            {(selectedSubteam == index + 1 || selectedSubteam == 0) && (
              <>
                <Typography
                  variant='h4'
                  align='center'
                  className={classes.teamHeading}
                  key={subteam}
                >
                  {subteam.subteam.toUpperCase()}
                </Typography>
                <Grid
                  container
                  justifyContent='center'
                  alignItems='flex-start'
                  spacing={3}
                >
                  {subteamLeads[index].fileNames.map((name) => (
                    <Grid item sm={4} md={4} lg={2} key={name}>
                      <img
                        src={subteamLeads[index].dir + '\\' + name}
                        alt={name}
                        className={classes.subteamLeadPic}
                      />
                      <Typography
                        variant='body1'
                        align='center'
                        className={classes.name}
                      >
                        {name.split('.')[0]}
                      </Typography>
                      <Typography
                        variant='body2'
                        align='center'
                        className={classes.subteamLeadLabel}
                      >
                        <i>Subteam Lead</i>
                      </Typography>
                    </Grid>
                  ))}
                  {subteam.fileNames.map((name) => (
                    <Grid item sm={4} md={4} lg={2} key={name}>
                      <img
                        src={subteam.dir + '\\' + name}
                        alt={name}
                        className={classes.subteamLeadPic}
                      />
                      <Typography
                        variant='body1'
                        align='center'
                        className={classes.name}
                      >
                        {name.split('.')[0]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </div>
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const subteams = [
    'business',
    'electrical',
    'embedded software',
    'propulsion',
    'recovery & payload',
    'structures',
  ];

  const teamDirectory = path.join(
    process.cwd(),
    'public/static/images/team-page'
  );

  const membersImages = subteams.map(async (subteam) => {
    var subteamDirectory = path.join(teamDirectory, 'members', subteam);
    var fileNames = await fs.readdir(subteamDirectory);

    return {
      subteam,
      dir: subteamDirectory.split('public')[1],
      fileNames,
    };
  });

  const subteamLeadImages = subteams.map(async (subteam) => {
    var subteamDirectory = path.join(teamDirectory, 'subteam leads', subteam);
    var fileNames = await fs.readdir(subteamDirectory);

    return {
      subteam,
      dir: subteamDirectory.split('public')[1],
      fileNames,
    };
  });

  const teamLeadDirectory = path.join(teamDirectory, 'team leads');
  const fileNames = await fs.readdir(teamLeadDirectory);
  const teamLeadImages = {
    dir: teamLeadDirectory.split('public')[1],
    fileNames,
  };

  return {
    props: {
      members: await Promise.all(membersImages),
      subteamLeads: await Promise.all(subteamLeadImages),
      teamLeads: teamLeadImages,
    },
  };
}
