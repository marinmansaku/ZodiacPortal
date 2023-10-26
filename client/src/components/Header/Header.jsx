import React from "react";
import styles from './Header.module.css';

function Header () {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="https://static.wixstatic.com/media/d22947_dce7e7d4954c41daa17146627f05da84~mv2.png/v1/fill/w_102,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Screenshot_2021-11-08_at_1_38_11_PM-removebg-preview.png"/>
                <h1>ZODIAC</h1>
                <h2>portal</h2>
            </div>
        </div>
    )
}

export default Header;