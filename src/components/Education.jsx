import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styled, { ThemeContext } from "styled-components";

import endpoints from "../constants/endpoints";
import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import "../css/education.css";

const TimelineContainer = styled.div`
  position: relative;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 3px solid ${({ theme }) => theme.accentColor};
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.chronoTheme.cardBgColor};
  color: ${({ theme }) => theme.chronoTheme.cardForeColor};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    left: -31px;
    top: 1rem;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.accentColor};
    border: 3px solid #fff;
  }
`;

const TimelineTitle = styled.h4`
  margin: 0 0 0.5rem;
`;
// color: ${({ theme }) => theme.chronoTheme.titleColor};

const TimelineSubTitle = styled.h6`
  margin: 0 0 0.5rem;
  font-weight: normal;
`;
// color: ${({ theme }) => theme.chronoTheme.titleColor};

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    const w = window?.innerWidth;
    if (w < 576) setWidth("90vw");
    else if (w < 768) setWidth("90vw");
    else if (w < 1024) setWidth("75vw");
    else setWidth("50vw");
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ width }} className="section-content-container">
            <Container>
              <TimelineContainer>
                {data.education.map((edu, idx) => (
                  <TimelineItem
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <TimelineTitle>{edu.cardTitle}</TimelineTitle>
                    <TimelineSubTitle>{edu.cardSubtitle}</TimelineSubTitle>
                    <p>{edu.cardDetailedText}</p>
                    {edu.icon && (
                      <img
                        src={edu.icon.src}
                        alt={edu.icon.alt}
                        style={{ width: "40px", marginTop: "10px" }}
                      />
                    )}
                  </TimelineItem>
                ))}
              </TimelineContainer>
            </Container>
          </div>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
