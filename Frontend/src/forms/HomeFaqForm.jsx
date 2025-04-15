import React, { useState } from "react";
import CustomButton from "../reusables/CustomButton";
import InputField from "../reusables/InputField";
import { IoSave } from "react-icons/io5";

const HomeFaqForm = () => {
  const [homeFaq, setHomeFaq] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    
    if (
      name === "question" ||
      name === "answer" 
     
    ) {
      setHomeFaq({ ...homeFaq, [name]: capitalizeFirstLetter(value) });
    } else {
      setHomeFaq({ ...homeFaq, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (homeFaq.question.length < 20 || homeFaq.question.length > 60) {
      tempErrors.question = "Question must be between 20-60 characters.";
    }
    if (homeFaq.answer.length < 15 ) {
      tempErrors.answer = "answer must be at least 15 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("New FAQ Added");
      console.log("Faq Data:", homeFaq);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
      <CustomButton type="submit" color="bg-green-500" width="md:w-[20%] ml-auto" icon={<IoSave/>}>Post</CustomButton>
        <h5 className="bg-indigo-100 p-2 mb-6 leading-relaxed">HOME FAQ's</h5>
        <div>
          <h5 className=" mb-3">Question</h5>
          <InputField
            type="text"
            name="question"
            placeholder="Banner Title"
            value={homeFaq.question}
            onChange={handleChange}
            required
            error={errors.question}
          />
          </div>

        <div>
          <h5 className=" mb-3 ">Answer</h5>
          <InputField
            type="textarea"
            name="answer"
            placeholder="Write answer here..."
            value={homeFaq.answer}
            onChange={handleChange}
            error={errors.answer}
            required
          />
        </div>   
      </section>
    </form>
  );
};

export default HomeFaqForm;
