import React, { useState } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ModifyItemModal.module.css";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCnlModifying} />;
};

const ModalOverlay = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.title);
  const [enteredAmount, setEnteredAmount] = useState(props.amount);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const submitHandler = (event) => {
   // event.preventDefault();
    const expenseData = {
      id: props.id,
      title: enteredTitle,
      amount: enteredAmount,
    };

    props.onModify(expenseData);
    setTimeout(props.onCnlModifying(), 1000);
    
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>Modifying Expense Item</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div className={classes.content}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.content}>
          <label>Amount </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>

        <footer className={classes.actions}>
          <Button type="submit" onClick={props.onModify}>
            Yes
          </Button>
          
        </footer>
      </form>
     
    </Card>
  );
};

const ModifyItemModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCnlModifying={props.onCnlModifying} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          id={props.id}
          title={props.title}
          amount={props.amount}
          onModify={props.onModify}
          onCnlModifying={props.onCnlModifying}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ModifyItemModal;
