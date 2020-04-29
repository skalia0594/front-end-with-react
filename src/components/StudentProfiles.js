import React from 'react';
import { fetchStudentProfiles } from '../data/api';
import { Student } from './Student'

export default class StudenProfiles extends React.Component {
    
    state = {
        searchByName: '',
        searchByTag: '',
        allStudentsProfiles: [],
        suggesionList : [],
    }
    componentDidMount() {
        this.getStudentProfiles();
    }
    getStudentProfiles = async () => {
        const students = await fetchStudentProfiles();
        // console.log(students);
        this.setState({
            allStudentsProfiles :  students,
            suggesionList : students
        });
    }
    handleNameChange = (event) => {
        const {value} = event.target;
        this.setState({ searchByName : value});
        let suggesionList = this.state.allStudentsProfiles;
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            const firstNameList = this.state.allStudentsProfiles.sort().filter(student => regex.test(student.firstName));
            const lastNameList = this.state.allStudentsProfiles.sort().filter(student =>regex.test(student.lastName));
            suggesionList = [...new Set([...firstNameList, ...lastNameList])];
        }
        // console.log(suggesionList);
        this.setState({ suggesionList : [...suggesionList]  });
    }
    

    handleTagChange = () => {

    }
    render() {
        const studentsList = this.state.suggesionList && (this.state.suggesionList.map(student =>
            <Student key = {student.id} student={student} />));    
        return (
            <div>
                <div className='filterName'>
                    <input type='text' id= 'name-input' value={this.state.searchByName} onChange={this.handleNameChange} placeholder='Search by name' maxLength={20} />
                </div>
                <div className='filterTag'>
                    <input type='text' id='tag-input' value={this.state.searchByTag} onChange={this.handleTagChange} placeholder='Search by tags' maxLength={20}/>
                </div>
                <div className="list">
                    {studentsList}
                </div>
            </div>
        );
    }
}
