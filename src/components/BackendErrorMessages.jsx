import React from 'react';

const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map((name) => {
    let messages = backendErrors[name].join(' ');
    return `${name} ${messages}`;
  });

  return (
    <ul className="error-messages">
      {errorMessages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};

export default BackendErrorMessages;
