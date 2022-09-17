import Container from "react-bootstrap/Container";
import { LocationContext } from "../../contexts/location-context/location-context";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import LocationCard from "../location-card/location-card";
import Button from "react-bootstrap/esm/Button";
import { iFramePrinter } from "../../utils/print-helper";
import Modal from "react-bootstrap/Modal";
import { LayoutContext } from "../../contexts/layout-context/layout-context";
import { Row, Col } from "react-bootstrap";

const LocationView = () => {
  const { locations, setSection, addLocation, section } =
    useContext(LocationContext);
  const { layouts, setGroup } = useContext(LayoutContext);

  const handleSectionChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) return;
    setSection(event.target.value);
    setGroup(event.target.value);
  };

  const handlePrint = () => {
    iFramePrinter("printable");
  };

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    const layoutSelector = document.getElementById("layoutSelect") as HTMLSelectElement | null;
    const dateSelector = document.getElementById("dateSelect") as HTMLSelectElement | null;
    let selectedLayout = layoutSelector!.value || '';
    let selectedDate = dateSelector!.value || '';
    let formattedDate = new Date(selectedDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
   
    addLocation( parseInt(selectedLayout),formattedDate );
  };

  return (
    <>
      <Container fluid className="mb-5">
        <h2>Locations</h2>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3">
              <Form.Select
                size="sm"
                aria-label="Section"
                onChange={handleSectionChange}
                value={section}
              >
                <option>Select layout group</option>
                <option value="Ambient">Ambient</option>
                <option value="Chilled">Chilled</option>
                <option value="Frozen">Frozen</option>
                <option value="BWS">BWS</option>
                <option value="BreadandCakes">Bread and Cakes</option>
                <option value="FRV">Fruit and Veg</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Button hidden variant="primary" onClick={handlePrint}>
              {" "}
              print{" "}
            </Button>
            <Button size="sm" variant="danger" onClick={handleShow}>
              {" "}
              Add Locations
            </Button>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mb-5" id="printable">
        <table cellPadding="0" cellSpacing="0" className="p_row_interactive">
          <thead>
            <tr className="p_heading">
              <th>Layout</th>
              <th>Bay</th>
              <th>Last Cleaned</th>
              <th>Next Clean</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, count) => (
              <LocationCard key={count} location={location} count={count} />
            ))}
          </tbody>
        </table>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Cleaning Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="layoutSelect">
            <Form.Label>Select Layout Group</Form.Label>
            <Form.Select>
              {layouts.map((layout) => (
                <option key={layout.id} value={layout.id}>
                  {layout.id} - {layout.group_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="dateSelect">
            <Form.Label>Last Cleaned Date (optional)</Form.Label>
            <Form.Control
              type="date"
              name="lc"
              placeholder="Last Cleaned"
              defaultValue="2021-01-01"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LocationView;
