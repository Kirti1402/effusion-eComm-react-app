import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./footer.css"

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
            <a className='link' href='https://twitter.com/_kirtisingh_' target='#'><FontAwesomeIcon icon={faTwitter} /></a>
            <a className='link' href="https://www.linkedin.com/in/kirti2714/" target='#'><FontAwesomeIcon icon={faLinkedin} /></a>      
        </div>
        <p>© 2023 My Website. All rights reserved.</p>
      </div>
    </footer>
  )
}
