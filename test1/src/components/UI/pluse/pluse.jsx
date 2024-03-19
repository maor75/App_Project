import React, { useState } from 'react';
import styles from '../label/label.module.css';

function DynamicInputComponent() {
  const [inputCount, setInputCount] = useState(0);

  const handleAddInputs = () => {
    setInputCount(inputCount + 1);
  };

  return (
    <div className={styles.row}>
      <button className={`${styles.btn} ${styles.third}`} onClick={handleAddInputs}>Add product</button>
      {[...Array(inputCount)].map((_, index) => (
        <div key={index} className={styles.inputContainer}>
         <span>
              <input className={styles.balloon} id={`id${index + 1}`} type="text" placeholder={`ID ${index + 1}`}
              />
              <label htmlFor={`id${index + 1}`}>Product ID:</label>
         </span>

         <span>

              <input className={styles.balloon} id={`name${index + 1}`} type="text" placeholder={`Name ${index + 1}`}
              />
              <label htmlFor={`name${index + 1}`}>Product Name:</label>
         </span>

         <span>
              <input className={styles.balloon} id={`product${index + 1}`} type="text" placeholder={`Product ${index + 1}`}
              />
              <label htmlFor={`product${index + 1}`}>Provider ID:</label>
         </span>

        </div>
      ))}
    </div>
  );

}

export default DynamicInputComponent;
