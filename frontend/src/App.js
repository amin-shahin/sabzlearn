import React from 'react'
import routes from "./routes"
import { useRoutes } from 'react-router-dom'
import "./App.css"
import AuthContextProvider from './contexts/AuthContext'


export default function App() {


  let router = useRoutes(routes)
  return (
    <div>
    <AuthContextProvider>
      {router}
    </AuthContextProvider>
    </div>
  )
}
