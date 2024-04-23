import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'

function NavBar({ onLoginClick, onRegisterClick }) {

    return(
        <header>
            <h1 class="logo"></h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle" />
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <label for="nav-toggle" class="nav-toggle-label">
                    <span></span>
                </label>
                <div class="signIn">
                    <button id="sign-button" onClick={onRegisterClick}>Sign Up</button>
                    <button id="login-button" onClick={onLoginClick}>Log In</button>
                </div>
        </header>
    )
}

export default NavBar;