import { Card } from "react-bootstrap";
import { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateLayout } from "../../IO/DataIO";
import { layout, LayoutContext } from "../../contexts/layout-context/layout-context";
import { UserContext } from "../../contexts/user-context/user-context";
import Form from "react-bootstrap/Form";

interface ILayoutCardProps{
  layout:layout,
  count:number,
}

const LayoutCard = ({layout, count}:ILayoutCardProps) => {
  const bgClass = count % 2 === 0 ? "grey" : "";
  const [show, setShow] = useState(false);
  const { cUpdateLayout } = useContext(LayoutContext);
  const tLayout = { ...layout };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const weeks = [4, 6, 8, 16, 26, 52];
  const { user } = useContext(UserContext);

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    tLayout.frequency = parseInt(event.target.value);
  };

  const handleSave = () => {
    updateLayout({
      id: tLayout.id.toString(),
      field: "frequency",
      value: tLayout.frequency.toString(),
      ...user,
    });
    cUpdateLayout(tLayout);
  };

  return (
    <>
      <Card className="highlight" onClick={handleShow}>
        <Card.Body className={bgClass}>
          <Row  xs={3}>
            <Col xs={2}>
              {layout.id}{" "}
            </Col>
            <Col xs={7}>
              {layout.group_name.toUpperCase()}
            </Col>
            <Col xs={3} className="rightAlign">
              {layout.frequency} Weeks
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Layout Frequency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Select size="sm" aria-label="Section" onChange={handleChange}>
              {weeks.map((week) => (
                <option value={week}>{week} weeks</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LayoutCard;
