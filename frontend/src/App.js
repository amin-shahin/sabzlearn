import React from 'react'
import routes from "./routes"
import { useRoutes } from 'react-router-dom'
import "./App.css"
import AuthContextProvider from './contexts/AuthContext'
import InfosIndexProvider from './contexts/InfosIndexContext'


export default function App() {


  let router = useRoutes(routes)
  return (
    <div>
    <AuthContextProvider>
      <InfosIndexProvider>
        {router}
      </InfosIndexProvider>
    </AuthContextProvider>
    </div>
  )
}
