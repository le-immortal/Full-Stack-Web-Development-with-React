import React, {Component} from 'react';
import { Card , CardImg, CardBody, CardText, CardTitle,BreadcrumbItem, Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';

class DishDetail extends Component{
    constructor(props){
        super(props)

        this.state ={
            
        }
    }

    renderDish(){
        if(this.props.dish == null){
            return (<div></div>);
        }
        else{

            return(
                <Card >   
                <CardImg width="100%" src={this.props.dish.image} alt= {this.props.dish.name}/>
                <CardBody>
                <CardTitle heading>{this.props.dish.name}</CardTitle>
                <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
        }
    }
    renderComments(comments){
        if(comments!= null){
            const comment = comments.map(comment => {
                return(
                    <ul>
                    {comment.comment}
                    <br/>
                    <span>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </span>
                </ul>
            );
        });
        return(
            <div>
            <h4>
                Comments
            </h4>
            <li className="list-unstyled">
                {comment}
            </li>
            </div>
        );
    }
    else{
        return <div></div>
    }
    }

    render(){
        return(
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
                    {this.renderComments(this.props.comments)}
                </div>
        </div>
        </div>
            
        );
    }
}

export default DishDetail;
