import React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';

import './styles.css'

const CustomRadio = styled(Radio)({
  color: '#02495981',
  '&.Mui-checked': {
    color: '#024959',
  },
});

function RadioButton( { selectedValue, handleChange }) {
  return (
    <div className="radioOptions">
      <div>
        <CustomRadio
          checked={selectedValue === 'all'}
          onChange={e=> handleChange(e.target)} 
          value='all'
        />
        <span>Todos</span>
      </div>
      <div>
        <CustomRadio 
          checked={selectedValue === 'true'}
          onChange={e=>handleChange(e.target)}
          value='true'
        />
        <span>Prioridade</span>
      </div>
    </div>
  );
}

export default RadioButton;