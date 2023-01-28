import React, { useState, useEffect } from "react";
import "./UpdatedExpenseForm.css";

const  addZero = (date) => {
  if (date < 10) {
    const zeroDate = ('00' + date).slice(-2);
    return zeroDate;
  }
  return date;
}

const strToDate = (date) => {
  const year = date.getFullYear();
  const month = addZero(date.getMonth()+1) ;
  const day = addZero(date.getDate());
  return year+"-"+month+"-"+day;
};

const UpdatedExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.items.title);
  const [enteredAmount, setEnteredAmount] = useState(props.items.amount);
  const [enteredDate, setEnteredDate] = useState(props.items.date);
  const day = strToDate(new Date(enteredDate));
  useEffect(()=>{
    setEnteredTitle(props.items.title);
  },[props.items]);

  console.log(props);


  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  
  const submitHandler = (event) => {
    event.preventDefault();
  
    const expenseData = {
      id : props.items.id,
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };
  
  return (
    <form onSubmit={submitHandler}>
      <div className='update-expense__controls'>
        <div className='update-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='update-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='update-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={day}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='update-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Update Expense</button>
      </div>
    </form>
  );
};

export default UpdatedExpenseForm;
