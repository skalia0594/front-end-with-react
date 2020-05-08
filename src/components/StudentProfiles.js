import React from 'react';
import { ApiDataContext } from '../data/ApiDataContext';
import { Student } from './Student'


export default function StudenProfiles(){
    const [students] = React.useContext(ApiDataContext);
    const [searchByName, setSearchByName] = React.useState('');
    const [searchByTag, setSearchByTag] = React.useState('');
    const [suggesionList, setSuggesionList] = React.useState(students);
    const [tagSuggesionList, setTagSuggesionList] = React.useState([]);
    
    const handleNameChange = (event) => {
        const {value} = event.target;
        setSearchByName(value);
        let suggesionList = students;
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            const firstNameList = students.sort().filter(student => regex.test(student.firstName));
            const lastNameList = students.sort().filter(student =>regex.test(student.lastName));
            suggesionList = [...new Set([...firstNameList, ...lastNameList])];
        }
       
        setSuggesionList(suggesionList);
    }
    const handleTagChange = (event) => {
        
        // set state again 
        const regex1 = new RegExp(`^${searchByName}`,'i')
        const firstNameList = students.sort().filter(student => regex1.test(student.firstName));
        const lastNameList = students.sort().filter(student =>regex1.test(student.lastName));
        const suggesionList = [...new Set([...firstNameList, ...lastNameList])];
        setSuggesionList(suggesionList);
        //set state again

        const {value} = event.target;
        setSearchByTag(value);
        let tagList = [...suggesionList];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            const studentsWithtags = suggesionList.filter(student =>
                student.tags    
            );
            tagList= studentsWithtags.map(student => [student.id, student.tags.filter(tag => regex.test(tag))])
            // console.log(tagList); 
            let studentids = [];
            for(let i=0 ; i<tagList.length; i++){
                if(tagList[i][1].length>0){
                    studentids.push(tagList[i][0])
                }   
            }   
            // console.log(studentids);
            const tagSuggesionList = studentids.map(id => students.filter(student => student.id === id)[0]);
            // console.log(tagSuggesionList);
            setTagSuggesionList(tagSuggesionList);
        }
        
        else setTagSuggesionList(suggesionList);
    }
    
    
    const studentsList = () => {
         if (searchByTag) return (tagSuggesionList.map(student => <Student key = {student.id} student={student} />));
         else if (suggesionList.length>0)  return (suggesionList.map(student => <Student key = {student.id} student={student} />));
         else return students.map(student => <Student key = {student.id} student={student} />)
    }
     
    return (
        <div>
            <div className='filterName'>
                <input type='text' id= 'name-input' value={searchByName} onChange={handleNameChange} placeholder='Search by name' maxLength={20} />
            </div>
            <div className='filterTag'>
                <input type='text' id='tag-input' value={searchByTag} onChange={handleTagChange} placeholder='Search by tags' maxLength={20}/>
            </div>
            <div className="list">
                {studentsList()}
            </div>
        </div>
    );
    
}


