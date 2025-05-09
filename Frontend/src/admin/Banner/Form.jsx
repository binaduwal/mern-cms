import React, { useState } from 'react';
import { useAddBannerMutation } from '../../app/services/BannerApi'
import { useNavigate } from 'react-router-dom';
const Form = () => {
    const [formData, setFormData] = useState({
        heading: '',
        paragraph: '', 
        image: {
          url: '',
          alt: ''
        },
        button: {
          text: '',
          link: '',
        },
      });
    
      const [addBanner, { isLoading, error: apiError, isSuccess }] = useAddBannerMutation();
      const navigate = useNavigate();
    
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.heading || !formData.paragraph || !formData.image.url || !formData.image.alt || !formData.button.text || !formData.button.link) {
          alert('Please fill all required fields.'); 
          return;
        }
    
        try {
          await addBanner(formData).unwrap();
        //   toast.success('Banner added successfully!');
          alert('Banner added successfully!');
          setFormData({
            heading: '',
            paragraph: '',
            image: { url: '', alt: '' },
            button: { text: '', link: '' },
          });
          navigate('/admin/banner'); 
        } catch (err) {
          alert(`Failed to add banner: ${err.data?.message || err.error || 'Server error'}`);
          console.error('Failed to add banner:', err);
        }
      };
    return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Banner</h2>
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
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file" 
                    name="url"
                    id="imageUrl"
                    value={formData.image.url}
                    onChange={(e) => handleNestedChange(e, 'image')}
                    required
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                {isLoading ? 'Adding Banner...' : 'Add Banner'}
              </button>
            </div>
            {isSuccess && <p className="mt-2 text-center text-green-600">Banner added successfully!</p>}
            {apiError && <p className="mt-2 text-center text-red-600">Error: {apiError.data?.message || 'Failed to add banner'}</p>}
          </form>
        </div>
      );
    };

export default Form