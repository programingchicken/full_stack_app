import React from 'react';
// not found page
const notFound = () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <a type="button" className="button" href='/courses' style={{'margin-left': '170px'}}>Course List</a>
  </div>
);

export default notFound
