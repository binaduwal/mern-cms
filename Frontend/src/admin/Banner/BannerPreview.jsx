import { useParams, Link } from 'react-router-dom';
import { useGetBannerByIdQuery } from '../../app/services/BannerApi';
import { FaArrowLeft } from 'react-icons/fa';
import {apiSlice} from '../../app/services/ApiSlice'

const BannerPreview = () => {
  const { id } = useParams();
  const { data: banner, error, isLoading, isFetching } = useGetBannerByIdQuery(id);

  if (isLoading || isFetching) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading banner preview...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">Error loading banner: {error.data?.message || error.status}</p></div>;
  }

  if (!banner) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Banner not found.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md">
        <Link to="/admin/banner" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <FaArrowLeft className="mr-2" /> Back to Banner List
        </Link>
      </div>
      <div className="container mx-auto py-8 px-4">
        {banner.image?.url && (
          <div
            className="relative w-full h-[60vh] bg-cover bg-center rounded-lg shadow-xl overflow-hidden group mb-6"
            style={{ 
    backgroundImage: `url(${banner.image.url})` 
            }}            title={banner.image.alt || banner.heading}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-6">
              {banner.heading && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight break-words">
                  {banner.heading}
                </h1>
              )}
              {banner.paragraph && (
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl break-words">
                  {banner.paragraph}
                </p>
              )}
              {banner.button && banner.button.text && banner.button.link && (
                <a
                  href={banner.button.link.startsWith('http') ? banner.button.link : `http://${banner.button.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md text-xl transition duration-300 ease-in-out transform group-hover:scale-105"
                >
                  {banner.button.text}
                </a>
              )}
            </div>
          </div>
        )}
        {!banner.image?.url && (
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold mb-4">{banner.heading}</h1>
                <p className="text-lg text-gray-700 mb-6">{banner.paragraph}</p>
                {banner.button && banner.button.text && banner.button.link && (
                     <a
                        href={banner.button.link.startsWith('http') ? banner.button.link : `http://${banner.button.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md text-xl"
                    >
                        {banner.button.text}
                    </a>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default BannerPreview;