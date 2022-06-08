import React from 'react';
import './icon.css';
import './iconfont.less';

const CusIcon = (props) => {
  const { type, fontSize, spin } = props;
  let typeIcon;
  if(spin)
    typeIcon = type + '-spin';
  else
    typeIcon = type;
  return <i className={`iconfont ux-icon-${typeIcon}`}
            style={{fontSize: fontSize}}
  />;
};

export default CusIcon;
