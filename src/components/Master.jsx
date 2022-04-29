import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  SearchController,
  ContactView,
  CreateContactController,
  SideList,
} from "./index";
import { db, collection, onSnapshot } from "../js/firebaseconnection";
import { deepClone } from "../js/packages";
import { getValueByGroupName, getDataBySearch } from "../js/customfunctions";
import style from "../css/style.module.css";
// import { v4 as uuidv4 } from "uuid";
// import regexifyString from "regexify-string";
// import _ from "lodash";

export default function Master() {
  let [contacts, setContacts] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    let collections = collection(db, "oppof7");
    let unsubscribe = onSnapshot(collections, (data) => {
      let contactsData = getValueByGroupName(
        deepClone(data.docs.map((x) => ({ ...x.data(), id: x.id })))
      );

      setContacts(contactsData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  let searchHandler = (e) => setSearch((p) => e.target.value);

  let showContact = () => {
    let getSearchedData = getDataBySearch(contacts, search);

    return <ContactView contacts={getSearchedData} search={search} />;
  };
  return (
    <div className={`style.container_wraper bg-dark`}>
      <Container className={style.container_fix}>
        {!contacts.length ? (
          <Row className="my-5">
            <Col md={12} className="text-center">
              <Spinner animation="grow" variant="info" />
            </Col>
          </Row>
        ) : (
          <div>
            <Row>
              <Col md={12} className="my-2">
                <SearchController
                  search={search}
                  searchHandler={searchHandler}
                  contacts={contacts}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="text-white text-center ">
                <CreateContactController />
              </Col>
            </Row>
            <Row style={{ height: "auto" }}>
              <Col md={11} sm={11} xs={11}>
                {showContact()}
              </Col>
              <Col
                md={1}
                sm={1}
                xs={1}
                className="text-white position-relative"
              >
                <div className="position-absolute top-0  ">
                  <SideList contacts={contacts} search={search} />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
