import React, { useState } from 'react';
import { userService } from '../services/api'; // Correct import for userService

const UserManagement = () => {
  const [userId, setUserId] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      await userService.updatePlanStatus(userId, subscriptionStatus); // Use updatePlanStatus from userService
      alert('Plan status updated!');
    } catch (error) {
      alert('Error updating plan status');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div>
        <label>
          Active
          <input
            type="radio"
            name="status"
            value="active"
            checked={subscriptionStatus === true}
            onChange={() => setSubscriptionStatus(true)}
          />
        </label>
        <label>
          Inactive
          <input
            type="radio"
            name="status"
            value="inactive"
            checked={subscriptionStatus === false}
            onChange={() => setSubscriptionStatus(false)}
          />
        </label>
      </div>
      <button onClick={handleUpdateStatus}>Update Subscription Status</button>
    </div>
  );
};

export default UserManagement;
