import React from "react";
import { Tag } from "../../ui/misc";
import Blocks from "./Blocks";

const MatchesHome = () => {
  return (
    <section className="home-matches">
      <div className="container">
        <div className="home-matches__title">
          <Tag
            background="#0e1731"
            size="5rem"
            color="#ffffff"
            add={{
              padding: "0 2rem"
            }}
          >
            Matches
          </Tag>
        </div>
        <div className="home-matches__wrapper">
          <Blocks />
        </div>
        <div className="home-matches__link-morematches">
          <Tag
            color="#0e1731"
            background="#ffffff"
            size="2.2rem"
            link={true}
            linkTo="/the_matches"
            className="link-more-matches"
          >
            See more matches
          </Tag>
        </div>
      </div>
    </section>
  );
};

export default MatchesHome;
