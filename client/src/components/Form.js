import React from 'react';
//form page
const form = (props) => {
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
      <form onSubmit={handleSubmit} style={styles.form}>
        {elements()}
        <div className="pad-bottom">
          <button className=" button" type="submit" style={styles.subm}>{submitButtonText}</button>
          <button className="cancel button button-secondary" onClick={handleCancel } style={styles.subm2}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
//errors val
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div style={styles.err}>
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
subm:{
  position: 'relative',
  left: '40px',
  bottom: '120px',

},
subm2:{
  position: 'relative',
  left: '50px',
  bottom: '120px',

},
err: {
  position: 'relative',
  left: '50px',
  top: '60px',
  marginBottom: '20px',
}
}

export default form