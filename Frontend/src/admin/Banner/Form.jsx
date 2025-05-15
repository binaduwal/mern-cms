import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';import {
  useAddBannerMutation,
  useGetBannerByIdQuery,
  useUpdateBannerMutation
} from '../../app/services/BannerApi';
import toast from 'react-hot-toast'; 

const API_BASE_URL = 'http://localhost:3000'; 

const Form = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id); 
  const navigate = useNavigate();

   const { data: existing, isLoading: loadingExisting } = useGetBannerByIdQuery(id, {
    skip: !isEditMode
  });


    const [formData, setFormData] = useState({
        heading: '',
        paragraph: '', 
        image: {
          alt: ''
        },
        button: {
          text: '',
          link: '',
        },
      });
    
      const [imageFile, setImageFile] = useState(null);
      const [imagePreview, setImagePreview] = useState(''); 

      const [addBanner, { isLoading: adding, error: addApiError, isSuccess: addSuccess }] = useAddBannerMutation();
      const [updateBanner,{ isLoading: updating, error: updateApiError, isSuccess: updateSuccess }] = useUpdateBannerMutation();

    useEffect(() => {
    if (existing) {
      setFormData({
        heading: existing.heading,
        paragraph: existing.paragraph,
        image: { alt: existing.image.alt },
        button: { text: existing.button.text, link: existing.button.link }
      });
      if (existing.image?.url) {
        setImagePreview(`${API_BASE_URL}${existing.image.url}`);
      }
    }
  }, [existing, isEditMode]); 



      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleNestedChange = (e, parentKey) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [name]: value,
          },
        }));
      };
      
      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImageFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0])); 
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const submitData = new FormData();
        submitData.append('heading',    formData.heading);
        submitData.append('paragraph',  formData.paragraph);
        submitData.append('alt',        formData.image.alt);
        submitData.append('btnText',    formData.button.text);
        submitData.append('btnLink',    formData.button.link);
        
        // Only append image if a new one is selected
        if (imageFile) {
          submitData.append('image', imageFile);
        }

        try {
          if (isEditMode) {
            await updateBanner({ id, formData: submitData }).unwrap();
            toast.success('Banner updated successfully!');
          } else {
            await addBanner(submitData).unwrap();
            toast.success('Banner added successfully!');
            // Reset form only on successful add
            setFormData({
              heading: '',
              paragraph: '',
              image: { alt: '' },
              button: { text: '', link: '' },
            });
            setImageFile(null);
            setImagePreview('');
          }
          navigate('/admin/banner'); // Or '/admin/banner-table' if that's your table route
        } catch (err) {
          const action = isEditMode ? 'update' : 'add';
          toast.error(`Failed to ${action} banner: ${err.data?.message || err.error || 'Server error'}`);
          console.error(`Failed to ${action} banner:`, err);
        }
      };

        if (isEditMode && loadingExisting) return <p className="text-center p-4">Loading banner details…</p>;

    // Consolidate loading and error states
    const isLoading = adding || updating || (isEditMode && loadingExisting);
    const apiError = addApiError || updateApiError; // Choose the relevant error
    const isSuccess = addSuccess || updateSuccess; // Choose the relevant success

    return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isEditMode ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-xl">
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="heading"
                id="heading"
                value={formData.heading}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
    
            <div>
              <label htmlFor="paragraph" className="block text-sm font-medium text-gray-700 mb-1">
                Paragraph <span className="text-red-500">*</span>
              </label>
              <textarea
                name="paragraph"
                id="paragraph"
                value={formData.paragraph}
                onChange={handleChange}
                rows="3"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
    
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Image Details</legend>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Image {isEditMode ? '(Optional: Change Image)' : <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file" 
                    name="imageFile"
                    accept="image/*"
                    id="imageFile"
                    onChange={handleImageChange}
                    required={!isEditMode} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-1">Current/New Image Preview:</p>
                      <img src={imagePreview} alt="Banner Preview" className="max-h-48 rounded border border-gray-300" />
                    </div>
                  )}
                  {imageFile && (
                    <p className="mt-2 text-sm text-gray-600">Selected file: {imageFile.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-1">
                    Image Alt Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="alt"
                    id="imageAlt"
                    value={formData.image.alt}
                    onChange={(e) => handleNestedChange(e, 'image')}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </fieldset>
    
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Button Details</legend>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="buttonText"
                    value={formData.button.text}
                    onChange={(e) => handleNestedChange(e, 'button')}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Link/URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" 
                    name="link"
                    id="buttonLink"
                    value={formData.button.link}
                    onChange={(e) => handleNestedChange(e, 'button')}
                    required
                    placeholder="/contact-us or https://example.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </fieldset>
    
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
              >
                {isLoading 
                  ? (isEditMode ? 'Updating Banner...' : 'Adding Banner...') 
                  : (isEditMode ? 'Update Banner' : 'Add Banner')}
              </button>
            </div>
          </form>
        </div>
      );
    };

export default Form;