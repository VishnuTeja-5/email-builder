import React, { useState } from 'react';
import { cn } from '../../lib/utils';

function TemplateOne() {

    const data = {
        head: {
            logo: 'https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            heading: 'Big Sale is Here ..!'
        },
        cover: {
            save: 'Save 40%*',
            text: 'On New Purchases. No Minimum required',
            button: 'Visit Our Site',
            link: 'https://www.google.com'
        },
        services: {
            support: {
                image: 'https://img.freepik.com/free-vector/call-center_24877-49036.jpg?t=st=1737297532~exp=1737301132~hmac=74923d337f2185447af04a91f8ed2a405573622c7d5ff428b7109051a5019152&w=740',
                text: '24/7 Support'
            },
            delivery: {
                image: 'https://img.freepik.com/free-vector/call-center_24877-49036.jpg?t=st=1737297532~exp=1737301132~hmac=74923d337f2185447af04a91f8ed2a405573622c7d5ff428b7109051a5019152&w=740',
                text: 'Free Delivery'
            },
            deal: {
                image: 'https://img.freepik.com/free-vector/call-center_24877-49036.jpg?t=st=1737297532~exp=1737301132~hmac=74923d337f2185447af04a91f8ed2a405573622c7d5ff428b7109051a5019152&w=740',
                text: "Today's Deal"
            }
        },
        offers: {
            text: 'Discover other offers expiring in 36 hours',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolorem magnam eaque nulla ut eligendi magni ex recusandae minima omnis tenetur tempore fugit velit, architecto dolores ratione iusto amet expedita.'
        },
        footer: {
            text: 'made by vishnu'
        }

    };


    return (
        <div className={cn('max-w-[500px] p-2 flex flex-col flex-shrink h-full mx-auto border-2 border-blue-400 shadow-md bg-[#161a20]')}>
            <div className={cn('w-full flex flex-col border border-orange-400 rounded-lg')}>
                <div style={{
                    width: '100%',
                    height: 'aut0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5rem'
                    }}>
                    <img style={{ 
                        width: '5rem',display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',  
                        }} src={data.head.logo} alt='logo' />
                </div>
                <h1 style={{
                    width: '100%',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '3rem',
                    padding: '0.5rem',
                    textAlign: 'center',
                    }}>
                    {data.head.heading}
                </h1>
            </div>
            <div className='w-full h-auto flex justify-center items-center'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <h2 className='text-4xl text-center font-semibold text-orange-500'>{data.cover.save}</h2>
                    <h3 className='text-center text-orange-700'>
                        {data.cover.text}
                    </h3>
                    <div className='w-full p-12 flex justify-center items-center'>
                        <a href={data.cover.link} target='_blank'>
                            <button className='px-2 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 hover:scale-105 hover:rotate-2 text-white duration-200'>
                                {data.cover.button}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-wrap'>
                <div className='w-36 p-4 m-auto flex flex-col justify-center items-center'>
                    <img className='w-full p-4' src={data.services.support.image} alt='support image' />
                    <h2 className='text-orange-500'>{data.services.support.text}</h2>
                </div>
                <div className='w-36 p-4 m-auto flex flex-col justify-center items-center'>
                    <img className='w-full p-4' src={data.services.delivery.image} alt='delivery image' />
                    <h2 className='text-orange-500'>{data.services.delivery.text}</h2>
                </div>
                <div className='w-36 p-4 m-auto flex flex-col justify-center items-center'>
                    <img className='w-full p-4' src={data.services.deal.image} alt='call image' />
                    <h2 className='text-orange-500'>{data.services.deal.text}</h2>
                </div>
            </div>
            <div className='p-4'>
                <h3 className='text-center text-orange-500'>{data.offers.text}</h3>
                <p className='text-justify p-1 text-slate-300'> {data.offers.description}</p>
            </div>
            <div className='w-full text-center text-white'>
            {data.footer.text}
            </div>
        </div>
    )
}

export default TemplateOne