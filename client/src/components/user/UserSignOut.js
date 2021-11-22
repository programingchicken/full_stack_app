import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Out = ({context}) => {
  useEffect(() =>  context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}

export default Out