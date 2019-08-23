import React from 'react';
import classNames from 'classnames';

import './Well.css';

const Well = ({children, className}) => (
    <div className={classNames('well', className)}>
        {children}
    </div>
);

export default Well;