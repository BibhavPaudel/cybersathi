import React from 'react';
import M from 'materialize-css';
const CreateCourse = () => {
    const [bannerPreview, setBannerPreview] = React.useState(null);
    const [courseName, setCourseName] = React.useState('');
    const [courseDescription, setCourseDescription] = React.useState('');
    const [duration, setDuration] = React.useState("");



    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setBannerPreview(null);
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "instamern"); // replace with your Cloudinary cloud name

        const res = await fetch("https://api.cloudinary.com/v1_1/instamern/image/upload", {
            method: "POST",
            body: data
        });
        const result = await res.json();
        return result.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("courseBanner");
        let bannerUrl = null;
        if (fileInput && fileInput.files[0]) {
             bannerUrl = await uploadImageToCloudinary(fileInput.files[0]);
        }
        // Now you can use bannerUrl along with courseName, courseDescription, and duration
        // e.g., send to your backend or display a success message
        // console.log({
        //     courseName,
        //     courseDescription,
        //     duration,
        //     bannerUrl
        // });

        fetch(`${BASE_URL}/createcourse`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            method: "POST",
            body: JSON.stringify({
                coursename: courseName,
                desc: courseDescription,
                duration: duration,
                banner: bannerUrl
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                M.toast({ html: `${data.result}`, classes: 'rounded green' });
            })
            .catch(error => {
                console.log("Error:", error);
            });
    };


    return (
        <div className="create-course" style={{ padding: '20px', width: '50%', margin: 'auto' }}>
            <h1>Create Course</h1>
            <form>
                <div className="input-field">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        type="text"
                        id="courseName"
                        placeholder="Enter Course Name"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        required
                    />

                </div>
                <div className="input-field">
                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea
                        id="courseDescription"
                        className="materialize-textarea"
                        placeholder="Enter Course Description"
                        value={courseDescription}
                        onChange={e => setCourseDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="input-field">
                    <label htmlFor="courseDuration">Course Duration (in weeks)</label>
                    <input
                        type="number"
                        id="courseDuration"
                        placeholder="Enter Course Duration (in weeks)"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field" style={{ marginBottom: '50px' }}>
                    <label htmlFor="courseBanner" style={{ marginTop: '10px' }}>Course Banner Image</label>
                    <input type="file" id="courseBanner" accept="image/*" onChange={handleBannerChange} />
                </div>
                {bannerPreview && (
                    <div style={{ marginBottom: '20px', textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        <p>Banner Preview:</p>
                        <img src={bannerPreview} alt="Banner Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                    </div>
                )}
                <button type="submit" onClick={handleSubmit} className="btn waves-effect waves-light">Create Course</button>
            </form>
        </div>
    );
}

export default CreateCourse;