import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "1.2em",
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  profile: {
    width: "256px",
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <motion.div
              style={styles.mainContainer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Row>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
                <Col style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={styles.profile}
                  />
                </Col>
              </Row>
            </motion.div>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
