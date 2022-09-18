import React, { useContext } from "react";
import { CalenderContext, week } from "../../contexts/calender-context/calender-context";
import { updateWeek } from "../../IO/DataIO";
import { Card } from "react-bootstrap";
import "./calender-week.css";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../contexts/user-context/user-context";

interface ICalenderWeekProps{
  data:week
}
const CalenderWeek = ({data}:ICalenderWeekProps) => {
  const dataCopy = { ...data };
  const { cUpdateWeek } = useContext(CalenderContext);
  const { user } = useContext(UserContext);
  const bgclass =
    data.is_promo || data.is_seasonal ? " fullweek" : " normalweek";
  let myDate = new Date(data.start_date);
  let promoCheck = dataCopy.is_promo ;
  let seasonCheck = dataCopy.is_seasonal;

  const handlePromoChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dataCopy.is_promo = event.target.checked ;
    cUpdateWeek(dataCopy);
    updateWeek(
      { id: dataCopy.id.toString(), field: "is_promo", value: dataCopy.is_promo.toString(), ...user },
      (e) => {} // add error handling
    );
  };

  const handleSeasonalChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dataCopy.is_seasonal = event.target.checked;
    cUpdateWeek(dataCopy);
    updateWeek(
      {
        id: dataCopy.id.toString(),
        field: "is_seasonal",
        value: dataCopy.is_seasonal.toString(),
        ...user,
      },
      (e) => {} // add error handling
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
