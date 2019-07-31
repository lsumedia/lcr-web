import React, { Component } from 'react';
import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';

export class AddShowModalForm extends Component {

  constructor(props){
   super(props);

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);

   this.state = {
     title: "",
     description: "",
     image: "",
     active: true
   }

  }

  handleSubmit(e){
    this.props.onSubmit(this.state, this.props.parent);
    e.preventDefault();
    this.props.onClose();
    this.clearInputs();
  }

  handleChange(e) {
    this.setState({ [e.target.id] : e.target.value});
  }

  validate(){
    const length = this.state.title.length;
    if (length >= 1) return 'success';
    else if (length < 1) return 'warning';
    return null;
  }

  clearInputs(){
    this.setState({ title : "", description : "", image : ""})
  }

  render() {

    if(!this.props.show) {
      return null;
    }

    const enableSaveButton = this.state.title.length > 0;

    return(
      <Modal show={true} onHide={this.props.onClose} backdrop="static" >
        <Modal.Header closeButton closeLabel="Close">
          <Modal.Title>Add Show</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="addShowForm" onSubmit={this.handleSubmit}>
            <FormGroup controlId="title" validationState={this.validate()}>
              <ControlLabel>Show Title</ControlLabel>
              <FormControl type="text" value={this.state.title} placeholder="Enter Show Name" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="description">
              <ControlLabel>Show Description</ControlLabel>
              <FormControl componentClass="textarea" value={this.state.description} placeholder="Enter Show Description" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup controlId="image">
              <ControlLabel>URL to Show Image</ControlLabel>
              <FormControl type="text" value={this.state.image} placeholder="Enter URL to Show Image" onChange={this.handleChange} />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button disabled={!enableSaveButton} type="submit" form="addShowForm">Save Show</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddShowModalForm;
