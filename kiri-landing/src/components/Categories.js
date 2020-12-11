import React from 'react';
import axios from 'axios';
import {API_URL} from '../utils/constants';
import {Col, ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBreadSlice,
    faGlassWhiskey,
    faMugHot,
    faUtensils,
    
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
    if (nama === "coffee")
        return <FontAwesomeIcon icon={faMugHot} className="mr-2" />;
    if (nama === "non-coffee") 
        return <FontAwesomeIcon icon={faGlassWhiskey} className="mr-2"/>;
    if (nama === "heavy meals")
        return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama === "snacks")
        return <FontAwesomeIcon icon={faBreadSlice} className="mr-2" />;
  
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  };

class Categories extends React.Component{
    constructor(props){
        super(props);
        
        this.state ={
            categories: [],
        };
    }

    componentDidMount(){
        axios
            .get(API_URL + "categories")
            .then((res)=>{
                const categories = res.data;
                this.setState({categories});
            })
            .catch((error) =>{
                console.log("error", error);
            });
    }

    render(){
        const {categories} = this.state;
        const {changeCategory, choosenCategory} = this.props;
        return(
            <Col md={3} className="mt-3">
                <h4>
                    <strong>
                        Categories :
                    </strong>
                </h4>
                <ListGroup>
                    {categories && categories.map((category) =>(
                        <ListGroup.Item
                            key={category.category_id}
                            onClick={() => changeCategory(category.category_name)}
                            className={choosenCategory === category.category_name && "active-category"}
                            style={{cursor: 'pointer'}}
                        >
                            <h5>
                                <Icon nama={category.category_name}/>
                                {category.category_name}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        );
    }
}

export default Categories;