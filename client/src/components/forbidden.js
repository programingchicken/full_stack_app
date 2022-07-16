import React from 'react';
// forbidden Page
const forbidden = () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Sorry! You are not authenticated for this page.</p>
    <a type="button" className="button" href='/courses' style={{'margin-left': '170px'}}>Course List</a>
  </div>
);

export default forbidden
