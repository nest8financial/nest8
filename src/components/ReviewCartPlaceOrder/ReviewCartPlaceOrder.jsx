import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Paper,
  FormGroup,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function ReviewCartPlaceOrder({ productNumber }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((store) => store.products.products);
  const newProductSelected = useSelector(
    (store) => store.products.newProductSelected
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCTS" });
  }, []);

  useEffect(() => {
    if (newProductSelected !== null) {
      setSelectedCheckbox(newProductSelected);
    }
  }, [newProductSelected]);

  const handleChange = (event) => {
    const { name } = event.target;
    setSelectedCheckbox(parseInt(name, 10));
  };

  const handlePlaceOrder = (event) => {
    dispatch({ type: "SET_NEW_PRODUCT_SELECTED", payload: selectedCheckbox });
    dispatch({
      type: "UPDATE_PRODUCT_SELECTED",
      payload: { productId: selectedCheckbox },
    });
    history.push("/order_confirmation");
  };

  return (
    <Container style={{ paddingTop: "100px" }}>
      <Paper
        elevation={10}
        sx={{ p: 3, mt: 2, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" textAlign="center">
          Review Cart and Place Order
        </Typography>
        <FormGroup
          sx={{ p: 1, mt: 1, display: "flex", flexDirection: "column" }}
        >
          {products.map((product) => (
            <FormControlLabel
              sx={{ mx: 8 }}
              key={product.id}
              control={
                <Checkbox
                  checked={selectedCheckbox === product.id}
                  onChange={handleChange}
                  name={String(product.id)}
                />
              }
              label={
                <>
                  {product.name}
                  <Typography
                    component="span"
                    sx={{ textDecoration: "line-through", mx: 1 }}
                  >
                    : ${product.promo_price}
                  </Typography>
                  ${product.price}
                </>
              }
            />
          ))}
        </FormGroup>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Your subscription will renew automatically upon the expiration of the
          30-day trial. You can cancel anytime effective from the next cycle.
        </Typography>
        <Button
          sx={{ width: "auto", mt: 6, alignSelf: "center" }}
          variant="contained"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Container>
  );
}


export default ReviewCartPlaceOrder;
