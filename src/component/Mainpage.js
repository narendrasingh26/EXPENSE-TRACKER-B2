import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddExpense = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [expenseId, setExpenseId] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses.json")
      .then((response) => {
        if (response.data) {
          const expenses = Object.entries(response.data).map(([id, expense]) => ({
            id,
            ...expense,
          }));
          setProducts(expenses);
        }
      })
      .catch((error) => {
        console.log("Error fetching expenses:", error);
      });
  };

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
      moneySpent,
      description,
      category,
    };

    setMoneySpent("");
    setDescription("");
    setCategory("");
    setExpenseId("");

    if (expenseId) {
      // Update existing expense
      axios
        .put(
          `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
          newProduct
        )
        .then((response) => {
          console.log("Expense successfully updated!");
          fetchExpenses();
        })
        .catch((error) => {
          console.log("Error updating expense:", error);
        });
    } else {
      // Add new expense
      axios
        .post(
          "https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses.json",
          newProduct
        )
        .then((response) => {
          console.log("Data saved successfully!");
          fetchExpenses();
        })
        .catch((error) => {
          console.log("Error saving data:", error);
        });
    }
  };

  const handleExpenseDelete = (id) => {
    axios
      .delete(
        `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        console.log("Expense successfully deleted!");
        fetchExpenses();
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting expense:", error);
      });
  };

  const handleExpenseEdit = (id) => {
    const editedExpense = products.find((product) => product.id === id);
    if (editedExpense) {
      setMoneySpent(editedExpense.moneySpent);
      setDescription(editedExpense.description);
      setCategory(editedExpense.category);
      setExpenseId(id);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(cart.avif)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center", fontFamily: "serif", fontWeight: "bold" }}>
        Daily Expense
      </h1>
      <br />
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
        </Row>
        <br />
        <Button type="submit" style={{ marginLeft: "30rem" }}>
          {expenseId ? "Update Expense" : "Add Expense"}
        </Button>
      </Form>

      <div>
        <h3>Products:</h3>
        {products.length > 0 ? (
          <ListGroup>
            {products.map((product) => (
              <ListGroup.Item
                key={product.id}
                style={{ backgroundColor: "#98ecd2", display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <p>Money Spent: {product.moneySpent}</p>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                </div>
                <div>
                  <Button variant="danger" onClick={() => handleExpenseDelete(product.id)}>
                    Delete
                  </Button>{" "}
                  <Button variant="info" onClick={() => handleExpenseEdit(product.id)}>
                    Edit
                  </Button>{" "}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
