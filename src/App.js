import Mainbar from './Components/Mainbar';
import styles from './Styles/App.module.css';
import React from 'react';

function App() {

  return (
    <div>
      <div className={styles.sidebar}>
        <Mainbar />
      </div>
    </div>
  );
}

export default App;
