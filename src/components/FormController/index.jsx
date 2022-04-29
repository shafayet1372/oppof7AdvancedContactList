import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import {
  BiUserCircle,
  BsFillTelephoneFill,
  AiOutlineHome,
  FaUserFriends,
} from "../../js/icons";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  db,
} from "../../js/firebaseconnection";
import style from "../../css/style.module.css";
import randomsColors from "../../js/randomcolors";

const initialValues = {
  name: "",
  number: "",
  home: "",
  relation: "",
};

export default function Index({
  handleClose,
  mode,
  contact,
  completeUpdatedHandler,
}) {
  let [values, setValues] = useState(initialValues);
  let collections = collection(db, "oppof7");

  useEffect(() => {
    if (contact?.id) {
      setValues((p) => ({ ...contact }));
    }
  }, [contact]);

  let getRandomColors = () => {
    let colors = randomsColors.slice();
    return colors[Math.floor(Math.random() * colors.length)];
  };

  let addContact = async () => {
    try {
      await addDoc(collections, { ...values, color: getRandomColors() });
      handleClose();
    } catch (e) {
      alert("error");
    }
  };

  let updateContact = async () => {
    let { id } = contact;
    let docRef = doc(collections, id);
    try {
      await updateDoc(docRef, values);
      handleClose();
      completeUpdatedHandler();
    } catch (e) {
      alert("error");
    }
  };

  let isDisabled = () => {
    if (Object.values(values).every((x) => !x)) {
      return true;
    }
    return false;
  };

  let changeHandler = (e) => {
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  let submitHandler = (e) => {
    e.preventDefault();
    if (mode == "create") {
      addContact();
      return null;
    }
    updateContact();
  };

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup className="mb-3 bg-dark ">
        <InputGroup.Text
          id="basic-addon1"
          className="bg-transparent text-white border  "
        >
          <BiUserCircle />
        </InputGroup.Text>
        <FormControl
          placeholder="name"
          aria-label="name"
          name="name"
          value={values.name}
          onChange={changeHandler}
          aria-describedby="basic-addon1"
          className={`bg-dark  text-white ${style.input_fix}`}
        />
      </InputGroup>
      <InputGroup className="mb-3 bg-dark ">
        <InputGroup.Text
          id="basic-addon1"
          className="bg-transparent text-white border "
        >
          <BsFillTelephoneFill />
        </InputGroup.Text>
        <FormControl
          placeholder="number"
          aria-label="number"
          name="number"
          value={values.number}
          onChange={changeHandler}
          aria-describedby="basic-addon1"
          className={`bg-dark  text-white ${style.input_fix}`}
        />
      </InputGroup>
      <InputGroup className="mb-3 bg-dark ">
        <InputGroup.Text
          id="basic-addon1"
          className="bg-transparent text-white border "
        >
          <AiOutlineHome />
        </InputGroup.Text>
        <FormControl
          placeholder="home"
          aria-label="home"
          name="home"
          value={values.home}
          onChange={changeHandler}
          aria-describedby="basic-addon1"
          className={`bg-dark  text-white ${style.input_fix}`}
        />
      </InputGroup>
      <InputGroup className="mb-3 bg-dark ">
        <InputGroup.Text
          id="basic-addon1"
          className="bg-transparent text-white border "
        >
          <FaUserFriends />
        </InputGroup.Text>
        <FormControl
          placeholder="relation"
          aria-label="relation"
          name="relation"
          value={values.relation}
          onChange={changeHandler}
          aria-describedby="basic-addon1"
          className={`bg-dark  text-white ${style.input_fix}`}
        />
      </InputGroup>

      <Button
        variant={mode == "create" ? "success" : "danger"}
        type="submit"
        disabled={isDisabled()}
      >
        {mode == "create" ? "Add" : "Update"}
      </Button>
    </Form>
  );
}
