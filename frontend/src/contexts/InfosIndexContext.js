import { createContext, useEffect, useState } from "react";

const InfosIndexContext = createContext()

const InfosIndexProvider = ({children}) => {
    const [infos,setInfos] = useState({})

    useEffect(()=>{
       const fetchData = async () =>{
        const res = await fetch(`http://localhost:4000/v1/infos/index`)
        const result = await res.json()
        setInfos(result)
        console.log(result);
       }
       fetchData()
       
    },[])
    return ( 
        <InfosIndexContext.Provider
        value={{
            infos
        }}
        >
            {children}
        </InfosIndexContext.Provider>
     );
}
export {InfosIndexContext}
export default InfosIndexProvider;