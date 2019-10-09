import React from 'react';
import { Chart } from 'react-charts';
import Alert from 'react-bootstrap/Alert';

function getSeriesByType(type) {
  switch (type) {
    case 'area':
      return {
        type: 'area'
      };
    case 'bar':
      return {
        type: 'bar'
      };
    case 'bubble':
      return {
        type: 'bubble',
        showPoints: false
      };
    default:
      return {
        showPoints: false
      };
  }
}

export default function DynamicChart({
  coordinates = [],
  chartType = 'linear'
}) {
  console.log({ chartType });
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: coordinates
      }
    ],
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  );
  const series = React.useMemo(() => getSeriesByType(chartType), [chartType]);
  if (!coordinates.length) {
    return (
      <div>
        <Alert variant="danger">Coordinates is required.</Alert>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '480x',
        height: '512px'
      }}>
      <Chart data={data} axes={axes} series={series} />
    </div>
  );
}
