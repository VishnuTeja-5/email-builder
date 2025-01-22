import React, { useEffect, useState } from 'react'
import { selectUserData } from '../store/authSlice';
import { useSelector } from 'react-redux';
import service from '../../appwrite/services';
import { Link } from 'react-router-dom';
// import { TemplateOne } from '../index';
function Dashboard() {
  const user = useSelector(selectUserData);
  const [templates, setTemplates] = useState([])
  useEffect(() =>{
    service.getTemplates([])
      .then((tempalates) => {
        if (tempalates) {
          setTemplates(tempalates.documents)
        }
        else{
          console.log('No templates found');
        }
      })
  },[])

  
  return templates.length>0? (
    <>
    <div className='w-full h-full p-4'>
      <h1 className='w-full h-full font-semibold text-3xl'>Dashboard</h1>
       
      <h2 className='w-full h-full text-xl'>Welcome, 
      <span className='text-lg'> Choose a template from below to start </span> 
      </h2>
    </div>
    <div className='w-full h-full p-4'>
      <h1 className='text-2xl '>Templates</h1>
      <div className='w-full h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 wrap'>
      {
        templates.map((template) => (
          <Link to={`/edit/${template?.$id}`} key={template?.$id}>
          <div className='max-w-[16rem] p-4 border border-blue-500 rounded-md'
           >
            <img src={template?.Image} alt={template?.Name} />
            <h2 className='w-full text-center font-semibold text-xl'>{template?.Name}</h2>
            {/* <p>{template.templateContent}</p> */}
            {/* <p>{template.templateData}</p> */}
          </div>
          </Link>))
      }
      
      
      </div>
    </div>
    </>
  ) : ( null)
}

export default Dashboard