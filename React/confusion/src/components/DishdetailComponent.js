import React, { Component } from 'react';
import { Row, Label, Col, Modal, ModalBody, ModalHeader, Card, CardImg, CardBody, Input, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}>
                    <span className=""></span>Submit
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}> Submit Comment </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={10}>Rating</Label>
                        <Col md={12}>
                            <Control.select model=".rating" id="rating" name="rating"
                                className="form-control" >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                            </Control.select>                            
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="name" md={10}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".author" id="name" name="name"
                                placeholder="Your Name" 
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} 
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 numbers',
                                    maxLength: 'Must be 15 numbers or less'
                                }}
                            />                            
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={10}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea rows="6" model=".comment" id="comment" name="comment" 
                                className="form-control"
                            />                            
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    renderDish() {
        if (this.props.dish == null) {
            return (<div></div>);
        }
        else {

            return (
                <Card >
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle heading>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
    }
    renderComments(comments, addComment, dishId) {
        if (comments != null) {
            const comment = comments.map(comment => {
                return (
                    <ul>
                        {comment.comment}
                        <br />
                        <span>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </span>
                    </ul>
                );
            });
            return (
                <div>
                    <h4>
                        Comments
            </h4>
                    <li className="list-unstyled">
                        {comment}
                    </li>
                    <CommentForm dishId = {dishId} addComment= {addComment }/>
                </div>
            );
        }
        else {
            return <div></div>
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        {/* <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem> */}
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1" >
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1 App">
                        {this.renderComments(this.props.comments, this.props.addComment, this.props.dish.id)}
                    </div>
                </div>
            </div>

        );
    }
}

export default DishDetail;
