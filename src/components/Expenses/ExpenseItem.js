import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
 

  const onDeleteConfirm = () => {
    let id = props.id;
    props.onDeleteConfirm(id);
  };
   
  /* Expense 수정 Item 띄우기 */
  const onModifyForm = () => {
    /* ExpenseList.js로 보내기 */
    props.onModifyForm(props.id);
  };

 
  
  return (
    <React.Fragment>
       
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title} </h2>
          <div className='expense-item__price'>${props.amount}</div>
          <button className='button_modify' onClick={onDeleteConfirm}>delete</button>
          <button  className='button_modify' onClick={onModifyForm}>modify</button>
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default ExpenseItem;