import React, { useState } from "react";
import UpdatedExpenseForm from "./UpdatedExpenseForm";

import "./UpdatedExpenseForm.css";

const UpdatedExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    props.onUpdateExpense(enteredExpenseData);
    props.onEdit(false);
  };

  const stopEditingHandler = () => {
    props.onEdit(false);
  };

  return (
    <div className="new-expense">
      <UpdatedExpenseForm
        items={props.items}
      
        onSaveExpenseData={saveExpenseDataHandler}
        onCancel={stopEditingHandler}
      />
    </div>
  );
};

export default UpdatedExpense;
