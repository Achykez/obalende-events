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
import { Doughnut } from 'react-chartjs-2';
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
const doughnutDataSet = [
  { year: 'Accesories', count: 10 },
  { year: 'Smartphones', count: 20 },
  { year: 'Airtime databundle', count: 15 },
  { year: 'Routers & Mifi', count: 25 },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: false,
      text: 'Doughnut Chart Example',
    },
  },
};

const doughnutData = {
  labels: doughnutDataSet.map((data) => data.year),
  datasets: [
    {
      id: 1,
      label: '',
      data: doughnutDataSet.map((data) => data.count),
      backgroundColor: [
        colors.darkGreen[500],
        colors.darkGreen[500],
        colors.darkGreen[100],
        colors.darkGreen[300],
      ],
      borderWidth: 2,
    },
  ],
};
const PieChart = () => {
  return (
    <Container>
      <ChartTitle>Sales proportion</ChartTitle>
      <Flex>
        <PiiChartWrapper>
          <PiiTotals>
            <CardTitle>Total Sales</CardTitle>
            <CardValue>N/A</CardValue>
          </PiiTotals>

          <Doughnut data={doughnutData} options={chartOptions} />
        </PiiChartWrapper>
        <ChartKeys>
          <Key>
            <Right>
              <BulletPoint />
              Accesories
            </Right>
            <Left>
              20%
              <ChartTitle>₦40,000</ChartTitle>
            </Left>
          </Key>
          <Key>
            <Right>
              <BulletPoint />
              Smartphones
            </Right>
            <Left>
              20%
              <ChartTitle>₦40,000</ChartTitle>
            </Left>
          </Key>
          <Key>
            <Right>
              <BulletPoint />
              Airtime databundle
            </Right>
            <Left>
              20%
              <ChartTitle>₦40,000</ChartTitle>
            </Left>
          </Key>
          <Key>
            <Right>
              <BulletPoint />
              Routers & Mifi
            </Right>
            <Left>
              20%
              <ChartTitle>₦40,000</ChartTitle>
            </Left>
          </Key>
        </ChartKeys>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  height: 438px;
  width: 55%;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08),
    0px 0px 0px 1px rgba(0, 0, 0, 0.08);
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const PiiChartWrapper = styled.div`
  width: 239px;
  height: 240px;
  text-align: center;
  position: relative;
`;

const ChartKeys = styled.div`
  width: 300px;
  margin-left: 60px;
`;
const Key = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;
const Right = styled.p`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral[500]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
  p {
    margin-left: 10px;
  }
`;
const BulletPoint = styled.div`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.darkGreen[500]};
  width: 10px;
  height: 10px;
  margin-right: 10px;
`;

const PiiTotals = styled.div`
  position: absolute;
  top: 80px;
  left: 45px;
`;

const CardTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;

const CardValue = styled.p`
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.Medium, variant: variants.HEADER3 })};
`;
const ChartTitle = styled.p`
  margin: 24px 0;

  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
`;
export default PieChart;
