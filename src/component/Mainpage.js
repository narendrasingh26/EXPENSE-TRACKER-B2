import React, { useState, useEffect, useReducer } from "react";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./light-theme.css";
import "./dark-theme.css";

const initialState = {
  theme: "light",
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

const AddExpense = () => {
  const emailRegEx = localStorage.getItem("email");

  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [expenseId, setExpenseId] = useState("");
  const [showActivateButton, setShowActivateButton] = useState(false);
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowActivateButton(
      products.reduce(
        (total, product) => total + Number(product.moneySpent),
        0
      ) > 10000 && !isPremiumActivated
    );
  }, [products, isPremiumActivated]);

  const handleActivatePremium = () => {
    setIsPremiumActivated(true);
  };

  const handleToggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const handleDownloadFile = () => {
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(products);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => JSON.stringify(row[header])).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  };

  const fetchExpenses = () => {
    axios
      .get(
        `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${emailRegEx}.json`
      )
      .then((response) => {
        if (response.data) {
          const expenses = Object.entries(response.data).map(
            ([id, expense]) => ({
              id,
              ...expense,
            })
          );
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
      axios
        .put(
          `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${emailRegEx}/${expenseId}.json`,
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
      axios
        .post(
          `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${emailRegEx}.json`,
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
        `https://expense-tracker-c5ab0-default-rtdb.firebaseio.com/expenses/${emailRegEx}/${id}.json`
      )
      .then((response) => {
        console.log("Expense successfully deleted!");
        fetchExpenses();
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
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
    <div className={`app ${state.theme}`}>
      <h1
        style={{ textAlign: "center", fontFamily: "serif", fontWeight: "bold" }}
      >
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
                <option value="Dairy">Dairy</option>
                <option value="Grocery">Grocery</option>
                <option value="Furniture">Furniture</option>
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
                style={{
                  backgroundColor: "#98ecd2",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>Money Spent: {product.moneySpent}</p>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={() => handleExpenseDelete(product.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="info"
                    onClick={() => handleExpenseEdit(product.id)}
                  >
                    Edit
                  </Button>{" "}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No products added yet.</p>
        )}
        {showActivateButton && !isPremiumActivated && (
          <Button variant="primary" onClick={handleActivatePremium}>
            Activate Premium
          </Button>
        )}

        {isPremiumActivated && (
          <Button
            variant="secondary"
            onClick={handleToggleTheme}
            style={{ marginLeft: "1rem" }}
          >
            Toggle Theme
          </Button>
        )}

        <Button
          variant="success"
          onClick={handleDownloadFile}
          style={{ marginLeft: "1rem" }}
        >
          Download File
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
