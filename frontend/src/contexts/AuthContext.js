import { createContext, useCallback, useEffect, useState } from "react";
import { json } from "react-router-dom";

const AuthContext = createContext()

const AuthContextProvider =({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [token,setToken] = useState(null)
    const [userInfos,setUserInfos] = useState({})

    const login = ((userInfos,token)=>{
      setToken(token)
      setUserInfos(userInfos)
      setIsLoggedIn(true)
      localStorage.setItem('user',JSON.stringify({ token }))
  },[])
    const logout = useCallback(()=>{
      setToken(null)
      setUserInfos({})
      localStorage.removeItem('user')
  })

    useEffect(()=>{
      const localStorageData =JSON.parse(localStorage.getItem('user'))
      if(localStorageData){
        fetch(`http://localhost:4000/v1/auth/me`,{
          headers:{
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => res.json())
        .then(userData => {
          setIsLoggedIn(true)
          setUserInfos(userData)
        })
      }
      // console.log(localStorageData);
    },[login])


  return(
    <AuthContext.Provider 
    value={{
        isLoggedIn,setIsLoggedIn,
        token,setToken,
        userInfos,setUserInfos,
        login,logout
    }}
    >
    {children}
    </AuthContext.Provider>
  )
}
 export {AuthContext}
export default AuthContextProvider;