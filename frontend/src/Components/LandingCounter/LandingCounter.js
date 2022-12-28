import React, { useEffect, useState } from "react";

const LandingCounter = ({ count }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalCount = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, 1);

    if (counter === count) {
      clearInterval(intervalCount);
    }

    return () => clearInterval(intervalCount);
  }, [counter]);

     return <span className="landing-status__count">{counter}</span>
};

export default LandingCounter;
