import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
//import { DISHES } from '../shared/dishes';
import './DishdetailComponent';
import { Link } from 'react-router-dom';

class Menu extends Component {


    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card key={dish.id} >
                        <Link to={`/menu/${dish.id}`}>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay body className='ml-5'>
                                <CardTitle heading>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                        </div>
                </div>
                <div className="row">
                    {menu}
                </div>



            </div>
        );
    }
}

export default Menu;