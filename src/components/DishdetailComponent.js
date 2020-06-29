import React, {Component} from 'react';
import {Card, CardImg, Button, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
            
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name} </CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
        </div> 
    );

}

function RenderComments({comments, addComment, dishId}){
    if(comments != null){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className="list-unstyled">
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <p> {comment.comment} </p>
                                <p> --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
                                     .format(new Date(Date.parse(comment.date)))} </p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm addComment={addComment} dishId={dishId} />
                
            </div>
        );
    }
    return(<div>  </div>);
    
}



class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={ isModalOpen: false};
        this.toggleModal =this.toggleModal.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

    }
    toggleModal (){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render(){

     
            return(
                    <div>
                        <Button outline onClick={this.toggleModal}> <span className="fa fa-edit fa-lg"></span> Submit comment</Button>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>
                                Comment
                            </ModalHeader>
                            <ModalBody>
                              <LocalForm onSubmit= {values => this.handleSubmit(values)}>
                            
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="rating" > Rating</Label>
                                        <Control.select model=".rating" name="rating" 
                                            className="form-control"  >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                        </Control.select>
                                    </Col>
        
                                </Row>

                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="lastname" >Your Name</Label>
                                    
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators = {{ required, minLength: minLength(3),
                                                maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".yourname" show="touched"
                                            messages={{required: 'Required', minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 15 characters'}} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="message" > Comment</Label>
                                
                                        <Control.textarea model=".message" id="message" name="message"
                                        rows="6" className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col >
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
  

function DishDetail(props) {

    if(props.dish != null){
        return (
            <div className="container">
                         <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to="/menu"> Menu </Link></BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment} dishId={props.dish.id}
                            />
                    </div>
                    </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }


}


export default DishDetail;