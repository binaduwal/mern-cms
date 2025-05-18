import  { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useAddItemMutation,useUpdateItemMutation } from '../../app/services/QuerySettings';
const ServiceCardForm = ({ onComplete}) => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    desc: '',  });

  const passedEditService = location.state?.editService || null;


const [addService, { isLoading: isAdding }] = useAddItemMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateItemMutation();


 useEffect(() => {
 if (passedEditService) {
      setFormData(passedEditService);
    }

  else{
    setFormData({ title: '', summary: '', desc: '' });
  }
  }, [passedEditService]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
if(passedEditService && passedEditService._id){ 
      await updateService({url: `/services/edit/${passedEditService._id}`, 
 data: formData }).unwrap();
      alert('Service updated successfully!');
}  
    else{
      await addService({ url: '/services/create', data: formData }).unwrap();
      alert('Service added successfully!');

    }
    setFormData({ title: '', summary: '', desc: '' });
    onComplete?.()
    navigate('/admin/services');
} catch (error) {
  console.error(error)
}    
  };

    const isLoading = isAdding || isUpdating;


  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {passedEditService ? 'Edit Service Card' : 'Add New Service Card'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
                        disabled={isLoading}

            required
          />
        </div>

        <div>
          <label htmlFor="summary" className={labelClass}>
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            className={inputClass}
            disabled={isLoading}
            placeholder="A short summary for the card"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className={labelClass}>
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            rows="5"
            className={inputClass}
            placeholder="Detailed description"
          />
        </div>


        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Submitting...' : (passedEditService ? 'Update Service' : 'Add Service')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceCardForm;