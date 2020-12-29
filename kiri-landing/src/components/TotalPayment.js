import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants';
import { useHistory } from "react-router-dom";



export default class TotalPayment extends Component {
  sumbitTotalPayment = (totalPayment) => {
      const bill = {
          bill_price: totalPayment,
          bill_menu: JSON.parse(sessionStorage.getItem('cart')),
      }

      axios
      .post(API_URL + "bills", bill)
      .then((res) => {
        this.props.history.push({
          pathname: '/success',
          state: {carts : []},
        });
      });
  };

  render() {
    const totalPayment = this.props.carts.reduce(function (result, item) {
      return result + item.cart_price;
    }, 0);

    return (
      <>
      {/* Web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Price :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalPayment)}
              </strong>
            </h4>
            <Button
              variant="primary"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.sumbitTotalPayment(totalPayment)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>CHECKOUT!</strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Mobile  */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Price :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalPayment)}
              </strong>
            </h4>
            <Button
              variant="primary"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.sumbitTotalPayment(totalPayment)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>CHECKOUT!</strong>
            </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
