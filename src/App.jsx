import { useEffect, useState } from "react";
import "./App.css";

// see manual here : https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
function App() {
  const [advice, setAdvice] = useState([]); // standartwert is ein leeres Array []
  useEffect(() => {
    const url = "https://fetch-me.vercel.app/shopping-list.json";
    const backlog = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("PRINT HERE!!!", json);

        setAdvice(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    backlog();
  }, []);

  return (
    <>
      <div className="App">
        <p>
          {advice.map((advice) => (
            <span key={advice.id}> {advice.name} </span>
          ))}
          ;
        </p>
      </div>
    </>
  );
}

export default App;
