import React from "react";
import style from "../../css/style.module.css";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { AiOutlineSearch } from "../../js/icons";
export default function Index({ contacts, search, searchHandler }) {
  let totalContacts = () => {
    return contacts.map((x) => x[1]).flat(Infinity).length;
  };
  return (
    <>
      <Form>
        <InputGroup className="mb-3 bg-dark  ">
          <InputGroup.Text className="bg-transparent text-white border">
            <AiOutlineSearch />
          </InputGroup.Text>
          <FormControl
            className={`bg-dark border-start-0 text-white ${style.searchbox_fix}`}
            placeholder={`search among ${totalContacts()} contact(s)`}
            aria-label="search"
            aria-describedby="basic-addon1"
            value={search}
            onChange={searchHandler}
          />
        </InputGroup>
      </Form>
    </>
  );
}
