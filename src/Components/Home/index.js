import React from "react";

import Featured from "./featured";
import Matches from "./matches";
import MeetPlayers from "./meetPlayers";
import Promotion from "./promotion";

const Home = () => {
  return (
    <main className="main">
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </main>
  );
};

export default Home;
