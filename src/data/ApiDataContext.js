import React from 'react';
import { fetchStudentProfiles } from './api';

export const ApiDataContext = React.createContext();

export const ApiDataContextProvider = (props) => {
    const [students, setStudents] = React.useState([]);
    const getStudentProfiles = async () => {
        const data = await fetchStudentProfiles();
        setStudents(Object.values(data));
    }
    React.useEffect(() => {
        getStudentProfiles()
    }, []);
    // const test = students.map(std => console.log(std));
    return(
        <ApiDataContext.Provider value={[students, setStudents]}>
            {props.children}
        </ApiDataContext.Provider>
    );

}

