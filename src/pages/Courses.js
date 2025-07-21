import { useEffect, useState } from "react";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.BASE_URL;

    useEffect(() => {
        // Fetch courses data from the server or any other source
        const fetchCourses = async () => {
            try {
            const response = await fetch(`${BASE_URL}/courses`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    const courses = data || [];
                    setCourses(courses);
                    console.log("Courses fetched successfully:", courses);
                } else {
                    setError(data.message || "Failed to fetch courses");
                }
            } catch (err) {
                setError("Network error");
            }
            setLoading(false);
        };
        fetchCourses();
    }, []);

    //map through the courses and display them
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (courses.length === 0) {
        return <div>No courses available</div>;
    }
    
    // Display the courses
    const courseItems = courses.map((course) => (
        <div key={course.id} className="course-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h2>{course.course_name}</h2>
            <p>{course.desc}</p>
            <p>Duration: {course.duration}</p>
        </div>
    ));

    return (  <div>
        <h1>Courses Page</h1>

       <div className="course-container" style={{ padding: '20px', textAlign: 'center' , backgroundColor: '#f0f0f0',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <div className="course-list" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' ,alignItems: 'center', gap: '20px', flexWrap: 'wrap', flexBasis:'50%'}}>

            {courseItems}
           
          
        </div>
       </div>
    </div>);
}

export default Courses;