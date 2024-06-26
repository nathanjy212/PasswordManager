import React from 'react'
import ReactDOM from 'react-dom/client'
import LoggedIn from './LoggedIn.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import MainPage from './MainPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"



const router = createBrowserRouter([
  {
    path: "/",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/mainPage",
    element: <MainPage />
  },
  {
    path: "/passwordManager",
    element: <LoggedIn />
  }
])


// const router = createBrowserRouter([
   
//   {
//     path: "/",
//     element: <MainPage />
//   },
//   {
//     path: "/about",
//     element: <About />
//   },
//   {
//     path: "/passwordManager",
//     element: <LoggedIn />
//   }
// ])



// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <MainPage /> */}
//     <About/>
//     {/* <Contact/> */}
//     {/* <LoggedIn/> */}
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


