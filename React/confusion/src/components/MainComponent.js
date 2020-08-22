import React, { Component } from 'react';
import Menu  from './MenuComponent';
import Contact from './ContactComponent';
import  AboutUs from "./AboutComponent";
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state =>{
 return{
   dishes: state.dishes,
   comments: state.comments,
   promotions: state.promotions,
   leaders: state.leaders
 }   
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{ dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: ()=> dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }
 
  render (){
    const HomePage = ()=>{
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
            dishLoading = {this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}    
            leader={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
            leadersLoading = {this.props.leaders.isLoading}
            leadersErrMess = {this.props.leaders.errMess}
            />
        );
      };

    const DishWithId =({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      );
    }
  return(  
    <div >
      <Header/>
      <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />}/>
          <Route path ="/aboutus" component={()=><AboutUs leaders={this.props.leaders} />}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component={()=><Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Redirect to="/home" />
          </Switch>
            </CSSTransition>
          </TransitionGroup>
      <Footer/>
    </div>
  )};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
