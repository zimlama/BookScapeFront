import React, { useState } from "react";
import styles from "./CustomNav.module.css";

interface CustomNavProps {
  li: [React.ReactNode, string][];
}

const CustomNav: React.FC<CustomNavProps> = ({ li }) => {
  const [windowOpen, setWindowOpen] = useState(false);

  const toggleWindow = () => {
    setWindowOpen(!windowOpen);
  };

  return (
    <nav className={styles.navbarMenu} style={{ width: windowOpen ? 250 : 60 }}>
      <div className="burger" onClick={toggleWindow}>
        <img src="images/menu.svg" alt="burger" />
      </div>
      <ul className={styles.navbar__list}>
        {li.map((item, i) => (
          <div className={styles.navbar__liBox} key={i}>
            <img
              src={item[1]}
              alt={item[1]}
              style={{ paddingLeft: windowOpen ? 27 : 17 }}
            />
            <li
              className={styles.navbarli}
              style={{ display: windowOpen ? "inline-block" : "none" }}
            >
              {item[0]}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default CustomNav;
