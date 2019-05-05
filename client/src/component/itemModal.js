import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItems } from '../actions/ItemActions';
import PropTypes from 'prop-types'

class ItemModal extends Component {
  state = {
    modal: false,
    title: '',
    name: '',
    
   }

   static propTypes = {
     isAuth: PropTypes.bool,
     auth: PropTypes.object.isRequired
   }

  toggle = () => {this.setState({
    modal : !this.state.modal
  })
};

onChange = (e) =>{
  this.setState({[e.target.name]: e.target.value});
}

onSubmit = (e) => {
  e.preventDefault();
  const { user } = this.props.auth;
  const newItem = {
    name: this.state.name,
    title: user.name
  }

  //Add item via addItem
  this.props.addItems(newItem);

  this.toggle();
}
  render() {
    
    return (
      <div>
        { this.props.isAuth ? 
        
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Add Message</Button> : <h4 className="mb-3 ml-4">Please login to send birthday messages</h4>}

        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Add your message</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              {/* <Input 
                type="text"
                name="title"
                id="item"
                placeholder="Enter your name"
                onChange={this.onChange}
              /> */}
              <Label for="item">Message</Label>
              <Input 
                type="textarea"
                name="name"
                id="item"
                placeholder="Add your message"
                onChange={this.onChange}
              />
              <Button
              color="dark"
              style={{marginTop: '2rem'}}
              block
              >Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {addItems})(ItemModal)

