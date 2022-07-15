import React from 'react';

const form = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    deletePage,
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
  'margin-bottom': '20px',
}
}

export default form