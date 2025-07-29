import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import "../css/experience.css";

const styles = {
  ulStyle: {
    listStyle: "disc",
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: "inline-block",
    fontWeight: "bold",
  },
  inlineChild: {
    display: "inline-block",
    marginLeft: 6,
    fontStyle: "italic",
  },
  itemStyle: {
    marginBottom: 40,
    paddingLeft: 20,
    borderLeft: "3px solid",
    position: "relative",
  },
  dotStyle: (color) => ({
    position: "absolute",
    left: -11,
    top: 5,
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: color,
  }),
};

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences)
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />

      {data ? (
        <div className="section-content-container">
          <Container>
            {data.map((item, index) => (
              <motion.div
                key={item.title + index}
                style={{
                  ...styles.itemStyle,
                  borderColor: theme.accentColor,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div style={styles.dotStyle(theme.accentColor)} />
                <p className="text-muted">{item.dateText}</p>
                <h2 className="item-title">{item.title}</h2>

                <div style={styles.subtitleContainerStyle}>
                  <h4
                    style={{
                      ...styles.subtitleStyle,
                      color: theme.accentColor,
                    }}
                  >
                    {item.subtitle}
                  </h4>
                  {item.workType && (
                    <span style={styles.inlineChild}>· {item.workType}</span>
                  )}
                </div>

                <ul style={styles.ulStyle}>
                  {item.workDescription.map((point, i) => (
                    <li key={i}>
                      <ReactMarkdown
                        children={point}
                        components={{
                          p: "span",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
