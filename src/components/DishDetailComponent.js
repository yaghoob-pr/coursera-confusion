import React from "react";
import {
  CardImg,
  CardText,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5">
      <CardImg width="100%" src={baseUrl + dish.image} />
      <CardTitle color="primary">{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
    </div>
  );
}

function RenderComments({ comments, dishId, addComment }) {
  const [isModalOpen, setModalOpen] = useState(false);

  function handleComment(values) {
    setModalOpen(!isModalOpen);
    addComment(dishId, values.rating, values.author, values.comment);
  }

  const resultComments = comments.map((comment) => {
    return (
      <div style={{ margin: "20px 0px" }} key={comment.id}>
        <div> {comment.comment}</div>
        <span style={{ marginRight: "10px" }}>{"~ " + comment.author}</span>
        <span>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
        </span>
      </div>
    );
  });
  return (
    <div className="col-12 col-md-5">
      <div className="h1">Comments</div>
      {resultComments}

      <div>
        <Button outline onClick={() => setModalOpen(!isModalOpen)}>
          <span className="fa fa-edit fa-lg"> </span> Submit Comment
        </Button>
        <Modal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)}>
          <ModalHeader>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => handleComment(values)}>
              <Row className="form-group">
                <Label className="mb-1" htmlFor="rate">
                  Rating
                </Label>
                <Control.select
                  model=".rate"
                  type="select"
                  name="rate"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group my-2">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Control.text
                  model=".author"
                  className="form-control"
                  id="author"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group my-3">
                <Label htmlFor="feedback  " md={12}>
                  Comment
                </Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </Row>
              <Row>
                <Button type="submit" vlaue="submit" color="primary">
                  {" "}
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

function DishDetail(props) {
  let dish = props.dish;

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (dish != null) {
    return (
      <div>
        <div className="row">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/Menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div ClassName="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  }

  return <div>Please select a dish</div>;
}
export default DishDetail;
