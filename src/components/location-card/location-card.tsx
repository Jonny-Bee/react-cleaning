import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateLocation } from "../../IO/DataIO";
import { location, LocationContext } from "../../contexts/location-context/location-context";
import { UserContext } from "../../contexts/user-context/user-context";
import Form from "react-bootstrap/Form";


interface ILocationCardProps{
  count:number,
  location:location
}

const LocationCard = ({count, location}: ILocationCardProps) => {
  const bgClass = count % 2 === 1 ? "p_odd_row" : "";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cUpdateLocation } = useContext(LocationContext);
  const { user } = useContext(UserContext);
  const tLocation = { ...location };
  let overdue = false;

  const myDate = new Date(location.last_clean);
  let nextDate = new Date(location.last_clean);
  let today = new Date();
  today.setDate(today.getDate() - today.getDay());
  nextDate.setDate(nextDate.getDate() + location.frequency * 7);
  //nextDate.setDate(nextDate.getDate() - nextDate.getDay());
  if (nextDate < today) {
    overdue = true;
  }
  const getHighlight = overdue ? "p_warn" : "";
  const overText = overdue ? " - OVERDUE" : "";

  const handleChangeDate = (event:React.ChangeEvent<HTMLInputElement>) => {
    tLocation.last_clean = new Date(event.target.value)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    cUpdateLocation(tLocation);
    updateLocation({
      bay_id: tLocation.bay_id.toString(),
      field: "last_clean",
      value: tLocation.last_clean,
      ...user,
    });
  };

  return (
    <>
      <tr className={bgClass} onClick={handleShow}>
        <td className="p_cell p_bold">
          {location.group_name.toUpperCase()}
        </td>
        <td className="p_cell">{location.bay}</td>
        <td className="p_cell">{myDate.toLocaleDateString()}</td>
        <td className={"p_cell " + getHighlight}>
          {nextDate.toLocaleDateString() + overText}
        </td>
      </tr>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {location.group_name} - Last Cleaned Date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="lc">
            <Form.Label>Select Last Cleaned Date</Form.Label>
            <Form.Control
              type="date"
              name="lc"
              placeholder="Last Cleaned"
              onChange={handleChangeDate}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LocationCard;
