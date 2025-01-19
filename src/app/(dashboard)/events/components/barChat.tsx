'use client';
import { ArrowDownIcon, CheckIcon } from '@/assets';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const dataSet = [
  { year: 'Jan', count: 10 },
  { year: 'Feb', count: 20 },
  { year: 'Mar', count: 15 },
  { year: 'Apr', count: 25 },
  { year: 'May', count: 22 },
  { year: 'Jun', count: 30 },
  { year: 'Aug', count: 28 },
  { year: 'Sep', count: 58 },
  { year: 'Oct', count: 38 },
  { year: 'Nov', count: 28 },
  { year: 'Dec', count: 28 },
];

const data = {
  labels: dataSet.map((data) => data.year),
  datasets: [
    {
      id: 1,
      label: '',
      data: dataSet.map((data) => data.count),
      backgroundColor: '#006749',
      barThickness: 40,
    },
  ],
};

const navItems = ['Sales', 'Visits'];
const BarChat = () => {
  const [showSelectDropdown, setShowSelectDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All year');

  const selectDropdownItems = useMemo(
    () => ['All year', 'All month', 'All week', 'All day'],
    []
  );
  return (
    <Container id="acquisitions">
      <ChartHeader>
        <HeaderTop>
          <ChartTab>
            {navItems.map((nav) => (
              <NavItem key={nav} $active={'sales' === nav.toLowerCase()}>
                {nav}
              </NavItem>
            ))}
          </ChartTab>
          <Select onClick={() => setShowSelectDropdown(!showSelectDropdown)}>
            {selectedFilter} <ArrowDownIcon />{' '}
          </Select>
          {showSelectDropdown && (
            <Dropdown>
              {selectDropdownItems.map((item) => (
                <DropDownItem
                  key={item}
                  onClick={() => {
                    setSelectedFilter(item);
                    setShowSelectDropdown(false);
                  }}
                >
                  {item}
                  {selectedFilter == item && <CheckIcon />}
                </DropDownItem>
              ))}
            </Dropdown>
          )}
        </HeaderTop>
        <ChartTitle>Sales over time</ChartTitle>
      </ChartHeader>
      <BarWrapper>
        <Bar data={data} options={options} width={'100'} />
      </BarWrapper>
    </Container>
  );
};

const ChartTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
`;

const Container = styled.div`
  margin-top: 24px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08),
    0px 0px 0px 1px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 452px;
  padding: 18px;
`;

const ChartHeader = styled.div``;
const BarWrapper = styled.div`
  height: 312px;
`;
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const ChartTab = styled.div``;
const Select = styled.button`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  width: fit-content;
  height: 48px;
  padding: 0 12px;
  background: none;
  display: flex;
  align-items: center;

  cursor: pointer;
  svg {
    margin-left: 10px;
  }
`;

const NavItem = styled.button<{ $active: boolean }>`
  cursor: pointer;
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
  border: none;
  height: 40px;
  background: none;
  margin-right: 12px;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.darkGreen[800] : theme.colors.neutral[400]};
  border-bottom: 1.5px solid
    ${({ theme, $active }) => ($active ? theme.colors.darkGreen[500] : 'none')};
`;

const Dropdown = styled.div`
  position: absolute;
  width: 154px;
  top: 60px;
  right: 0;
  height: fit-content;
  padding: 8px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.White};
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 16px 32px -2px rgba(0, 0, 0, 0.08);
`;

const DropDownItem = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
  cursor: pointer;
`;

export default BarChat;
