import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Products = ({ product, addToCart }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => addToCart(product)}>
        <Card.Img
          variant="top"
          src={
            "assets/menu/default.png"
          }
        />
        <Card.Body>
          <Card.Title>{product.product_name} <strong>({product.product_code})</strong></Card.Title>
          <Card.Text>Rp. {numberWithCommas(product.product_price)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
