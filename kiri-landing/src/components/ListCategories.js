import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faGlassCheers,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ category_icon }) => {
  if (category_icon === "heavy meals")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (category_icon === "coffee") return <FontAwesomeIcon icon={faCoffee} />;
  if (category_icon === "non-coffee") return <FontAwesomeIcon icon={faGlassCheers} />;
  if (category_icon === "snacks")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.category_id}
                onClick={() => changeCategory(category.category_name)}
                className={categoriYangDipilih === category.category_name && "category-aktif"}
                style={{cursor: 'pointer'}}
              >
                <h5>
                  <Icon category_icon={category.category_name} /> {category.category_name}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
