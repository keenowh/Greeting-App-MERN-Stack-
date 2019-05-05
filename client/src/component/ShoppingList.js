import React, { Component } from 'react';
import {Container, ListGroup, Button, Card, CardBody, CardHeader, CardText} from 'reactstrap';
import { CSSTransition, TransitionGroup} from'react-transition-group'
import {connect} from 'react-redux'; 
import {getItems, addItems, deleteItems} from '../actions/ItemActions';
import PropTypes from 'prop-types'; 


class ShoppingList extends Component {
  
  componentDidMount() {
    this.props.getItems();
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuth: PropTypes.bool,
    auth: PropTypes.object.isRequired
  }

  onDeleteClick = (id) => {
    this.props.deleteItems(id)
  }

  render() {
    const { items } = this.props.item;
    const { user } = this.props.auth;
    
    return (
      <Container>
        
           <ListGroup>
             <TransitionGroup className="shopping-list">
                {items.map(({ _id, name, title }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <Card className="change"style={{marginTop: "10px"}}>
                      <CardBody>
                        <CardHeader>From: <strong>{title}</strong></CardHeader>
                        <br></br>
                        <CardText>Message: {name}</CardText>
                        {this.props.isAuth ? <Button 
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >Delete</Button> : null}
                      </CardBody>
                    </Card>
                  </CSSTransition>
                ))}
             </TransitionGroup>
           </ListGroup>
      </Container>
    )
  }
}



const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
  isAuth: state.auth.isAuth
})
export default connect(
  mapStateToProps,
  { getItems, deleteItems}
)(ShoppingList);
