import React from 'react';

const PlanDetails = ({ plan, onUpdate }) => {
  return (
    <div>
      <h2>Plan Details</h2>
      <p>Plan: {plan.name}</p>
      <p>Price: INR {plan.price}</p>
      <button onClick={() => onUpdate(plan)}>Update Plan</button>
    </div>
  );
};

export default PlanDetails;
