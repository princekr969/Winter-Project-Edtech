import React from "react";
import { useState } from "react";

const ModuleContext = React.createContext();

const ModuleContextProvider = ({children}) => {
        const [selectedLesson, setSelectedLesson] = useState({
                title: "Getting Started",
                videoUrl: "https://example.com/video1"
        });
    
        return(
            <ModuleContext.Provider value={{selectedLesson, setSelectedLesson}}>
                {children}
            </ModuleContext.Provider>
        )
}
  
export {ModuleContext, ModuleContextProvider}