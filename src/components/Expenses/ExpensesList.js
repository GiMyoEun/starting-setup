import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
import ConfirmModal from "../UI/ConfirmModal";
import ModifyItemModal from "../UI/ModifyItemModal";

const ExpensesList = (props) => {
  const [confirmMessage, setConfirmMessage] = useState();
  const [dataModified, setdataModified] = useState();


  
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

   
  const popConfirmModalHandler = (id) =>{
    
    setConfirmMessage({
      title: 'Delete Expense',
      message: 'Do you want to delete this expense item?', 
      expenseId: id,
    });
  }

  /* Expense 수정 Item 띄우기 */
  const popModifyingHandler = (id) => {
    /* Expense.js 로 보내기 */
    //props.onModifyForm(id);
     const expense = props.items.find((item) => {return item.id === id});
     setdataModified({
       id : expense.id,
       title : expense.title,
       amount : expense.amount, 
     });
    
  };

  const cancelDeletingExpenseHandler = () =>{
    setConfirmMessage(null);
  };

  

  const deleteExpenseHandler = () =>{
    props.onDeleteExpense(confirmMessage.expenseId);
    setConfirmMessage(null);
  };

  const modifyingExpenseHandler = (expenseData) =>{
    const expense = props.items.map((item) => {
      if(item.id === expenseData.id){
        item.id = expenseData.id;
        item.title =  expenseData.title;
        item.date = expense.date;
        item.amount = expenseData.amount;
        return item;
      }else{
        return item; 
      }
    });

    props.onModifyExpense(expense);
    setdataModified(null);
    //code..
    //setdataModified(null);
  };

  const cancelModifyingExpenseHandler = () =>{
    setdataModified(null);
  };

  return (
    <React.Fragment>
      {confirmMessage && (
        <ConfirmModal
          title={confirmMessage.title}
          message={confirmMessage.message}
          onConfirm={deleteExpenseHandler}
          onCnl={cancelDeletingExpenseHandler}
        />
      )}
      {dataModified && (
        <ModifyItemModal
          id = {dataModified.id}
          title={dataModified.title}    
          amount = {dataModified.amount}
          onModify={modifyingExpenseHandler}
          onCnlModifying={cancelModifyingExpenseHandler}

        />
      )}
      <ul className="expenses-list">
        {props.items.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            onDeleteConfirm={popConfirmModalHandler}
            onModifyForm={popModifyingHandler}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpensesList;
