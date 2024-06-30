import React from 'react';
import LogoPng from "../images/logo.png";
import Loading from './Loading';

const LogoLoadingScreen = () => {
  return (
    <div className='w-screen h-screen bg-white flex flex-col justify-center items-center'>
        <img src={LogoPng} alt="logo" className='max-w-96' />
        <Loading />
    </div>
  )
}

export default LogoLoadingScreen