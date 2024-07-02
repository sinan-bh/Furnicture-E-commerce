import './Style.css'
import React from 'react'
import { FaFacebook, } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGooglePlus } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';



function Footer() {
  return (
    <footer className="  text-center ">
        <div className="container mt-5 ">
            <div className="row">
                <div className="col-12">
                    <ul className="list-inline text-footer">
                        <li className="list-inline-item text-footer-list"><Link to={'/'} style={{ color: "rgb(84,98,102)" }} className=" text-decoration-none m-2">Home</Link></li>
                        <li className="list-inline-item text-footer-list"><a href="#" style={{ color: "rgb(84,98,102)" }} className=" text-decoration-none m-2">About</a></li>
                        <li className="list-inline-item text-footer-list"><a href="#" style={{ color: "rgb(84,98,102)" }} className=" text-decoration-none m-2">Contact Us</a></li>
                        <li className="list-inline-item text-footer-list"><a href="#" style={{ color: "rgb(84,98,102)" }} className=" text-decoration-none m-2">Our Team</a></li>
                    </ul>
                </div>
                <div className="text-footer col-12 mb-3">
                    <a href="#" className="icon-footer-list mx-2"><FaFacebook /></a>
                    <a href="#" className="icon-footer-list mx-2"><FiInstagram /></a>
                    <a href="#" className="icon-footer-list mx-2"><RiTwitterXLine /></a>
                    <a href="#" className="icon-footer-list mx-2"><FaGooglePlus /></a>
                    <a href="#" className="icon-footer-list mx-2"><FaYoutube /></a>
                </div>
            </div>
            <div className="row ">
                <div className="col-12">
                    <p className="mb-0" style={{ color: "rgb(84,98,102)" }}>Designed by SINAN</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
