import React from 'react';

const error = () => (
  <div className="bounds">
    <h1>Error</h1>
    <p>Sorry! We just encountered a error.</p>
    <a type="button" className="button" href='/courses' style={{'margin-left': '170px'}}>Course List</a>
  </div>
);

export default error