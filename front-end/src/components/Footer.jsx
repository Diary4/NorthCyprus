import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/style.scss'
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {

    const date = new Date();

  return (
    <footer className="footer-10" id='footer'>
			<div className="container">
				<div className="row mb-5 pb-3 no-gutters">
					<div className="col-md-4 mb-md-0 mb-4 d-flex">
						<div className="con con-2 w-100 py-5">
							<div className="con-info w-100 text-center">
								<div className="icon d-flex align-items-center justify-content-center">
									<span><MdEmail /></span>
								</div>
								<div className="text">
									<span>keeneducation@email.com</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-7">
						<div className="row">
							<div className="col-md-4 mb-md-0 mb-4">
								<h2 className="footer-heading">About</h2>
								<ul className="list-unstyled">
		              <li><a href="#" className="d-block">Out story</a></li>
		              <li><a href="#" className="d-block">Awards</a></li>
		              <li><a href="#" className="d-block">Our Team</a></li>
		              <li><a href="#" className="d-block">Career</a></li>
		            </ul>
							</div>
							<div className="col-md-4 mb-md-0 mb-4">
								<h2 className="footer-heading">Company</h2>
								<ul className="list-unstyled">
		              <li><a href="#" className="d-block">Our services</a></li>
		              <li><a href="#" className="d-block">Clients</a></li>
		              <li><a href="#" className="d-block">Contact</a></li>
		              <li><a href="#" className="d-block">Press</a></li>
		            </ul>
							</div>
							<div className="col-md-4 mb-md-0 mb-4">
								<h2 className="footer-heading">Resources</h2>
								<ul className="list-unstyled">
                                    <li><a href="#" className="d-block">Blog</a></li>
                                    <li><a href="#" className="d-block">Newsletter</a></li>
                                    <li><a href="#" className="d-block">Privacy Policy</a></li>
                                </ul>
							</div>
						</div>
					</div>

				</div>
				<div className="row mt-5 pt-4 border-top">
          <div className="col-md-6 col-lg-8 mb-md-0 mb-4">
            <p>	&copy; {date.getFullYear()} all rights reserved !! Diary </p>
          </div>
          <div className="col-md-6 col-lg-4 text-md-right">
          	<ul className="ftco-footer-social p-0">
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><span><FaFacebook /></span></a></li>
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><span><FaInstagram /></span></a></li>
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Youtube"><span><FaYoutube /></span></a></li>
            </ul>
          </div>
        </div>
			</div>
		</footer>
  )
}
