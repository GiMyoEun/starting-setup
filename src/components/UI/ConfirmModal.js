import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ConfirmModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCnl} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>     
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Yes</Button>
        <Button onClick={props.onCnl}>No</Button>
      </footer>
    </Card>
  );
};

const ConfirmModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCnl={props.onCnl} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={props.title} message={props.message} onCnl={props.onCnl} onConfirm={props.onConfirm}/>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ConfirmModal;
