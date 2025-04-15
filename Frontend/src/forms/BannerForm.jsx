import React, { useCallback, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CustomButton from "../reusables/CustomButton";
import InputField from "../reusables/InputField";
import { IoSave } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

const BannerForm = () => {
  const [bannerForm, setBannerForm] = useState({
    title: "",
    content: "",
    button_text:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    
    if (
      name === "title" ||
      name === "content" ||
      name ==="button_text"
     
    ) {
      setBannerForm({ ...bannerForm, [name]: capitalizeFirstLetter(value) });
    } else {
      setBannerForm({ ...bannerForm, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (bannerForm.title.length < 5 || bannerForm.title.length > 40) {
      tempErrors.title = "Full Name must be between 5-25 characters.";
    }
    if (bannerForm.content.length < 15 ) {
      tempErrors.content = "Content must be at least 15 characters.";
    }
    if (bannerForm.button_text.length < 5 || bannerForm.button_text.length > 15 ) {
      tempErrors.button_text = " Text must be between 5-15 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [image, setImage] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (image.length + acceptedFiles.length > 1) {
        window.alert("You can only upload one image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage([base64String]);
      };

      if (acceptedFiles[0]) {
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [image]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],
    multiple: false,
  });

  const handleDeleteImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newBanner = {
        id: new Date().getTime(),
        ...bannerForm,
        image: image[0] || null,
      };
      alert("New Banner Added");
      console.log("banner Data:", newBanner);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
      <CustomButton type="submit" color="bg-green-500" width="md:w-[20%] ml-auto" icon={<IoSave/>}>Post</CustomButton>

        <h5 className="bg-indigo-100 p-2 mb-6 leading-relaxed">LANDING BANNER</h5>
        <section className=" flex justify-between gap-8">
        <div className=" flex-1">
          <h5 className=" mb-3">Title</h5>
          <InputField
            type="text"
            name="title"
            placeholder="Banner Title"
            value={bannerForm.title}
            onChange={handleChange}
            required
            error={errors.title}
          />
          </div>
          <div className=" flex-1">
          <h5 className=" mb-3">Button Text</h5>
          <InputField
            type="text"
            name="button_text"
            placeholder="Button Text Here.."
            value={bannerForm.button_text}
            onChange={handleChange}
            required
            error={errors.button_text}
          />
          </div>
        </section>

        <div>
          <h5 className=" mb-3 ">Content</h5>
          <InputField
            type="textarea"
            name="content"
            placeholder="Write your content here..."
            value={bannerForm.content}
            onChange={handleChange}
            error={errors.content}
            required
          />
        </div>
          <div>
          <h5 className=" mb-3 ">Banner Image</h5>

            {/* Conditionally render the Dropzone if no image has been uploaded */}
            {image.length === 0 && (
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
            <div className="my-[1rem]">
              {image?.map((item, idx) => (
                <div key={idx} className="relative z-[20] h-[8rem] w-fit">
                  <img
                    src={item}
                    className=" rounded-lg h-full"
                    alt="Preview"
                  />
                  <RxCross1
                    className="text-[2.3rem] bg-white/40 backdrop-blur-lg absolute top-2 right-2 p-1.5 rounded-md cursor-pointer"
                    onClick={() => handleDeleteImage(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
       
      </section>
    </form>
  );
};

export default BannerForm;
