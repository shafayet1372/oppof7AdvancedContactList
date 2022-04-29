import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { ListGroup } from "react-bootstrap";
import style from "../../css/style.module.css";
export default function index({ contacts, search }) {
  if (search) {
    return null;
  }
  return (
    <ListGroup className={style.side_list_fix}>
      {contacts.map((x) => (
        <ListGroup.Item
          key={x[0].id}
          // style={{
          //   padding: "0px",
          //   margin: "0px",
          //   backgroundColor: "grey",
          //   textAlign: "center",
          // }}
          className={style.side_list_item_fix}
        >
          <Link
            to={x[0].id}
            spy={true}
            smooth={true}
            duration={1000}
            containerId="containerElement"
            style={{ textDecoration: "none", color: "white" }}
          >
            {x[0].groupName}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
