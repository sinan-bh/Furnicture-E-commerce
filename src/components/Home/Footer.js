import './Home.css'
import React from 'react'
import { FaFacebook, } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGooglePlus } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';



function Footer() {
  return (
    <footer class="bg-dark text-white text-center py-3">
        <div class="container mt-5 ">
            <div class="row">
                <div class="col-12 mb-3">
                    <a href="#" class="text-white mx-2"><FaFacebook /></a>
                    <a href="#" class="text-white mx-2"><FiInstagram /></a>
                    <a href="#" class="text-white mx-2"><RiTwitterXLine /></a>
                    <a href="#" class="text-white mx-2"><FaGooglePlus /></a>
                    <a href="#" class="text-white mx-2"><FaYoutube /></a>
                </div>
                <div class="col-12">
                    <ul class="list-inline">
                        <li class="list-inline-item"><Link to={'/'} class="text-white text-decoration-none">Home</Link></li>
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">About</a></li>
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">Contact Us</a></li>
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">Our Team</a></li>
                    </ul>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <p class="mb-0">Designed by SINAN</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
