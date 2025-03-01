// src/components/Navbar.jsx
import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem}>
  <a href="https://agrico-community.vercel.app/" className={styles.navLink}>Community</a>
</li>

        {/* <li className={styles.navItem} >About</li>
        <li className={styles.navItem}>Services</li>
        <li className={styles.navItem}>Contact</li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
