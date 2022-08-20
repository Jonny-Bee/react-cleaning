import { useContext } from "react";
import { CalenderContext } from "../../contexts/calender-context/calender-context";
import { updateWeek } from "../../IO/DataIO";
import { Card } from "react-bootstrap";
import "./calender-week.css";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../contexts/user-context/user-context";

const CalenderWeek = (props) => {
  const dataCopy = { ...props.data };
  const { cUpdateWeek } = useContext(CalenderContext);
  const { user } = useContext(UserContext);
  const bgclass =
    props.data.is_promo || props.data.is_seasonal ? " fullweek" : " normalweek";
  let myDate = new Date(props.data.start_date);
  let promoCheck = dataCopy.is_promo === 1 ? true : false;
  let seasonCheck = dataCopy.is_seasonal === 1 ? true : false;
  const handlePromoChange = (event) => {
    dataCopy.is_promo = event.target.checked ? 1 : 0;
    cUpdateWeek(dataCopy);
    updateWeek(
      { id: dataCopy.id, field: "is_promo", value: dataCopy.is_promo, ...user },
      (e) => {}
    );
  };
  const handleSeasonalChange = (event) => {
    dataCopy.is_seasonal = event.target.checked ? 1 : 0;
    cUpdateWeek(dataCopy);
    updateWeek(
      {
        id: dataCopy.id,
        field: "is_seasonal",
        value: dataCopy.is_seasonal,
        ...user,
      },
      (e) => {}
    );
  };
  return (
    <Card className={bgclass}>
      <Card.Header as="h6" className="rightAlign">
        {myDate.toLocaleString("default", { weekday: "long" })}{" "}
        {myDate.toLocaleDateString()}
      </Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Promo Change Over"
            onChange={handlePromoChange}
            defaultChecked={promoCheck}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Seasonal Week"
            onChange={handleSeasonalChange}
            defaultChecked={seasonCheck}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default CalenderWeek;
