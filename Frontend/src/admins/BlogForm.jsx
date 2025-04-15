import React, { useState, useCallback } from "react";
import InputField from "../reusables/InputField";
import { RxCross1 } from "react-icons/rx";
import { useDropzone } from "react-dropzone";
import CustomButton from "../reusables/CustomButton";
import { IoSave } from "react-icons/io5";

const BlogForm = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    meta_content: "",
    meta_title: "",
    meta_keywords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (form.title.length < 5 || form.title.length > 25) {
      tempErrors.title = "Title must be between 5-25 characters.";
    }
    if (form.content.length < 15 || form.content.length > 200) {
      tempErrors.content = "Content must be between 15-200 characters.";
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
      const newBlog = {
        id: new Date().getTime(),
        ...form,
        image: image[0] || null,
      };
      alert("New Blog Posted");
      console.log("blogs Data:", newBlog);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     <section className=" flex justify-end gap-4 sticky ">
            <CustomButton type="submit" color="bg-green-500" width="lg:w-[10%]" ><span className=" flex items-center justify-center gap-2"><IoSave className=" text-[1.2rem]"/>Post</span></CustomButton>
            <CustomButton onClick={()=>setForm("")} type="button" width="lg:w-[10%]" color="bg-[#de163a]" ><span className=" flex items-center justify-center gap-2"><RxCross1 className=" text-[1.2rem]"/>Cancel</span></CustomButton>
          </section>
      <div className="grid grid-cols-5 w-full gap-8">
        <div className="bg-white p-6 drop-shadow flex-1 space-y-6 rounded-md h-fit col-span-5 lg:col-span-3">
          <h5 className="bg-indigo-100 p-2 mb-6">GENERAL</h5>
          <section>
            <h6 className="font-jamjure mb-2">Title</h6>
            <InputField
              type="text"
              name="title"
              placeholder="Post Title"
              value={form.title}
              onChange={handleChange}
              required
              error={errors.title}
            />
          </section>

          <section>
            <h6 className="font-jamjure mb-2">Category</h6>
            <InputField
              type="select"
              name="category"
              placeholder="Select Category"
              value={form.category}
              onChange={handleChange}
              options={["Careers", "Education", "Destination", "Visa"]}
              required
              error={errors.category}
            />
          </section>

          <section>
            <h6 className="font-jamjure mb-2">Content</h6>
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
        
        <div className=" space-y-8 col-span-5  lg:col-span-2">
          <div className="flex-1 bg-white p-6 drop-shadow rounded-md">
            <h5 className="bg-indigo-100 p-2 mb-6">BLOG IMAGES</h5>

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
        </div>
        <div className=" bg-white p-6 shadow rounded-md space-y-6 col-span-5  lg:col-span-3">
            <h5 className=" bg-indigo-100 p-2">META TAG</h5>
            <section>
              <h6 className="font-jamjure mb-2">Meta Title</h6>
              <InputField
                type="text"
                name="meta_title"
                placeholder="Meta Title"
                value={form.meta_title}
                onChange={handleChange}
                required
                error={errors.meta_title}
              />
            </section>

            <section>
              <h6 className="font-jamjure mb-2">Meta Keywords</h6>
              <InputField
                type="text"
                name="meta_keywords"
                placeholder="Meta Keywords"
                value={form.meta_keywords}
                onChange={handleChange}
                required
                error={errors.meta_keywords}
              />
            </section>

            <section>
              <h6 className="font-jamjure mb-2">Meta Description</h6>
              <InputField
                type="textarea"
                name="meta_content"
                placeholder="Write your content here..."
                value={form.meta_content}
                onChange={handleChange}
                error={errors.meta_content}
                required
              />
            </section>
          </div>
      </div>
    </form>
  );
};

export default BlogForm;
