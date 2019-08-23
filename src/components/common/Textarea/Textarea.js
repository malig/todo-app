import React from 'react';
import classNames from 'classnames';

import './Textarea.css';

const Textarea = ({className, ...props}) => (
    <textarea {...props} className = {classNames('textarea', className)} />
);

export default Textarea;