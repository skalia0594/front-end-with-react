import React from 'react';
import { Grades } from './Grades'

const average = (student) => {
    const sum = student.grades.reduce((total, num)=> (total + Math.round(num)), 0);
    const length = student.grades.length;
    return length>0 ? (sum / length) : 0;
}
   
export const Student = (props) => {
    const [toggleGrades, setToggleGrades] = React.useState(false);
    return(
        <div className = 'student'>
            <div>
                <img className="image" src={props.student.pic} alt= 'Not found'/>
            </div>
            <div className='content'>
                <div className='name'>{props.student.firstName} {props.student.lastName}</div>
                <div>Email : {props.student.email}</div>
                <div>Company : {props.student.company}</div>
                <div>Skill : {props.student.skill}</div>
                <div>Average : {average(props.student)}%</div>
                <div className='grades'>{toggleGrades &&  <Grades student={props.student} />}</div>
            </div>
            <div>
                <button className='expand-btn' onClick={() => setToggleGrades(!toggleGrades)}>{toggleGrades?'-':'+'}</button>
            </div>
        </div>
    );
}
