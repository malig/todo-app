import React from 'react';
import classNames from 'classnames';

import './Input.css';

const Input = ({className, ...props}) => (
    <input {...props} className={classNames('input', className)} />
);

export default Input;