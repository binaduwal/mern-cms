import React, { useCallback, useState } from "react";
import InputField from "../reusables/InputField";
import CustomButton from "../reusables/CustomButton";
import { RxCross1 } from "react-icons/rx";
import { IoSave } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

const EventForm = () => {
  const [form, setForm] = useState({
  title: "",
  content: "",
  location: "",
  address: "",
  start_date: "",  
  start_time: "",  
  end_date: "",    
  end_time: "", 

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    
    if (
      name === "title" ||
      name === "content" ||
      name === "address" ||
      name === "location"
    ) {
      setForm({ ...form, [name]: capitalizeFirstLetter(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (form.title.length < 5 || form.title.length > 25) {
      tempErrors.title = "Full Name must be between 5-25 characters.";
    }
    if (form.content.length < 15 ) {
      tempErrors.content = "Content must be at least 15 characters.";
    }
    if (form.location.length < 5 || form.location.length > 15) {
      tempErrors.location = "Location must be between 5-25 characters.";
    }
    if (form.address.length < 5 || form.address.length > 15) {
      tempErrors.address = "Address must be between 5-25 characters.";
    }
    if (!form.start_date) {
      tempErrors.start_date = "Start date is required.";
    }
    if (!form.start_time) {
      tempErrors.start_time = "Start time is required.";
    }
    if (!form.end_date) {
      tempErrors.end_date = "End date is required.";
    }
    if (!form.end_time) {
      tempErrors.end_time = "End time is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handling image files
  const [image, setImage] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (image.length + acceptedFiles.length > 5) {
        window.alert("You can upload a maximum of 5 images.");
        return;
      }

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
      const newEvent = {
        id: new Date().getTime(),
        ...form,
        images: image,
      };
      alert("New Event Posted");
      console.log("Event Details:", newEvent);
    }
    // setImage([]);
    // setForm({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex justify-end gap-4 sticky">
        <CustomButton type="submit" color="bg-green-500" width="lg:w-[10%]">
          <span className="flex items-center justify-center gap-2">
            <IoSave className="text-[1.2rem]" />
            Post
          </span>
        </CustomButton>
        <CustomButton
          onClick={() => setForm({ title: "", content: "" })}
          type="button"
          width="lg:w-[10%]"
          color="bg-[#de163a]"
        >
          <span className="flex items-center justify-center gap-2">
            <RxCross1 className="text-[1.2rem]" />
            Cancel
          </span>
        </CustomButton>
      </section>
      <div className="grid grid-cols-5 gap-6 my-6">
        <div className=" col-span-5 lg:col-span-3">
        <div className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
          <h5 className="bg-indigo-100 p-2 mb-6">GENERAL</h5>
          <section>
            <h5 className="font-jamjure mb-2">Title</h5>
            <InputField
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              required
              error={errors.title}
            />
          </section>

          <section>
            <h5 className="font-jamjure mb-2">Content</h5>
            <InputField
              type="textarea"
              name="content"
              placeholder="Write your content here..."
              value={form.content}
              onChange={handleChange}
              error={errors.content}
              required
            />
          </section>
          </div>
            <div className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md mt-[2rem]">
            <h5 className=" bg-indigo-100 p-2 ">LOCATION AND TIME</h5>
            <section>
              <h6 className="mb-2">LOCATION</h6>
              <InputField
                type="text"
                name="location"
                placeholder=" Location"
                value={form.location}
                onChange={handleChange}
                required
                error={errors.location}
              />
            </section>

            <section>
              <h6 className="mb-2">Address</h6>
              <InputField
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
                error={errors.address}
              />
            </section>
            <div className=" flex flex-col lg:flex-row gap-4 justify-between">
            <section>
              <h6 className=" mb-2 ">Event Starts *</h6>
              <section className=" flex flex-col lg:flex-row justify-between gap-4">
              <InputField type="date" name="start_date" value={form.start_date} required error={errors.start_date} onChange={handleChange}/>
              <InputField type="time" name="start_time" value={form.start_time} required error={errors.start_time} onChange={handleChange}/>
              </section>
            </section>
            <section>
            <h6 className=" mb-2 ">Event Ends *</h6>
            <section className=" flex justify-between flex-col lg:flex-row gap-4">
            <InputField type="date" name="end_date" value={form.end_date} required error={errors.end_date} placeholder="End time" onChange={handleChange}/>
            <InputField type="time" name="end_time" value={form.end_time} required error={errors.end_time} onChange={handleChange}/>
            </section>
            </section>

            </div>
            </div>
        </div>

        <div className="space-y-8 h-fit col-span-5 lg:col-span-2">
          <div className="flex-1 bg-white p-4 lg:p-6 drop-shadow rounded-md">
            <h5 className="bg-indigo-100 p-2 mb-6">EVENT IMAGES</h5>

            {/* Conditionally render the Dropzone if less than 5 images have been uploaded */}
            {image.length < 5 && (
              <div
                {...getRootProps()}
                className={`border-[2.5px] border-indigo-300 h-[8rem] border-dashed rounded-lg p-4 lg:p-6 content-center text-center cursor-pointer ${
                  isDragActive ? "bg-gray-100" : ""
                }`}
              >
                <input {...getInputProps()} required />
                <h6 className="font-jamjure">Drop files here or click to upload.</h6>
              </div>
            )}

            {/* Preview Uploaded Images */}
            <div className="my-[1rem] grid grid-cols-2 gap-4">
              {image?.map((item, idx) => (
                <div key={idx} className="relative z-[20] h-[8rem] ">
                  <img src={item} className="rounded-lg h-full w-full" alt="Preview" />
                  <RxCross1
                    className="text-[2.3rem] bg-white/40 backdrop-blur-lg absolute top-2 right-2 p-1.5 rounded-md cursor-pointer"
                    onClick={() => handleDeleteImage(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </form>
  );
};

export default EventForm;
