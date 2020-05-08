import React from 'react';
import { ApiDataContext } from '../data/ApiDataContext';

export const Grades = (props) => {
    const [students, setStudents] = React.useContext(ApiDataContext);

    const [tagInput, setTagInput] = React.useState("");
    const grades = props.student.grades.map((grade,index) =>  <div key={index}>Test {index+1} : {grade}%</div>);
    const handleChange = (event) => {
        const {value} = event.target;
        setTagInput(value);
    } 
    const record = students.filter(std => std.id === props.student.id)[0];
   
    const addTag = (event) => {
        event.preventDefault();
        const tags = [...new Set([...(record.tags || []), tagInput])];   
        setTagInput('');
        setStudents(prevStudents => 
            prevStudents.map(std => 
                (std.id === props.student.id)? {...std,tags}:std
            )
        );
    }   
    return (
        <div>
            {grades}
            {record.tags && <div className='tags'>{record.tags.map((tag,index) => <div className='tag' key={index}>{tag}</div>)}</div> }
            <div>
                <form onSubmit={addTag}>
                    <input type='text' className='add-tag-input' value={tagInput} onChange={handleChange} placeholder='Add a tag' maxLength={20} />
                </form>
            </div>
        </div>
    );
} 