import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DynamicChart from './DynamicChart';
import storage from '../../utils/storage';

const options = ['linear', 'bubble', 'bar', 'area'];
function Chart(props) {
  const coordinates = storage.get('coordinates');
  const data = [...coordinates.map(c => [+c.x, +c.y])];
  const [chartType, setChartType] = useState(options[0]);

  function handleOnSelectChange(e) {
    setChartType(e.target.value);
  }

  console.log(data);
  return (
    <div>
      <div>
        <Form>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" onChange={handleOnSelectChange}>
              {options.map(o => (
                <option value={o}>{o}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>

      <DynamicChart coordinates={data} chartType={chartType} />
    </div>
  );
}

export default Chart;
