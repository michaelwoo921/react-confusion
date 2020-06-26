import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {


    renderDish(dish){
        
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name} </CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
        );
       
    }

    renderComments(comments){
        return comments.map(comment => {
            return(
                <div>
                     <p> {comment.comment} </p>
                  <p> --{comment.author}, {comment.date} </p>
                </div>
            );
        });
    }
        
    

    render(){
        if(this.props.dish != null){
            return(
              <div className="row">
                  <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}  
                    </div>
                     <div className="col-12 col-md-5 m-1">
                        <h4> Comments </h4>
                        {this.renderComments(this.props.dish.comments)}  
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
}

export default DishDetail;