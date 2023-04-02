import AlertContext from "./alertContext";
import Alert from "../../components/Alert"
import { useState } from "react";

const AlertState = (props) => {
    const [alert, setALert] = useState(null);
    const showAlert = (message, type) => {
        setALert({
          msg : message,
          type : type,
        }) 
        setTimeout(() => {
          setALert(null)
        }, 1900);
      }
    const g = "Hello"
    return(
        <AlertContext.Provider value={{g, showAlert}}>
            <Alert alert={alert}/>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState