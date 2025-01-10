import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useAppContext } from '../context/appContext';
import BarChartComponent from './BarsChart';
import AreaChartComponent from './AreaChart';

const ChartsContainer = () => {
  const { monthlyApplications: data } = useAppContext();
  const [barChart, setBarChart] = useState(false);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>

      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
