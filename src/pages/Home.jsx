import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { RiBarChartFill } from "react-icons/ri";
import { TfiMedallAlt } from "react-icons/tfi";
import { FaRegFile } from "react-icons/fa";

const Home = () => {
    const links = [
        {
            element: 'Dashboard',
            path: '/dashboard',
            logo: <RiBarChartFill />
        },
        {
            element: 'Skill Test',
            path: '/',
            logo: <TfiMedallAlt />
        },
        {
            element: 'Internship',
            path: '/internship',
            logo: <FaRegFile />,
        },
    ];

    const [selected, setSelected] = useState('Skill Test');

    return (
        <div className='font-custom h-full'>
            <div className='sm:flex h-full'>
                {/* Sidebar for larger screens */}
                <div className='w-[15%] hidden sm:block  border-r-2 border-gray-300 font-bold text-gray-600 text-[.95rem] px-2'>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        {links.map((link) => (
                            <li
                                key={link.element}
                                onClick={() => setSelected(link.element)}
                                className={`cursor-pointer`}
                            >
                                <Link to={link.path}>
                                    <div
                                        className={`flex gap-5 items-center p-4 transition-all duration-300 ${selected === link.element
                                            ? 'bg-blue-100 text-blue-600 rounded-r-full'
                                            : ''
                                            }`}
                                    >
                                        <div className='text-lg sm:text-3xl lg:text-2xl'>
                                            {link.logo}
                                        </div>
                                        <div>
                                            <span className='hidden lg:block'>
                                                {link.element}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* For mobile screens */}
                <div className='w-full block sm:hidden'>
                    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300'>
                        <ul className='flex justify-around p-2'>
                            {links.map((link) => (
                                <li
                                    key={link.element}
                                    onClick={() => setSelected(link.element)}
                                    className={`cursor-pointer`}
                                >
                                    <Link to={link.path}>
                                        <div
                                            className={`flex flex-col items-center p-2 transition-all duration-300 ${selected === link.element
                                                ? 'text-blue-600'
                                                : 'text-gray-600'
                                                }`}
                                        >
                                            <div className='text-lg sm:text-3xl lg:text-2xl'>
                                                {link.logo}
                                            </div>
                                            <span className='text-xs'>{link.element}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Outlet for page content */}
                <div className='w-full sm:w-[85%]'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
