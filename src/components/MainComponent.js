import Menu from "./MenuComponent";
import { Component } from "react";
import Home from "./HomeComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactusComponent";
import About from './AboutComponent'
import {connect} from 'react-redux'
import { postComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreators";
import {actions} from 'react-redux-form'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }  
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});


class Main extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    console.log(this.props)
    const HomePage = () => {
      return (
        <div>
          {console.log(this.props)}
          <Home
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishErrMess={this.props.dishes.errMess}
            promotion={
              this.props.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        </div>
      );
    };


    const DishWithId = ({match})=>{
      return (
        <div className="container">
          <DishDetail
            dish={
              this.props.dishes.dishes.filter(
                (dish) => dish.id === parseInt(match.params.dishId, 10)
              )[0]
            }
            isLoading={this.props.dishes.isLoading}
            ErrMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === parseInt(match.params.dishId, 10)
            )}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
        </div>
      );
    }


    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
                )}
              />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
