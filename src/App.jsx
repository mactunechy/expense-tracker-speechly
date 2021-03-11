import { Grid } from "@material-ui/core";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  ErrorPanel,
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import React, { useEffect, useRef } from "react";
import bgVideo from "./assets/bg.mp4";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();

  const { speechState } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => main.current?.scrollIntoView();

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <>
      <video autoPlay loop muted id="appContainer">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div id="content">
        <Grid
          className={classes.grid}
          container
          alignItems="flex-start"
          justify="center"
          spacing={0}
        >
          <Grid item sm={3} xs={12} className={classes.mobile}>
            <Details title="Expense" />
          </Grid>
          <Grid ref={main} item sm={5} xs={12} className={classes.main}>
            <Main />
          </Grid>

          <Grid item sm={3} xs={12} className={classes.desktop}>
            <Details title="Expense" />
          </Grid>

          <Grid item sm={3} xs={12} className={classes.last}>
            <Details title="Income" />
          </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer>
        </Grid>
      </div>
    </>
  );
}

export default App;
