import React from 'react';
import classNames from 'classnames';

import './Btn.css';

const Btn = ({children, className, onClick, type}) => (
    <button className={classNames('btn', className)} onClick={onClick} type={type}>{children}</button>
);

export default Btn;