import React from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import CartModal from "./CartModal";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import TotalPayment from "./TotalPayment";

class Carts extends React.Component{

    constructor(props){
        super(props);

        this.state={
            showModal:false,
            cartDetail: false,
            quantity: 0,
            note: "",
            totalCharge: 0,
        };
    }

    handleShow = (cartMenu) =>{
        this.setState({
            showModal: true,
            cartDetail: cartMenu,
            quantity: cartMenu.cart_quantity,
            note: cartMenu.cart_note,
            totalCharge: cartMenu.cart_price,
        });
    };

    handleClose = () => {
        this.setState({
          showModal: false,
        });
    };

    increaseAmount = () => {
        this.setState({
          quantity: this.state.quantity + 1,
          totalCharge:
            this.state.cartDetail.product_price * (this.state.quantity + 1),
        });
      };
    
      decreaseAmount = () => {
        if (this.state.quantity !== 1) {
          this.setState({
            quantity: this.state.quantity - 1,
            totalCharge:
              this.state.cartDetail.product_price * (this.state.quantity - 1),
          });
        }
      };
    
      changeHandler = (event) => {
        this.setState({
          note: event.target.value,
        });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
    
        this.handleClose();
    
        const data = {
          cart_quantity : this.state.quantity,
          cart_price : this.state.totalCharge,
          product_name : this.state.cartDetail.product_name,
          product_id : this.state.cartDetail.product_id,
          product_price : this.state.cartDetail.product_price,
          cart_note : this.state.note,
        };

        let cart = [...this.props.carts];
        let index = cart.findIndex(el => cart.product_id = data.product_id);
        cart[index] = data;
        sessionStorage.setItem("cart", JSON.stringify(cart));
        this.setState({carts : cart})
        // axios
        //   .put(API_URL + "carts/" + this.state.cartDetail.product_id, data)
        //   .then((res) => {
        //     swal({
        //       title: "Update Cart!",
        //       text: "Renew Your " + data.product_name,
        //       icon: "success",
        //       button: false,
        //       timer: 1500,
        //     });
        //   })
        //   .catch((error) => {
        //     console.log("Error yaa ", error);
        //   });
      };
    
      deleteOrder = (product_id) => {
        this.handleClose();
    
        axios
          .delete(API_URL + "carts/" + product_id)
          .then((res) => {
            swal({
              title: "Delete Order!",
              text:
                "Deleting Your " + this.state.cartDetail.product_name,
              icon: "error",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      };

    render(){
        const{carts} = this.props;
        return(
            <Col md={3} className="mt-3">
                <h4>
                    <strong>Carts :</strong>
                </h4>
                <hr/>
                {carts.length !== 0 && (
                    <Card className="overflow-auto carts">
                        <ListGroup variant="flush">
                            {carts.map((cartMenu) =>(
                                <ListGroup.Item
                                key={cartMenu.product_name}
                                onClick={() => this.handleShow(cartMenu)}
                        >
                            <Row>
                                <Col xs={2}>
                                    <h4>
                                        <Badge pill variant="succeess">
                                            {cartMenu.cart_quantity}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col>
                                    <h5>{cartMenu.product_name}</h5>
                                    <p>Rp. {numberWithCommas(cartMenu.product_price)}</p>
                                </Col>
                                <Col>
                                    <strong className="float-right">
                                        Rp.{numberWithCommas(cartMenu.cart_price)}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                            ))}

                            <CartModal
                              handleClose = {this.handleClose}
                              {...this.state}
                              increaseAmount={this.increaseAmount}
                              decreaseAmount={this.decreaseAmount}
                              changeHandler = {this.changeHandler}
                              handleSubmit = {this.handleSubmit}
                              deleteOrder = {this.deleteOrder}
                            />
                        </ListGroup>
                    </Card>
                )}
            </Col>
        )
    }
}

export default Carts;