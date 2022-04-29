import React, { useState } from "react";
import { ModalView, FormController } from "../index";
import { IoMdAddCircle } from "../../js/icons";
import style from "../../css/style.module.css";

export default function Index() {
  let [showModal, setShowModal] = useState(false);
  let showModalHandler = () => setShowModal((p) => !p);
  return (
    <div>
      <IoMdAddCircle className={style.add_button} onClick={showModalHandler} />
      <ModalView
        show={showModal}
        handleClose={showModalHandler}
        title="add contact"
      >
        <FormController handleClose={showModalHandler} mode="create" />
      </ModalView>
    </div>
  );
}
