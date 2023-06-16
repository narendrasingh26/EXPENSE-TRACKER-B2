import React, { useState } from "react";
import { Form, Button, ListGroup, Row, Col} from "react-bootstrap";

const AddExpense = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);

  const handleMoneySpentChange = (event) => {
    setMoneySpent(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: Math.random().toString(),
      moneySpent,
      description,
      category,
    };

    setMoneySpent("");
    setDescription("");
    setCategory("");

    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    // <Container fluid className="w-100">

    
    <div   style={{
      backgroundImage: "url(cart.avif)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      padding:'1rem'
    }}>
      <h1 style={{textAlign:'center',fontFamily:'serif',fontWeight:'bold'}}> Daily Expense</h1><br></br>
      <Form onSubmit={handleExpenseSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Money Spent:</Form.Label>
              <Form.Control
                type="number"
                value={moneySpent}
                onChange={handleMoneySpentChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row><br></br>
        <Button type="submit" style={{marginLeft:'30rem'}}>Add Expense</Button>
      </Form>

      <div>
        <h3>Products:</h3>
        {products.length > 0 ? (
          <ListGroup >
            {products.map((product) => (
              <ListGroup.Item key={product.id} style={{backgroundColor:'#98ecd2'}}>
                <p>Money Spent: {product.moneySpent}</p>
                <p>Description: {product.description}</p>
                <p>Category: {product.category}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
    // </Container>
  );
};

export default AddExpense;
