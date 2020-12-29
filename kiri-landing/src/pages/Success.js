import React, { Component } from "react";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Success extends Component {
  componentDidMount() {
    this.setState({carts: []});
    sessionStorage.clear();
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <h2>ORDER SUCCESS</h2>
        <p>Thanks For Supporting Us!</p>
        <Button variant="primary" as={Link} to="/">
          back
        </Button>
      </div>
    );
  }
}
