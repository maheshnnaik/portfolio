// components/Timeline.jsx
import { motion } from "framer-motion";
import styled from "styled-components";

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  margin-left: 1.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -1rem;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.accentColor};
  }
`;

const TimelineCard = styled(motion.div)`
  background: ${({ theme }) => theme.chronoTheme.cardBgColor};
  color: ${({ theme }) => theme.chronoTheme.cardForeColor};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
  max-height: 250px;
  overflow: auto;

  &::before {
    content: "";
    position: absolute;
    top: 1rem;
    left: -1.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.accentColor};
    border: 2px solid ${({ theme }) => theme.accentColor};
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.chronoTheme.titleColor};
  margin: 0;
`;

export default function Timeline({ items = [] }) {
  return (
    <TimelineContainer>
      {items.map((item, index) => (
        <TimelineCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Title>{item.title}</Title>
          <p>{item.cardSubtitle}</p>
          <small>{item.cardTitle}</small>
        </TimelineCard>
      ))}
    </TimelineContainer>
  );
}
