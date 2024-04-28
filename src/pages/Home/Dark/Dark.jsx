import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { getDarks } from "../../Admin/AdminContent/AdminDark/getDarks";

import "./Dark.less";

export const Dark = observer(() => {
  const [darks, setDarks] = useState([]);

  const fetchAllDarks = async () => {
    const res = await getDarks();
    setDarks(res);
  };

  useEffect(() => {
    fetchAllDarks();
  }, []);

  return (
    <div className="dark__container">
      <div className="dark__subContainer">
        {darks.map((dark, index) => {
          return (
            <div key={index} className="dark__issue">
              <a href={dark.link} target="_blank" rel="noreferrer">
                <img className="dark__cover" src={dark.description} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/*
<iframe
  className="dark__iframe"
  src={dark.link}
  seamless="seamless"
  scrolling="no"
  frameBorder="0"
  // eslint-disable-next-line react/no-unknown-property
  allowtransparency="true"
  allowfullscreen="true"
></iframe>
*/
