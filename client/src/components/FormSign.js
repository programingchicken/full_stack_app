import React from 'react';


//form sign in
const formSign = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
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

   //the div and form of buttons
  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit} >
        {elements()}
        <div className="pad-bottom">
          <button className=" button" type="submit">{submitButtonText}</button>
          <button className="cancel button button-secondary" onClick={handleCancel } >Cancel</button>
        </div>
      </form>
    </div>
  );
}

//error display
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

export default formSign 
