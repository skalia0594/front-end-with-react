import React from 'react';


export const Grades = (props) => {
    const [tagInput, setTagInput] = React.useState("");
    const [allTags, setAllTags] = React.useState([]);
    const grades = props.student.grades.map((grade,index) =>  <div key={index}>Test {index+1} : {grade}%</div>);
    const handleChange = (event) => {
        const {value} = event.target;
        setTagInput(value);
    } 
    const addTag = (event) => {
        event.preventDefault();
        const tags = [...new Set([...allTags, tagInput])];    
        setAllTags(tags);
        setTagInput('');
    }   
    return (
        <div>
            {grades}
            {allTags && <div className='tags'>{allTags.map((tag,index) => <div className='tag' key={index}>{tag}</div>)}</div> }
            <div>
                <form onSubmit={addTag}>
                    <input type='text' className='add-tag-input' value={tagInput} onChange={handleChange} placeholder='Add a tag' maxLength={20} />
                </form>
            </div>
        </div>
    );
} 