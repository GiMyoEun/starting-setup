import React, { useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import UpdatedExpense from "./components/UpdatedExpense/UpdatedExpense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [updateExpense, setupdateExpense] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const modifyingExpenseHandler = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === updatedExpense.id) {
        return updatedExpense;
      } else {
        return expense;
      }
    });

    setExpenses(() => {
      return updatedExpenses;
    });
  };

  const popModifyingHandler = (id) => {  
    /* 수정하려는 아이템 찾기 */
    const selectedExpense = expenses.find((item) => {
      return item.id === id;
    });

    setupdateExpense(() => {
      return {
        id: selectedExpense.id,
        title: selectedExpense.title,
        amount: selectedExpense.amount,
        date: selectedExpense.date,
      };
    });
    setIsEditing(true);
  };

  const onDeleteExpenseHandler = (expenses) => {
    setExpenses(() => {
      return expenses;
    });
  };

  const editingHandler = (editYn) => {
    setIsEditing(editYn);
  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      {isEditing && (
        <UpdatedExpense
          items ={updateExpense}
          
          onEdit={editingHandler}
          onUpdateExpense={modifyingExpenseHandler}
        />
      )}
      <Expenses
        onModifyForm={popModifyingHandler}
        onDeleteExpense={onDeleteExpenseHandler}
        items={expenses}
      />
    </div>
  );
};

export default App;
