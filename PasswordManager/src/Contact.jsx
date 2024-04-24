import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBarOthers from './NavBarOthers';


function Contact() {
    return (
        <div>
            <NavBarOthers/>
            <body>
                <div class="content">
                    <section>
                        <div class="container">
                            <h2 class="text-center">Reach out and say Hello!</h2>
                            <div class="split">
                                <div class="left-description">
                                    <h2>How you can get in touch with us.</h2>
                                    <a href="mailto:yap.n@northeastern.edu"><i class="fas fa-envelope"></i>Email</a>
                                    <a href="https://github.com/nathanjy212/PersonalProjects.git"><i class="fab fa-github"></i>Github</a>
                                    <a href="https://www.linkedin.com/in/nathan-yap-833366130/"><i class="fab fa-linkedin"></i>Linkedin</a>
                                </div>
                                <div class="image-description">
                                    <img src="./assets/collaboration.jpg" alt="people collaborating"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </body>
        </div>
        
    )   
}

export default Contact;