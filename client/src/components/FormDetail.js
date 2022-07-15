import React from 'react';

const formDetail = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    update,
    elements,
  } = props;  

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }




  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  function handleUpdate(event) {
    event.preventDefault();
    update();
  }

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
  );
}

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

const styles = {
  theButton: {
    opacity: '100%',
    height: '55px',
    position: 'relative',
    top: '-120px',
    right: '80%',
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