import React from 'react';
import logo from '../../assets/whatBytes_logo.png';
import profile from '../../assets/profile-photo.png'
const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-5 py-3 border-b-2 border-gray-300'> {/* Border bottom with light grey color */}
            <div className='w-40'>
                <img src={logo} alt='logo' />
            </div>
            <div className='flex items-center gap-2 lg:border-2 lg:border-gray-300 rounded-md lg:px-1 lg:py-2 cursor-pointer'>
                <div className='rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center'>
                    <img src={profile} width={25} />
                </div>
                <p className='hidden lg:block font-bold'>Rahil Siddique</p>
            </div>
        </div>
    );
};

export default Navbar;
