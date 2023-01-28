import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');
  
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const onDeleteExpenseHandler = (expenseId) => {
    const NewExpensesList = props.items.filter((expense) =>{
      return expense.id !== expenseId;
    });
    props.onDeleteExpense(NewExpensesList);
  };

  const popModifyingHandler = (id) => {
    /*App.js 로 보내기*/
    props.onModifyForm(id);
  };

  const filteredExpenses = props.items.filter((expense) => {
    
    return expense.date.getFullYear().toString() === filteredYear;
  });

 

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList 
         onModifyForm={popModifyingHandler}
        onDeleteExpense={onDeleteExpenseHandler}
         items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;