import React, { useState } from 'react';
import Card from './Card';
import '../App.css'

function Button() {
  const [isCardVisible, setCardVisible] = useState(false);

  const openCard = () => {
    setCardVisible(true);
  };

  const closeCard = () => {
    setCardVisible(false);
  };

  return (
    <div>
      {!isCardVisible &&(<button className="Add"
    onClick={openCard}>Add</button>)}
      
      {isCardVisible && <Card onClose={closeCard} />}
    </div>
  );
}

export default Button;