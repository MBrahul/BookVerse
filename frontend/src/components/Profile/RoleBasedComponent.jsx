import React from 'react'
import AllOrders from './AllOrders'
import Favourites from './Favourites';
import { useSelector } from 'react-redux';


const RoleBasedComponent = () => {

const role = useSelector((state) => state.auth.role);

  return (
        role === "admin"?(<AllOrders/>):(<Favourites/>)
  );
}

export default RoleBasedComponent;
