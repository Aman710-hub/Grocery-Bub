import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// saving list to LS.
const getLocStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    // JSON parse - converting json to js object that we can use
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  // this stat saves value passed to "input"
  const [name, setName] = useState("");
  // "list" state is for saving items that we entered
  const [list, setList] = useState(getLocStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  // we can set object in useState
  const [alert, setAlert] = useState({
    show: false,
    msg: "he there",
    type: "success",
  });

  // this function is to show or hide alert
  // this is how we can set defaul values to func parametrs
  const showAlert = (show = false, msg = "", type = "") => {
    // setAlert has object inside
    setAlert({ show, type, msg });
    // setAlert({ show:show, type: type, msg:msg });  this is how it would look like without EC6 JS
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if "name" is emty
    if (!name) {
      showAlert(true, "pleas enter the text", "danger");
    }
    // if "name" and "isEddinting" is true
    else if (name && isEditing) {
      // EDIT
      // we itirate throu list and if curr items id is equal to "editID" then  we spread all the props and seting "title" prop to "name" (name is value of input)
      setList(
        list.map((item) => {
          // id passed to "setEditID" is  id of curr item that was clicked
          if (item.id === editID) {
            return { ...item, title: name };
          }
          //  WHY DO WE RETURNING THIS ITEM ????????????
          return item;
        })
      );
      // when we are done with editing all the states go back to default
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value  was changed", "success");
    } else {
      showAlert(true, "item added", "success");
      // this is just how we get the "ID" for the item
      // this "newItem" is the new item that will be added to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      // "...list" means get me the prev values form "list" state and add new one "newItem"
      setList([...list, newItem]);
      // when we add new item to the list we will set input bar to empy
      setName("");
    }
  };

  // function to clear all the items
  const clearItems = () => {
    showAlert(true, "items is creared", "success");
    // when i emty the "list" the "List" component wont be shown bs we have conditional redering  "List will show only if "list" state length is bigger than 0"
    setList([]);
  };

  // function to delete single item
  const removeItem = (id) => {
    showAlert(true, "item removed", "danger");
    // if "item.id" dont matches "id" of the curr itme then item will be added to the "list"
    setList(list.filter((item) => item.id !== id));
  };

  // function to eddit item
  const edditItem = (id) => {
    // The find() method returns the value of the first element that passes a test.
    // The find() method executes a function for each array element.
    // The find() method returns undefined if no elements are found.

    // if in one of the stacked items id matches with id of curr item then the curr item will be returned
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    // id passed in "setEditID" is  id of curr item that was clicked
    setEditID(id);
    // here we get title of curr item
    setName(specificItem.title);
  };

  // every time list changes  they will be saved in localStorager
  useEffect(() => {
    // "JSON.stringify" - converts array to string
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* this is how we can get item of object that in useState */}
        {/* here i pass in all the propertes from "alert" useState */}
        {alert.show && <Alert alertFunc={showAlert} {...alert} list={list} />}
        <h3>grocery bub</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            placeholder="milk, eggs..."
            // when input value changes we will set this new value to the "name" state
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {/* here we are using ternery operator */}
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* this called "conditional rendering" */}
      {/* bilow code will be shown only if "list" length is bigger than 0 */}
      {list.length > 0 && (
        <div className="grocery-container">
          {/* "list" is state that contains all added items */}
          <List items={list} removeItem={removeItem} edditItem={edditItem} />

          <button className="clear-btn" onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
