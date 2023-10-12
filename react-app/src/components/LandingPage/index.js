import './LandingPage.css'

function LandingPage() {
  return(
    <div className='landing-bgimage-container'>
      <div id='landing-header-container'>
        <h3 className='landing-header-1'>Explore endless inspirations.</h3>
        <h4 className='landing-header-2'>Join the Rishy community, express your creative self, share personal experiences</h4>
        <h4 className='landing-header-3'>...all with the sound of music.</h4>
        <button className='landing-join-button'>Get Started</button>
        <button className='landing-demo-button'>Visit as Demo User</button>
      </div>
      <div className='landing-bgimage1'></div>
      <div className='landing-bgimage2'></div>
      <div className='landing-bgimage3'></div>
      <div className='landing-bgimage4'></div>
      <div className='landing-bgimage5'></div>
    </div>
  )
};

export default LandingPage;
