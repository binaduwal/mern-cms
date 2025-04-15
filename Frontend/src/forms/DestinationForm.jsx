import React, { useCallback, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CustomButton from "../reusables/CustomButton";
import InputField from "../reusables/InputField";
import { IoSave } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

const DestinationForm = () => {
  const [destinationForm, setDestinationForm] = useState({
    country_name: "",
    country_summary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    
    if (
      name === "country_name" ||
      name === "country_summary" 
     
    ) {
      setDestinationForm({ ...destinationForm, [name]: capitalizeFirstLetter(value) });
    } else {
      setDestinationForm({ ...destinationForm, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (destinationForm.country_name.length < 5 || destinationForm.country_name.length > 20) {
      tempErrors.country_name = "Full Name must be between 5-20 characters.";
    }
    if (destinationForm.country_summary.length < 50 || destinationForm.country_summary.length > 100 ) {
      tempErrors.country_summary = "Country summary must be betn 50-100 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [countryImage, setCountryImage] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (countryImage.length + acceptedFiles.length > 1) {
        window.alert("You can only upload one image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setCountryImage([base64String]);
      };

      if (acceptedFiles[0]) {
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [countryImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],
    multiple: false,
  });

  const handleDeleteImage = (index) => {
    setCountryImage((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newCountry = {...countryForm, countryImage: countryImage[0] || null};
      alert("New Banner Added");
      console.log("banner Data:", newCountry);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
      <CustomButton type="submit" color="bg-green-500" width="md:w-[20%] ml-auto" icon={<IoSave/>}>Post</CustomButton>

        <h5 className="bg-indigo-100 p-2 mb-6 leading-relaxed">COUNTRY INFO</h5>
        <div>
          <h5 className=" mb-3">Country Name</h5>
          <InputField
            type="text"
            name="country_name"
            placeholder="Country Name"
            value={destinationForm.country_name}
            onChange={handleChange}
            required
            error={errors.country_name}
          />
          </div>

        <div>
          <h5 className=" mb-3 ">Summary</h5>
          <InputField
            type="textarea"
            name="country_summary"
            placeholder="Write your content here..."
            value={destinationForm.country_summary}
            onChange={handleChange}
            error={errors.country_summary}
            required
          />
        </div>
          <div>
          <h5 className=" mb-3 ">Country Image</h5>

            {/* Conditionally render the Dropzone if no image has been uploaded */}
            {countryImage.length === 0 && (
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
              {countryImage?.map((item, idx) => (
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

export default DestinationForm;
