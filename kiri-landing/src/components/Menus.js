import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          // src={
          //   "assets/images/" +
          //   menu.categories.category_name.toLowerCase() +
          //   "/" +
          //   menu.gambars
          // }
        />
        <Card.Body>
          <Card.Title>{menu.product_name} <strong>({menu.product_code})</strong></Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.product_price)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
