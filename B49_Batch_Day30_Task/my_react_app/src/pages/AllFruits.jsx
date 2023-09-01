import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
 
function AllFruits() {
  const [allFruits, setAllFruits] = useState([]);
  const navigate = useNavigate();
 
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
 
  useEffect(() => {
    axios.get("https://64f1ad5d0e1e60602d241d25.mockapi.io/tasks").then((response) => {
      setAllFruits(response.data);
    });
  }, []);
 
  const openConfirmDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
 
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };
 
  const confirmDeleteHandler = () => {
    axios
      .delete(`https://64f1ad5d0e1e60602d241d25.mockapi.io/tasks/${itemToDeleteId}`)
      .then((response) => {
        setAllFruits((previousState) => {
          return previousState.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
        setShowModal(false);
      });
  };
 
  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Row className="mt-2">
        <Col className="text-center mb-2">
          <Button variant="none" onClick={() => navigate("/add-fruit")} className="btn btn-outline-primary px-4">
            Add New Fruits In To My Bucket
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-2">
        {allFruits.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img
                variant="top"
                src={item.imageUrl}
                style={{ height: 300 }}
              />
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity(KG Units) - {item.quantity}</Card.Text>
                <Card.Text>Price - {item.price}</Card.Text>
                <Button
                  variant="none"
                  className="btn btn-outline-info btn-sm px-3 mx-1"
                  onClick={() => navigate(`/update-fruit/${item.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="none"
                  className="btn btn-outline-danger btn-sm px-2 mx-1"
                  onClick={() =>{openConfirmDeleteModalHandler(item.id)}}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default AllFruits;