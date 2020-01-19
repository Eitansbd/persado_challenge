import React from 'react';

const ErrorMessage = (props) => {
  return(
    props.errorMessages ? (
    <small className="form-text text-danger">
      {props.errorMessages.join(" and ")}
    </small>
    ) : (null)   
  );
};

export default ErrorMessage;
