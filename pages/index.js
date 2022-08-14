import axios from "axios";
import {useRef} from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconMailForward,
  IconMapPins,
  IconToggleLeft,
} from "@tabler/icons";
import React, { useState } from "react";
import { userAgent } from "next/server";

export default function Home() {
  const input_number_of_user = useRef(null);
  const [users, setUsers] = useState([]);

  const [value, setValue] = useState(0);
  function ForceUpdate(){ setValue(value+1); };

  const genUsers = async () => {
    const n = input_number_of_user.current.value;
    if(n < 1){
      alert("Invalid number of user");
      return;
    }
    const resp = await axios.get(`https://randomuser.me/api/?results=${n}`);
    setUsers(users = resp.data.results);
    for(let i in users) users[i].toggle = false;
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      {/* App Header */}
      <p className="display-4 text-center fst-italic m-4">
        Multiple Users Generator
      </p>

      {/* Input Section */}
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          ref={input_number_of_user}
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
        />
        <button className="btn btn-dark" onClick={() => genUsers()}>
          Generate
        </button>
      </div>

      {users.map((i) => (
        <div key={i.id} className="border-bottom">
          {/* main section */}
          <div className="d-flex align-items-center p-3" onClick={() => {
            i.toggle? i.toggle = false : i.toggle = true;
            ForceUpdate();
          }}>
            <img
              src={i.picture.large}
              alt="/profile-placeholder.jpeg"
              width="90px"
              className="rounded-circle me-4"
            />
            <span className="text-center display-6 me-auto">{i.name.first+' '+i.name.last}</span>
            {i.toggle? <IconChevronUp /> : <IconChevronDown />}
          </div>
          {/* UserCardDetail */}
          {i.toggle &&
            <div className="text-center">
              <p>
                <IconMailForward /> {i.email}
              </p>
              <p>
                <IconMapPins /> {i.location.city+' '+i.location.state+' '+i.location.country+' '+i.location.postcode}
              </p>
            </div>
          }
        </div>
      ))}

      {/* made by section */}
      <p className="text-center mt-3 text-muted fst-italic">
        made by Natee Wittawatskul 630610742
      </p>
    </div>
  );
}