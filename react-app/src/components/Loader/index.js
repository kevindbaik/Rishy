import React from 'react';
import { Puff } from 'react-loader-spinner';
import './Loader.css'

function Loading() {
  return (
    <div className="loader-container">
      <Puff color="#212124fc" height={90} width={90} />
      <p className='loading-text'>loading...</p>
    </div>
  );
}

export default Loading;
