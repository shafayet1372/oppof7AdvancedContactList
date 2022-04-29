import React, { useState } from "react";
import { FormController, ModalView } from "../index";
import { ListGroup, Button } from "react-bootstrap";
import { deepClone, uuidv4 } from "../../js/packages";
import { collection, deleteDoc, doc, db } from "../../js/firebaseconnection";
import { Element, animateScroll as scroll } from "react-scroll";
import { AiFillDelete, AiOutlineContacts, AiOutlineEdit } from "../../js/icons";
import { getRegexifiedValueToString } from "../../js/customfunctions";
import style from "../../css/style.module.css";

export default function Index({ contacts, search }) {
  let [editedValues, setEditedValues] = useState({});
  let [showModal, setShowModal] = useState(false);
  let [deleteId, setDeleteId] = useState(null);

  let editHandler = (value) => {
    if (search) {
      value = getRegexifiedValueToString(deepClone(value));
    }
    setEditedValues((p) => value);

    showModalHandler();
  };

  let completeUpdatedHandler = () => {
    setEditedValues({});
  };

  let deleteHandler = (id) => {
    setDeleteId(id);
    showModalHandler();
  };

  let showModalHandler = () => setShowModal((p) => !p);

  let closeHandler = () => {
    showModalHandler();
    setDeleteId(null);
  };

  let deleteContact = async () => {
    let docRef = doc(collection(db, "oppof7"), deleteId);
    try {
      await deleteDoc(docRef);
      showModalHandler();
      setDeleteId(null);
    } catch (e) {}
  };

  let resultsFoundBySearch = () => {
    return contacts.map((x) => x[1]).flat(Infinity).length;
  };

  if (!contacts.length) {
    return <p className="text-white">No results Found</p>;
  }

  // let getRegexifiedValueToString = (data) => {
  //   let searchedType = typeof data.name == "string" ? "number" : "name";
  //   // let v = data[searchedType];

  //   data[searchedType] = data[searchedType]
  //     .map((x, i) => {
  //       if (i == 1) {
  //         let {
  //           props: { children },
  //         } = x;
  //         return children;
  //       }
  //       return x;
  //     })
  //     .join("");
  //   return data;
  // };
  return (
    <div>
      <ListGroup className="bg-dark text-white ">
        {search && (
          <p>
            total{" "}
            {`${resultsFoundBySearch()} ${
              resultsFoundBySearch() ? "results" : "result"
            }`}{" "}
            found
          </p>
        )}
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            maxHeight: "350px",
            overflow: "scroll",
            marginBottom: "100px",
          }}
        >
          {contacts.map((x) => {
            let [group, details] = x;

            let groupValue = (
              <Element name={group.id} key={uuidv4()}>
                <h3 className="ps-1">{group.groupName}</h3>
              </Element>
            );
            let values = details.map((x) => (
              <Element key={x.id}>
                <ListGroup.Item className="bg-dark text-white d-flex ms-1 border border-0 justify-content-between ">
                  <div className={style.contact_icon_fix}>
                    <AiOutlineContacts
                      style={{
                        fontSize: "45px",
                        color: x.color ? x.color : "yellow",
                      }}
                    />
                  </div>
                  <div className={`ms-3 ${style.contact_display_fix}`}>
                    <p className="m-0 text-start">{x.name}</p>
                    <p className="text-start m-0">{x.number}</p>
                  </div>
                  <div className={`d-flex ${style.contact_controller_fix}`}>
                    <AiOutlineEdit
                      className={`text-success mx-1 ${style.edit_icon}`}
                      onClick={() => editHandler(x)}
                    />
                    <AiFillDelete
                      onClick={() => deleteHandler(x.id)}
                      className={`text-danger mx-1 ${style.delete_icon}`}
                    />
                  </div>
                </ListGroup.Item>
              </Element>
            ));
            return [groupValue, values];
          })}
        </Element>
      </ListGroup>
      {!deleteId ? (
        <ModalView
          show={showModal}
          handleClose={showModalHandler}
          title="update contact"
        >
          <FormController
            contact={editedValues}
            handleClose={showModalHandler}
            mode="update"
            completeUpdatedHandler={completeUpdatedHandler}
          />
        </ModalView>
      ) : (
        <ModalView
          show={showModal}
          handleClose={showModalHandler}
          title="delete contact"
        >
          <p className="text-danger fw-bold">
            Do you really want to delete this contact?
          </p>
          <Button variant="info mx-2" onClick={closeHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteContact}>
            Yes
          </Button>
        </ModalView>
      )}
    </div>
  );
}
