// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import service from '../../appwrite/services';
// import parse from 'html-react-parser';
// import Frame from 'react-frame-component';

// function Editor() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [template, setTemplate] = useState({});
//   const [content, setContent] = useState('');
//   const frameRef = useRef(null);
//   const clickedElementRef = useRef(null);

//   useEffect(() => {
//     service.getTemplate(id)
//       .then((template) => {
//         if (template) {
//           setTemplate(template);
//           setLoading(false);
//         } else {
//           console.log('No template found');
//         }
//       });
//   }, [id]);

//   const handleClick = (event) => {
//     const target = event.target;
//     const tagName = target.tagName;
//     clickedElementRef.current = target; // Store the clicked element reference
//     if (tagName.toLowerCase() === 'img') {
//       setContent(target.src);
//     } else {
//       setContent(target.innerHTML);
//     }
//     console.log('Tag Name:', tagName);
//     console.log('Content:', content);
//   };

//   useEffect(() => {
//     const frame = frameRef.current;
//     if (frame) {
//       const handleLoad = () => {
//         frame.contentWindow.document.addEventListener('click', handleClick);
//       };
//       frame.addEventListener('load', handleLoad);
//       return () => {
//         frame.removeEventListener('load', handleLoad);
//         if (frame.contentWindow) {
//           frame.contentWindow.document.removeEventListener('click', handleClick);
//         }
//       };
//     }
//   }, [template]);

//   useEffect(() => {
//     if (clickedElementRef.current) {
//       if (clickedElementRef.current.tagName.toLowerCase() === 'img') {
//         clickedElementRef.current.src = content;
//       } else {
//         clickedElementRef.current.innerHTML = content;
//       }
      
//     }
//   }, [content]);

//   const handleChange = (event) => {
//     setContent(event.target.value);
//   };

//   const downloadHTML = () => {
//     const element = document.createElement('a');
//     const file = new Blob([template.templateContent], { type: 'text/html' });
//     element.href = URL.createObjectURL(file);
//     element.download = 'template.html';
//     document.body.appendChild(element); // Required for this to work in FireFox
//     element.click();
//     document.body.removeChild(element);
//   };

//   return (
//     <div className='w-full h-full flex flex-col md:grid md:grid-cols-12'>
//       {loading && <div className='text-xl font-semibold'>Loading...</div>}
//       {!loading &&
//         <div className='w-full h-[60vh] md:h-[100vh] md:col-start-1 md:col-end-8'>
//           <Frame style={{ width: '100%', height: '100vh', padding:'1rem' }} ref={frameRef}>
//             {parse(String(template.templateContent))}
//             {/* <div dangerouslySetInnerHTML={{ __html: template.templateContent}} /> */}
//           </Frame>
//         </div>
//       }
//       {loading && <div className='text-xl font-semibold'>Loading...</div>}
//       {!loading &&
//         <div className='w-full h-[40vh] md:h-full md:col-start-8 md:col-end-13 bg-slate-300'>
//           {content === '' ? (
//             <div className='w-full text-center text-xl font-semibold'>Click on the content to get the HTML</div>
//           ) : (
//             <div className='w-full'>
//               <div className='w-full text-center text-xl font-semibold border-b border-black/20'>
//                 Selected Content
//               </div>
//               <div className='w-full h-full border border-black/20'>
//                 <div className='w-full p-4 border-2 rounded-lg border-black/20'>
//                   <textarea
//                     className='w-full h-full bg-transparent p-0 m-0'
//                     value={content}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//           <button onClick={downloadHTML} className='mt-4 p-2 bg-blue-500 text-white rounded'>
//             Download HTML
//           </button>
//         </div>
//       }
//     </div>
//   );
// }

// export default Editor;

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../../appwrite/services';
import parse from 'html-react-parser';
import Frame from 'react-frame-component';

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState({});
  const [content, setContent] = useState('');
  const frameRef = useRef(null);
  const clickedElementRef = useRef(null);

  useEffect(() => {
    service.getTemplate(id)
      .then((template) => {
        if (template) {
          setTemplate(template);
          setLoading(false);
        } else {
          console.log('No template found');
        }
      });
  }, [id]);

  const handleClick = (event) => {
    const target = event.target;
    const tagName = target.tagName;
    clickedElementRef.current = target; // Store the clicked element reference
    if (tagName.toLowerCase() === 'img') {
      setContent(target.src);
    } else {
      setContent(target.innerHTML);
    }
    console.log('Tag Name:', tagName);
    console.log('Content:', content);
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (frame) {
      const handleLoad = () => {
        frame.contentWindow.document.addEventListener('click', handleClick);
      };
      frame.addEventListener('load', handleLoad);
      return () => {
        frame.removeEventListener('load', handleLoad);
        if (frame.contentWindow) {
          frame.contentWindow.document.removeEventListener('click', handleClick);
        }
      };
    }
  }, [template]);

  useEffect(() => {
    if (clickedElementRef.current) {
      if (clickedElementRef.current.tagName.toLowerCase() === 'img') {
        clickedElementRef.current.src = content;
      } else {
        clickedElementRef.current.innerHTML = content;
      }
    }
  }, [content]);

  const handleChange = (event) => {
    setContent(event.target.value);
    if (clickedElementRef.current) {
      if (clickedElementRef.current.tagName.toLowerCase() === 'img') {
        clickedElementRef.current.src = event.target.value;
      } else {
        clickedElementRef.current.innerHTML = event.target.value;
      }
    }
  };

  const handlePreview = () => { 
    const updatedContent = frameRef.current.contentWindow.document.body.innerHTML; 
    navigate('/preview', { state: { templateContent: updatedContent } }); };

  return (
    <div className='w-full h-full flex flex-col md:grid md:grid-cols-12'>
      {loading && <div className='text-xl font-semibold'>Loading...</div>}
      {!loading &&
        <div className='w-full h-[60vh] md:h-[100vh] md:col-start-1 md:col-end-8'>
          <Frame style={{ width: '100%', height: '100vh' }} ref={frameRef}>
            {parse(String(template.templateContent))}
          </Frame>
        </div>
      }
      {loading && <div className='text-xl font-semibold'>Loading...</div>}
      {!loading &&
        <div className='w-full h-[40vh] md:h-full md:col-start-8 md:col-end-13 bg-slate-300'>
          {content === '' ? (
            <div className='w-full h-full text-center text-xl font-semibold'>Click on the content to get the HTML</div>
          ) : (
            <div className='w-full'>
              <div className='w-full text-center text-xl font-semibold border-b border-black/20'>
                Selected Content
              </div>
              <div className='w-full h-full border border-black/20'>
                <div className='w-full p-4 border-2 rounded-lg border-black/20'>
                  <textarea
                    className='w-full h-full bg-transparent p-0 m-0'
                    value={content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
          <button onClick={handlePreview} className='mt-4 p-2 bg-blue-500 text-white rounded'>
            Preview & Download HTML
          </button>
        </div>
      }
    </div>
  );
}

export default Editor;

