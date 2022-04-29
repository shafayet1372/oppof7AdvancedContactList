import React from "react";
import { Modal } from "react-bootstrap";

import style from "../../css/style.module.css";
export default function index({ show, handleClose, children, title, mode }) {
  return (
    <Modal show={show} onHide={handleClose} className={style.modal_fix}>
      <Modal.Header closeButton className="border-0"></Modal.Header>
      <p className="text-success text-center d-block fw-bold"> {title}</p>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="border-0"></Modal.Footer>
    </Modal>
  );
}
