export const ShoppingListItem = ({ handleOnClick, item, index }) => {
  return (
    <div>
      <span
        onClick={(event) => handleOnClick(event, item)}
        key={`${item.id}_${index}`}
      >
        {" "}
        {item.name}
        <div className="category"> {item.category} </div>
      </span>
    </div>
  );
};
