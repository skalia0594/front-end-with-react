export const fetchStudentProfiles = async () => {
    const response = await fetch('https://www.hatchways.io/api/assessment/students', {
        method : 'GET',
    });
    const { students } = await response.json();
    return students;
}    