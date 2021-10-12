import { useEffect } from "react";
import { useLocalStorageState } from "../utils/localSotrage";
import styled from "styled-components";

// see manual here : https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
export const ItemList = () => {
  const [backlog, setBacklog] = useLocalStorageState("backlog", []); // useState([]); default value is ein leeres Array []
  const [toBuy, setToBuy] = useLocalStorageState("tobuy", []);
  useEffect(() => {
    const url = "https://fetch-me.vercel.app/shopping-list.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("PRINT HERE!!!", json);

        setBacklog(json); //Array "Backlog" mit json ersetzen
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []); // Array >> dependancy. wenn Array leer ist, wird die Funkiton useEffect einmal abgerufen

  const handleClickBacklog = (event, item) => {
    event.preventDefault();
    console.log(event, item);
    const newBacklogArray = backlog.filter(
      (backlogItem) => backlogItem.id != item.id
    ); //newArray besteht aus Elemente, die nicht geklickt wird >> != id
    console.log(newBacklogArray);
    setBacklog(newBacklogArray); // erstezen Backlog Array mit newBacklogArray
    setToBuy([...toBuy, item]);
  };
  const handleClickToBuy = (event, item) => {
    event.preventDefault();
    console.log(event, item);
    const newToBuyArray = toBuy.filter((toBuyItem) => toBuyItem.id != item.id);
    console.log(newToBuyArray);
    setToBuy(newToBuyArray);
    setBacklog([...backlog, item]);
  };
  return (
    <>
      <Div className="App">
        <h1>Sarah's Shopping List </h1>
        <h2>Backlog</h2>
        <div>
          {backlog.map((item, index) => (
            <BacklogBox
              onClick={(event) => handleClickBacklog(event, item)}
              key={`${item.id}_${index}`}
            >
              {" "}
              {item.name}{" "}
            </BacklogBox>
          ))}
        </div>
        <h2>To Buy</h2>
        <div>
          {toBuy.map((item, index) => (
            <ToBuyBox
              // isActive={true}
              onClick={(event) => handleClickToBuy(event, item)}
              key={`${item.id}_${index}`}
            >
              {" "}
              {item.name}{" "}
            </ToBuyBox>
          ))}
        </div>
      </Div>
    </>
  );
};

const BacklogBox = styled.span`
  display: inline-block;
  background-color: bisque;
  border-radius: 5px;
  padding: 10px;
  margin: 12px;
`;
// background-color: ${({ isActive }) => (isActive ? "plum" : "bisque")};

const ToBuyBox = styled(BacklogBox)`
  background-color: plum;
`;

const Div = styled.div`
  padding: 15px;
`;
