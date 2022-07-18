import React from 'react';


//form for details
const formDetail = (props) => {
  const {
    user,
    courseUserId,
    cancel,
    errors,
    submit,
    submitButtonText,
    update,
    elements,
  } = props;  




  //submit
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }



//cancel
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  //update
  function handleUpdate(event) {
    event.preventDefault();
    update();
  }
console.log(`${user}   ${courseUserId}`)

 //the div and form of buttons if user is auth user show update and delete button
  if (user === courseUserId && user ) {  
    return (
     
     <div>
       <ErrorsDisplay errors={errors} />
       <form onSubmit={handleSubmit}>
       <div className="pad-bottom" style={styles.pad}>
           <button className="up button" onClick={handleUpdate} style={styles.theButton}>Update Course</button>
           <button className="sub button" type="submit" style={styles.theButton}>{submitButtonText}</button>
           <button className="cancel button button-secondary" onClick={handleCancel} style={styles.theButton}>Return to List</button>
         </div>
         {elements()}
 
       </form>
     </div>
    )
    } else {
 return (
   <div>
       <ErrorsDisplay errors={errors} />
       <form onSubmit={handleSubmit}>
       <div className="pad-bottom" style={styles.pad}>
           <button className="cancel button button-secondary" onClick={handleCancel} style={styles.theButton2}>Return to List</button>
         </div>
         {elements()}
 
       </form>
     </div>
   )}


}


//display errors
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
//styles
const styles = {
  theButton: {
    opacity: '100%',
    height: '55px',
    position: 'relative',
    top: '-120px',
    right: '80%',
    display: 'inline',
},
theButton2: {
  opacity: '100%',
  height: '55px',
  position: 'relative',
  top: '-120px',
  right: '400px',
  display: 'inline',
},
pad: {
  display: 'inline-flex',
  position: 'absolute',
  left: '45%',
  top: '200px',
}

}

export default formDetail