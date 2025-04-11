import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PageView = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/pages/${slug}`).then(res => {
      setPage(res.data);
    });
  }, [slug]);

  if (!page)
     return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h4 className="text-black font-bold">{page.title}</h4>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};  

export default PageView;
