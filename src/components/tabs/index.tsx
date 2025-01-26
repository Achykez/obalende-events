import { FC } from "react";
import {  Typography, Tabs, Row, Col } from "antd";
import { keyframes, styled } from "styled-components";

const { Title } = Typography;

interface ITitleSection {
  title: string;
  buttonText?: string;
  onAddButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNavClick: (nav: string) => void;
  active: string;
  navItems: Array<{ key: string; label: string; count?: number }>;
}

export const TabsSection: FC<ITitleSection> = ({
  title,
  onNavClick,
  active,
  navItems, // Default nav items
}) => {
  return (
    <Row gutter={[16, 16]}>
      {/* Title and Button Section */}
      <Col xs={24} sm={24} md={16} lg={12}>
        <Flex>
          <Title level={4}>{title}</Title>
        </Flex>
      </Col>

      {/* Navigation Section */}
      <Col xs={24}>
        <Tabs
          activeKey={active}
          onChange={onNavClick}
          items={navItems.map((nav) => ({
            key: nav.key,
            label: (
              <span>
                {nav.label} {""}
                {nav.count && nav.count > 0 && <BlinkingLabel>{nav.count}</BlinkingLabel>}
              </span>
            ),
          }))}
        />
      </Col>
    </Row>
  );
};

// Styled Components
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const BlinkingLabel = styled.span`
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.red[500]};
  color: ${({ theme }) => theme.colors.background.light};
  padding: 5px;
  height: 20px;
  /* width: 20px; */
  border-radius: 50%;
  animation: ${blink} 1.5s infinite;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;
