import React from 'react';
import { useLocation } from 'react-router-dom';

function Preview() {
  const location = useLocation();
  const { templateContent } = location.state || {};

  const downloadHTML = () => {
    const element = document.createElement('a');
    const file = new Blob([templateContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'template.html';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <button onClick={downloadHTML} className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Download HTML
      </button>
      <div className='w-full h-[80vh] border border-black/20 p-4'>
        <iframe
          style={{ width: '100%', height: '100%' }}
          srcDoc={templateContent}
          title='Preview'
        />
      </div>
      
    </div>
  );
}

export default Preview;
