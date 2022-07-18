import React from 'react';

//Auth course page
 const authenticatedCourse = ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.name} created and authenticated A Project!</h1>
      <a type="button" className="button" href='/courses'>Course List</a>
    </div>
  </div>
  );
}

export default authenticatedCourse;