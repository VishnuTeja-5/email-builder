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
    event.preventDefault(); // Prevent navigation
    const target = event.target;
    const tagName = target.tagName;
    clickedElementRef.current = target; // Store the clicked element reference
    if (tagName.toLowerCase() === 'a') {
      setContent(target.getAttribute('href'));
    } else if (tagName.toLowerCase() === 'img') {
      setContent(target.src);
    } else {
      setContent(target.innerHTML);
    }
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
      if (clickedElementRef.current.tagName.toLowerCase() === 'a') {
        clickedElementRef.current.setAttribute('href', content || 'placeholder');
      } else if (clickedElementRef.current.tagName.toLowerCase() === 'img') {
        clickedElementRef.current.src = content || ' placeholder';
      } else {
        clickedElementRef.current.innerHTML = content || ' placeholder';
      }
    }
  }, [content]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setContent(newValue);
    if (clickedElementRef.current) {
      if (clickedElementRef.current.tagName.toLowerCase() === 'a') {
        clickedElementRef.current.setAttribute('href', newValue || ' placeholder');
      } else if (clickedElementRef.current.tagName.toLowerCase() === 'img') {
        clickedElementRef.current.src = newValue || ' placeholder';
      } else {
        clickedElementRef.current.innerHTML = newValue || ' placeholder';
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
        <div className='w-full h-[40vh] md:h-full flex flex-col items-center md:col-start-8 md:col-end-13 bg-slate-300'>
          {content === '' ? (
            <div className='w-full h-full text-center text-xl font-semibold'>Click on the content to get the HTML</div>
          ) : (
            <div className='w-full flex flex-col gap-1'>
              <div className='w-full text-center text-xl font-semibold border-b border-black/20'>
                Selected Content
              </div>
              <p className='w-full py-1 italic text-center'>*Note: to change navigation links click outside area of button *</p>
              <p className='w-full py-1 italic text-center'>*to change images paste your image link</p>
              <div className='w-full h-full'>
                <div className='w-full p-4 border-2 rounded-lg border-black/20'>
                  <p></p>
                  <textarea
                    className='w-full h-full bg-transparent p-0 m-0'
                    value={content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
          <button onClick={handlePreview} className='p-2 bg-blue-500 text-white hover:bg-blue-700 rounded'>
            Preview
          </button>
        </div>
      }
    </div>
  );
}

export default Editor;



