import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="container">
      <ThreeDots
        width={150}
        height={150}
        radius="9"
        color={'orange'}
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translate(50%, -50%)',
        }}
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
