import React, {Component} from 'react';
import { Card , CardImg, CardBody, CardText, CardTitle} from 'reactstrap';

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
                    <span>-- {comment.author}, {comment.date} </span>
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
        <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
        </div>
            
        );
    }
}

export default DishDetail;
