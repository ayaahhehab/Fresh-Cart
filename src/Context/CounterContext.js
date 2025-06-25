import { createContext, useState } from "react";

export  let CounterContext = createContext();

export default function CounterContextProvider(props){
    const [counter, setcounter] = useState(0);
    
console.log(props);

    return<CounterContext.Provider value={{counter}}>
        {props.children }
    </CounterContext.Provider>
}