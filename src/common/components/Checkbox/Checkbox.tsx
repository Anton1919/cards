import React from 'react';

type CheckboxPropsType = {
    checked: boolean;
};

const Checkbox = ({checked}: CheckboxPropsType) => {
    return <input type={'checkbox'} checked={checked}/>;
};

export default Checkbox;
