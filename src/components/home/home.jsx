import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { UserContext } from "../../contexts/user-context/user-context";
import { useContext} from "react";
import { LocationContext } from "../../contexts/location-context/location-context";
import LoginScreen from "../login-component/login-component";
import { useEffect , useState} from "react";
import StackedChart from "../stacked-chart/stacked-chart";
const Home = () => {
  const { user } = useContext(UserContext);
  const [cleaningList, setCleaningList] = useState([]);
  const { store } = useContext(LocationContext);
  useEffect(() => {
    let _cleaningList = [];
    let thisWeek = new Date();

    thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
    for (var i = 0; i < store.length; i++) {
      let nextDate = new Date(store[i].last_clean);
      nextDate.setDate(nextDate.getDate() + store[i].frequency * 7);
      nextDate.setDate(nextDate.getDate() - nextDate.getDay());
      if (nextDate.toLocaleDateString() === thisWeek.toLocaleDateString()) {
        _cleaningList.push({ location: store[i], isOverDue: false });
      } else if (nextDate < thisWeek) {
        _cleaningList.push({ location: store[i], isOverDue: true });
      } else {
        //  console.log(nextDate.toLocaleDateString() +' -- '+ thisWeek.toLocaleDateString());
      }
    }
    setCleaningList(_cleaningList);
  }, [store]);
  if (user.hash !== undefined) {
    // console.log(_cleaningList + ' ' + selectedWeek.toLocaleDateString())

    return (
      <Container className="pb-5">
        <Row>
          <Col>
            <Card className="mt-5">
              <Card.Header>This Weeks Cleaning - All</Card.Header>
              <Card.Body>
                <Card.Title>Including Overdue</Card.Title>
                <h1>{cleaningList.length}</h1>
                <Card.Text>Bays</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-5">
              <Card.Header>This Weeks Cleaning - Scheduled</Card.Header>
              <Card.Body>
                <Card.Title>Excluding Overdue</Card.Title>
                <h1>{cleaningList.filter((item) => !item.isOverDue).length}</h1>
                <Card.Text>Bays</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-5">
              <Card.Header>Overdue Cleaning</Card.Header>
              <Card.Body>
                <Card.Title>Excluding this week</Card.Title>
                <h1>{cleaningList.filter((item) => item.isOverDue).length}</h1>
                <Card.Text>Bays</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <StackedChart cleaning={cleaningList} store={store}/>
        <Card className="mt-5">
          <Card.Header>Whats New?</Card.Header>
          <Card.Body>
            <Card.Title>New Cleaning Admin App</Card.Title>
            <Card.Text>
              Designed to simplify the tracking and planning of the stores
              cleaning activities.
            </Card.Text>
          </Card.Body>
        </Card>
        <Row>
          <Col>
            <Card className="mt-5">
              <Card.Header>Features</Card.Header>
              <Card.Body>
                <Card.Title>Automatic Scheduling</Card.Title>
                <Card.Text>
                  Automatically plans future cleaning based on previous cleaning
                  activity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-5">
              <Card.Header>Features</Card.Header>
              <Card.Body>
                <Card.Title>Tracking and reporting</Card.Title>
                <Card.Text>
                  Tracks outstanding and overdue planned cleaning activities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-5">
              <Card.Header>Features</Card.Header>
              <Card.Body>
                <Card.Title>Print legal documentation</Card.Title>
                <Card.Text>
                  Creates printable WAHS documents for signing and archiving.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <LoginScreen />;
  }
};
export default Home;
