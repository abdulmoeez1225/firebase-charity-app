import React from 'react'
import {FaRegEnvelope} from 'react-icons/fa'
import './styles.scss'
const Footer = () => {
  return (
    <div className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col">Copyright © 2022 - Family Donation - All right reserved</div>
            <div className="col footer-email">
              <a href="mailto:donation@company.com"><FaRegEnvelope className="SvgIcon"/>donation@company.com</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer