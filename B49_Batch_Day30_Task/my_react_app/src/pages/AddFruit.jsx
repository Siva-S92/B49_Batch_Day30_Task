import axios from "axios";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
 
function AddFruit() {
  const fruitName = useRef("");
  const quantity = useRef("");
  const price = useRef("");
  const imageUrl = useRef("");
 
  const navigate = useNavigate();
 
  const addFruitHandler = () => {
    var payload = {
      name: fruitName.current.value,
      quantity: quantity.current.value? Number(quantity.current.value):0,
      price: price.current.value ? Number(price.current.value): 0 ,
      imageUrl: imageUrl.current.value,
    };
    axios.post("https://64f1ad5d0e1e60602d241d25.mockapi.io/tasks", payload).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <legend>Create</legend>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={fruitName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQuanity">
          <Form.Label>Quantity(KG Units)</Form.Label>
          <Form.Control type="number" ref={quantity} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" ref={price} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImageUrl">
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control type="text" ref={imageUrl} />
        </Form.Group>
        <div className="text-center">
            <Button variant="primary" type="button" className="w-25" onClick={addFruitHandler}>
                Add to the bucket
            </Button>
        </div>
      </Form>
    </>
  );
}
export default AddFruit;