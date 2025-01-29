import React from "react"; 
import ModuleContext from "./moduleContext";
import { useState } from "react";

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
export default ModuleContextProvider