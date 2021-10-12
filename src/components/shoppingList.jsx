import { useEffect } from "react";
import { useLocalStorageState } from "../utils/localSotrage";
import styled, { keyframes } from "styled-components";
import { ShoppingListItem } from "./shoppingListItem";

// see manual here : https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
export const ShoppingList = () => {
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
            <BacklogBox>
              <ShoppingListItem
                handleOnClick={handleClickBacklog}
                item={item}
                index={index}
              />
            </BacklogBox>
          ))}
        </div>
        <h2>To Buy</h2>
        <div>
          {toBuy.map((item, index) => (
            <ToBuyBox>
              <ShoppingListItem
                handleOnClick={handleClickToBuy}
                item={item}
                index={index}
              />
            </ToBuyBox>
          ))}
        </div>
      </Div>
    </>
  );
};

const zoom1 = keyframes`
0%{
background-color: bisque;
}
50%{
background-color: peru;
transform: scale(1.2);
}
100%{
  background-color: bisque;
}`;

const zoom2 = keyframes`
0%{
background-color: plum;
}
50%{
background-color: orchid;
transform: scale(1.2);
}
100%{
  background-color: plum;
}`;

const BacklogBox = styled.span`
  display: inline-block;
  background-color: bisque;
  border-radius: 5px;
  padding: 10px;
  margin: 12px;
  font-size: 17px;
  text-align: center;

  &: hover {
    animation-name: ${zoom1};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  .category {
    font-size: 12px;
    font-weight: bold;
    color: teal;
  }
`;

const ToBuyBox = styled(BacklogBox)`
  background-color: plum;

  &: hover {
    animation-name: ${zoom2};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
`;

const Div = styled.div`
  padding: 15px;
`;
