import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import storage from '../../utils/storage';
import uuid from 'uuid';

function Coordinate() {
  const storedCoordinates = storage.get('coordinates') || [];
  const [coordinates, setCoordinate] = useState(storedCoordinates);
  const [selectedCoordinate, setSelectedCoordinate] = useState();
  const [coordinateEntry, setCoordinateEntry] = useState({});

  function addCoordinate() {
    const { x, y } = coordinateEntry;
    const id = uuid.v4();
    coordinates.push({ id, x, y });
    setCoordinateEntry({});
    setCoordinate(coordinates);
  }

  function updateCoordinate() {
    const id = selectedCoordinate.id;
    if (!id) return;

    const coordinate = coordinates.find(c => c.id == id);
    coordinate.x = coordinateEntry.x;
    coordinate.y = coordinateEntry.y;
    setCoordinateEntry({});
    setSelectedCoordinate(null);
    setCoordinate(coordinates);
  }

  function removeCoordinate(coordinate) {
    return () => {
      console.log({ coordinate, coordinates });
      const newCoordinates = coordinates.filter(c => c.id !== coordinate.id);
      setCoordinate(newCoordinates);
    };
  }

  function handleSelectEdit(coordinate) {
    return () => {
      setSelectedCoordinate(coordinate);
      setCoordinateEntry(coordinate);
    };
  }

  useEffect(() => {
    if (coordinates) storage.set('coordinates', coordinates);
  });

  return (
    <div>
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="X Coordinate"
                value={coordinateEntry.x || ''}
                onChange={e => {
                  const v = e.target.value;
                  if (+v) {
                    setCoordinateEntry({ ...coordinateEntry, x: v });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Control
                value="Y Coordinate"
                value={coordinateEntry.y || ''}
                onChange={e => {
                  const v = e.target.value;
                  if (+v) {
                    setCoordinateEntry({ ...coordinateEntry, y: v });
                  }
                }}
              />
            </Col>
            <Col>
              {selectedCoordinate ? (
                [
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      updateCoordinate();
                    }}>
                    Update
                  </Button>,
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setSelectedCoordinate(null);
                      setCoordinateEntry({});
                    }}>
                    Cancel
                  </Button>
                ]
              ) : (
                <Button variant="primary" onClick={addCoordinate}>
                  Create
                </Button>
              )}
            </Col>
          </Form.Row>
        </Form>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>X</th>
              <th>Y</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.map((coordinate, i) => (
              <tr key={coordinate.id}>
                <td>{i}</td>
                <td>{coordinate.x}</td>
                <td>{coordinate.y}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={handleSelectEdit(coordinate)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={removeCoordinate(coordinate)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Coordinate;
