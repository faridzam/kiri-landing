import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const CartModal = ({
  showModal,
  handleClose,
  cartDetail,
  quantity,
  note,
  increaseAmount,
  decreaseAmount,
  changeHandler,
  handleSubmit,
  totalCharge,
  deleteOrder
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.product_name}{" "}
            <strong>
              (Rp. {numberWithCommas(cartDetail.product_price)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Charge :</Form.Label>
              <p>
                <strong>
                  Rp. {numberWithCommas(totalCharge)}
                </strong>
              </p>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>quantity :</Form.Label>
              <br />
              <Button variant="primary" size="sm" className="mr-2" onClick={ () => decreaseAmount()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>

              <strong>{quantity}</strong>
              
              <Button variant="primary" size="sm" className="ml-2" onClick={ () => increaseAmount()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>note :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="note"
                placeholder="Contoh : Pedes, Nasi Setengah"
                value={note}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
                Simpan
            </Button>   
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteOrder(cartDetail.product_id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default CartModal;