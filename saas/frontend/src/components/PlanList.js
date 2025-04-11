import React, { useEffect, useState } from 'react';
import { planService } from '../services/api'; // Assuming planService is set up in api.js

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await planService.fetchPlans(); // Fetch the plans from the backend
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <h2>Browse Plans</h2>
      <div>
        {plans.map((plan) => (
          <div key={plan._id} className="plan-card">
            <h3>{plan.name}</h3>
            <p>{plan.features}</p>
            <p>Price: ${plan.price}</p>
            <button>Add to Cart</button> {/* Add to cart functionality can be implemented later */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
