import React, { useCallback, useState } from 'react'
import { IoSave } from 'react-icons/io5';
import CustomButton from '../reusables/CustomButton';
import InputField from '../reusables/InputField';
import { useDropzone } from 'react-dropzone';
import { RxCross1 } from 'react-icons/rx';

const WelcomeSectionForm = () => {
    const [welcomeForm, setWelcomeForm] = useState({
        title: "",
        content: "",
        list_1:"",
        list_2:"",
        list_3:"",
        list_4:"",
      });
 
      const handleChange = (e) => {
        const { name, value } = e.target;
        const capitalizeFirstLetter = (text) => {
          return text.charAt(0).toUpperCase() + text.slice(1);
        };
        
        if (
          name === "title" ||
          name === "content" ||
          name === "list_1" ||
          name === "list_2" ||
          name=="list_3" ||
          name=="list_4"
          
        ) {
          setWelcomeForm({ ...welcomeForm, [name]: capitalizeFirstLetter(value) });
        } else {
          setWelcomeForm({ ...welcomeForm, [name]: value });
        }
      };
    
      const [errors, setErrors] = useState({});
      const validate = () => {
        const tempErrors = {};
    
        if (welcomeForm.title.length < 5 || welcomeForm.title.length > 25) {
          tempErrors.title = "Full Name must be between 5-25 characters.";
        }
        if (welcomeForm.content.length < 15 ) {
          tempErrors.content = "Content must be at least 15 characters.";
        }
        if (welcomeForm.list_1.length < 5 || welcomeForm.list_1.length > 25) {
          tempErrors.list_1 = "Text must be between 5-25 characters.";
        }
        if (welcomeForm.list_2.length < 5 || welcomeForm.list_2.length > 25) {
          tempErrors.list_2 = "Text must be between 5-25 characters.";
        }
        if (welcomeForm.list_3.length < 5 || welcomeForm.list_3.length >25) {
          tempErrors.list_3 = "Text must be between 5-25 characters.";
        }
        if (welcomeForm.list_4.length < 5 || welcomeForm.list_4.length > 25) {
          tempErrors.list_4 = "Text must be between 5-25 characters.";
        }
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
    
      // Handling image files
      const [image, setImage] = useState([]);
    
      const onDrop = useCallback(
        (acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result;
              setImage((prevImages) => [...prevImages, base64String]);
            };
    
            if (file) {
              reader.readAsDataURL(file);
            }
          });
        },
        [image]
      );
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
        multiple: true,
      });
    
      const handleDeleteImage = (index) => {
        setImage((prevImages) => prevImages.filter((_, idx) => idx !== index));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          const newWelcome = {
            id: new Date().getTime(),
            ...welcomeForm,
            images: image,
          };
          alert("Welcome Section Updated");
          console.log("Welcome Section Details:", newWelcome);
        }
        // setImage([]);
        // setForm({ title: "", content: "" });
      };
    
    
  return (
    <form onSubmit={handleSubmit}>
    <section className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
    <CustomButton type="submit" color="bg-green-500" width="md:w-[20%] ml-auto" icon={<IoSave/>}>Post</CustomButton>

      <h5 className="bg-indigo-100 p-2 mb-6 leading-relaxed">WELCOME SECTION</h5>
      <div>
        <h5 className=" mb-3">Title</h5>
        <InputField
          type="text"
          name="title"
          placeholder="Title"
          value={welcomeForm.title}
          onChange={handleChange}
          required
          error={errors.title}
        />
        </div>
        <section>
        <h5 className=" mb-3">List</h5>
        <div className=' space-y-3'>
        <InputField
          type="text"
          name="list_1"
          placeholder="1st list .."
          value={welcomeForm.list_1}
          onChange={handleChange}
          required
          error={errors.list_1}
        />
        <InputField
          type="text"
          name="list_2"
          placeholder="2nd list .."
          value={welcomeForm.list_2}
          onChange={handleChange}
          required
          error={errors.list_2}
        />
        <InputField
          type="text"
          name="list_3"
          placeholder="3rd list .."
          value={welcomeForm.list_3}
          onChange={handleChange}
          required
          error={errors.list_3}
        />
        <InputField
          type="text"
          name="list_4"
          placeholder="4th list .."
          value={welcomeForm.list_4}
          onChange={handleChange}
          required
          error={errors.list_4}
        />
        </div>
        </section>

      <section>
        <h5 className=" mb-3 ">Content</h5>
        <InputField
          type="textarea"
          name="content"
          placeholder="Write your content here..."
          value={welcomeForm.content}
          onChange={handleChange}
          error={errors.content}
          required
        />
      </section>
        <section>
        <h5 className=" mb-3 ">Welcome Section Image</h5>

          {/* Conditionally render the Dropzone if no image has been uploaded */}
          {image.length < 2 && (
            <div
              {...getRootProps()}
              className={`border-[2.5px] border-indigo-300 h-[8rem] border-dashed rounded-lg p-6 content-center text-center cursor-pointer ${
                isDragActive ? "bg-gray-100" : ""
              }`}
            >
              <input {...getInputProps()} required/>
              <h6 className=" font-jamjure">
                Drop files here or click to upload.
              </h6>
            </div>
          )}

          {/* Preview Uploaded Image */}
          <div className="my-[1rem] grid grid-cols-2 gap-8">
              {image?.map((item, idx) => (
                <div key={idx} className="relative z-[20] h-[10rem] ">
                  <img src={item} className="rounded-lg h-full w-full" alt="Preview" />
                  <RxCross1
                    className="text-[2.3rem] bg-white/40 backdrop-blur-lg absolute top-2 right-2 p-1.5 rounded-md cursor-pointer"
                    onClick={() => handleDeleteImage(idx)}
                  />
                </div>
              ))}
            </div>
        </section>
     
    </section>
  </form>
  )
}

export default WelcomeSectionForm
