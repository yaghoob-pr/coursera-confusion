import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5">
      <CardImg width="100%" src={dish.image} />
      <CardTitle color="primary">{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
    </div>
  );
}

function RenderComments(props) {
  const comments = props.comments.map((comment) => {
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
      {comments}
    </div>
  );
}

function DishDetail(props) {
  let dish = props.dish;
  if (dish != null) {
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
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }

  return <div>Please select a dish</div>;
}
export default DishDetail;
