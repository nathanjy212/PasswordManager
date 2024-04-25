import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBar from './NavBar';
import NavBarLoggedIn from './NavBarLoggedIn';
import { useNavigate } from 'react-router';

function LoggedIn() {
    const navigate = useNavigate();
    // Want to be able to get a whole empty list at the beginning
    const [passwordList, setPasswordList] = useState([]);

    // want to be able to insert password URL and passwords
    // we start with an empty state first 
    const [passwordURL, setPasswordURL] = useState('');
    const [passwordPassword, setPasswordPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editing, setEditing] = useState({
        isEditing: false,
        // is this an object? What type is it?
        editingPasswordId: '',
        // originalPasswordURL: '',
        // originalPasswordPassword: ''
    });
    const [username, setUsername] = useState('');

    const [options, setOptions] = useState({
        alphabet: false,
        numerals: false,
        symbols: false
    });

    // this is to help out with generatingRandomPassword
    const [length, setLength] = useState(12);
    const [lengthError, setlengthError] = useState(false);
    
    // more states for sharing password
    const [sharing, setSharing] = useState({
        isSharing: false,
        sharingPasswordId: '',
    });
    const [sharedUser, setSharedUser] = useState('');

    // This function talks to the backend to retrieve this
    async function getAllPassword() {
        const response = await axios.get('/api/passwordManager/');
        setPasswordList(response.data);
    }

    // Talks to the backend to delete this password
    async function deletePassword(passwordId) {
        await axios.delete('/api/passwordManager/' + passwordId);
        
        await getAllPassword();
        window.location.reload();
        
    }

    // We want to insert a new URL and password
    async function insertPassword() {
        setErrorMessage('')
        try {
            const passwordOptions = {
                URL: passwordURL,
                Password: passwordPassword,
                Options: options,
                Length:length,
            };
            if (editing.isEditing) {
                await axios.put('/api/passwordManager/' + editing.editingPasswordId, passwordOptions);
            } else {
                await axios.post('/api/passwordManager/', passwordOptions);
            }
    


            // if (editing.isEditing) {
            //     await axios.put('/api/passwordManager/' + editing.editingPasswordId, {
            //         URL: passwordURL,
            //         Password: passwordPassword,
            //     });
            // } else {
            //     await axios.post('/api/passwordManager/', {
            //         URL: passwordURL,
            //         Password: passwordPassword,
            //     });
            // }
            // This is so the fields get cleared out
            setPasswordURL('');
            setPasswordPassword('');
            setEditing({
                isEditing: false,
                editingPasswordId: '',
            });
            await getAllPassword();
        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    function updatePasswordURL(event) {
        setPasswordURL(event.target.value);
    }

    function updatePasswordPassword(event) {
        setPasswordPassword(event.target.value);
    }

    function updateSharedPerson(event) {
        setSharedUser(event.target.value);
        
    }

    function updateLength(event) {
        let value = event.target.value;
        if (value >= 4 && value <= 50) {
            setlengthError(false)
            setLength(value)
        } else {
            setlengthError(true)
        }
    }

    const handleCheckboxChange = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.checked
        });
    };

    function setEditingPassword(passwordURL, passwordPassword, passwordId) {
        setPasswordURL(passwordURL);
        setPasswordPassword(passwordPassword);
        setEditing({
          isEditing: true, 
          editingPasswordId: passwordId
    });
    }

    function setSharingPassword() {
        setSharing({
            isSharing:true,
            sharingPasswordId: '',
        })
    }



    function onCancel() {
        setPasswordURL('');
        setPasswordPassword('');
        setEditing({
          isEditing: false, 
          editingPasswordId: '',
    });
    }

    async function isLoggedIn() {
        try {
            const response = await axios.get('/api/users/loggedIn');
            // why is this small letter username?
            const username = response.data.username;
            setUsername(username);
        } catch (e) {
            navigate('https://nathanyap-akshayrao-project3.onrender.com/mainPage')
        }
     
    }

    function onStart() {
        isLoggedIn()
          .then(() => {
            getAllPassword()
          })
      }  

    // function onStart() {
    //     getAllPassword();
    // }

    // This allows the passwords to be shown when page is mounted
    useEffect(onStart, [])

    // When you first start the program, it is important to print it out
    // for the screen, this will do it here
    const passwordListElement= [];
    for(let i = 0; i < passwordList.length; i++) {
        passwordListElement.push(<li><span>URL: {passwordList[i].URL}</span>
        <span> || Password: {passwordList[i].Password}</span>
        <button onClick={() => deletePassword(passwordList[i]._id)}>Delete</button>
        {/* first we create a button -> Somehow we want the edit button to be able to change the URL and the password
        We need to somehow allow the change of state */}
        <button onClick={() => setEditingPassword(passwordList[i].URL, passwordList[i].Password, passwordList[i]._id)}>Edit</button>
        <button onClick={() => setSharingPassword()}>Share</button>
        </li>)

    } 

    let inputFieldTitleText;
    if (editing.isEditing) {
        inputFieldTitleText = "Edit Password";
    } else {
        inputFieldTitleText = "Add New Password";
    }

    let submitButton;
    if (editing.isEditing) {
        submitButton = "Save Edits";
    } else {
        submitButton = "Add New Password";
    }

    let PasswordGeneratorAssistComponent;
    if (editing.isEditing) {
        PasswordGeneratorAssistComponent = <div></div>
    } else {
        PasswordGeneratorAssistComponent = <div>
                                                <div>
                                                    <input type="checkbox" name="alphabet" checked={options.alphabet} onChange={handleCheckboxChange}/>
                                                    <label for="alphabet">Alphabet</label>
                                                </div>
                                                <div>
                                                    <input type="checkbox" name="numerals" check={options.numerals} onChange={handleCheckboxChange}/>
                                                    <label for="numerals">Numerals</label>
                                                </div>
                                                <div>
                                                    <input type="checkbox" name="symbols" check={options.symbols} onChange={handleCheckboxChange}/>
                                                    <label for="symbols">Symbols</label>
                                                </div>
                                                <div>
                                                    <label for="length">Password Length</label>
                                                    <input type="number" name="length" placeholder={12} onChange={updateLength}/>
                                                    {lengthError && <div style={{ color: 'red' }}>Password can only be a length between 4-50 inclusive.</div>}                                        
                                                </div>
                                            </div>
        
    }

    let PasswordSharingComponent;
    if (sharing.isSharing) {
        PasswordSharingComponent = <div>
                                    <input type="text" placeholder="Enter username to share with" onChange={updateSharedPerson}/>
                <button type="submit">Share</button>


                                    </div>
    } else {
        PasswordSharingComponent = <div></div>
    }


    // {errorMessage && <h1>{errorMessage}</h1>}
    let errorComponent;
    if (errorMessage) {
        errorComponent = <h1>{errorMessage}</h1>
    }

    if(!username) {
        return <div>Loading...</div>
    }


    return(
        <div>
            <NavBarLoggedIn yourName={username}/>
            <body>
                <div className="content">
                    <section>
                        <div className="container">
                            <h2 className="text-center">Your Passwords <u>{username}</u></h2>
                                <div className="management-box">
                                    {/* I dont understand this specific line of code - why need && */}
                                    {errorComponent}

                                    <ul>
                                        {passwordListElement}
                                    </ul>
                                    <div>{inputFieldTitleText}</div>
                                    {/* <div>Add New Password</div> */}
                                    <div>
                                        <div>
                                            <label>URL:</label> <input value={passwordURL} onInput={(event) => updatePasswordURL(event)}/>
                                        </div>
                                        <div>
                                            <label>Password:</label> <input value={passwordPassword} onInput={(event) => updatePasswordPassword(event)}/>
                                        </div>
                                            {PasswordGeneratorAssistComponent}
                                        <div>
                                        </div>
                                            {PasswordSharingComponent}
                                        <div>
                                            <button onClick={() => insertPassword()}>{submitButton}</button>
                                            <button onClick={() => onCancel()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>          
                        </div>
                    </section>
                </div>
            </body>
        </div>
    )
}

export default LoggedIn;


