import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Data } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const App = () => {
  const [People, SetPeople] = React.useState(Data);
  const [Index, SetIndex] = React.useState(0);

  const AddIndex = () => {
    Condition(Index + 1);
  };
  const MinusIndex = () => {
    Condition(Index - 1);
  };

  const Condition = (conditionIndex) => {
    if (conditionIndex > People.length - 1) {
      SetIndex(0);
    } else if (conditionIndex < 0) {
      SetIndex(4);
    } else {
      SetIndex(conditionIndex);
    }
  };


  //Every 3seconds when "Index" changes, it will autoslide
  React.useEffect(() => {
    let slider = setInterval(() => {
      Condition(Index + 1);
    }, 3000);

    return () => clearInterval(slider);
  }, [Index]);

  
  return (
    <main>
      <div className="maintitle">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>
      <div>
        <div className="maincontainer">
          <div className="container">
            <div className="buttondiv">
              <button type="button" onClick={() => SetIndex(MinusIndex)}>
                <IoIosArrowBack />{" "}
              </button>
            </div>
            <div className="contents">
              {People.map((person, personindex) => {
                const { id, name, job, quote, image } = person;
                let position = "next";
                //Index is 0
                //PersonIndex 0 will display in "current" className
                if (Index === personindex) {
                  position = "current";
                }
                //When Index is 0, PersonIndex 1 will display in "next" className
                //As PersonIndex1 is 1 Minus 1 will be 0, which is equal to the Index;
                if (personindex === Index - 1) {
                  position = "prev";
                }
                if (personindex === Index - 4) {
                  position = "next";
                }
                if (personindex === Index + 4) {
                  position = "prev";
                }

                return (
                  <div key={id} className={position}>
                    <div className="imagecontainer">
                      <img src={image} alt={name}></img>
                    </div>
                    <h2>{name}</h2>
                    <p className="job">{job}</p>
                    <p className="quote">{quote}</p>
                    <div className="icon">
                      <FaQuoteRight />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="buttondiv2">
              <button type="button" onClick={() => SetIndex(AddIndex)}>
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="author">Zuzim Ajo &copy; 2021</h2>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
