import './App.css';
import Job from './JobComponent'
import jobs from './data.json'
import React , {useState,useEffect} from 'react';
function App() {
  const [filterParams, setFilterParams] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    function changeBackground() {
      const screenWidth = window.innerWidth; // Get the current screen width
      let newBackgroundImage = '';

      // Define the URL of the background images for different screen sizes
      if (screenWidth < 675) {
        newBackgroundImage = './images/bg-header-mobile.svg';
      } else {
        newBackgroundImage = './images/bg-header-desktop.svg';
      }

      // Update the background image state
      setBackgroundImage(newBackgroundImage);
    }

    // Call changeBackground initially and add a resize event listener
    changeBackground();
    window.addEventListener('resize', changeBackground);

    // Cleanup: Remove the resize event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', changeBackground);
    };
  }, []); // Empty dependency array ensures that this effect runs only once


  const addToFilterParams = (value) => {
    if (!filterParams.includes(value)) {
      setFilterParams([...filterParams, value]);
    }
  };
  
  const removeFromFilterParams = (value) => {
    setFilterParams(filterParams.filter(item => item !== value));
  };

  const filteredJobs = filterParams.length === 0 ? jobs : jobs.filter(job => {
    return filterParams.every(param => {
      return job.level === param || job.languages.includes(param);
    });
  });
  
  return (
    <>
     <div className='bg-header'>
        <img className='bg-header-img' src={backgroundImage}></img>
      </div>
      {filterParams.length ? <div className='search-bar'>
        <button className='clear-btn' onClick={()=>setFilterParams([])}>Clear</button>
        {filterParams.map(lang => <p className="">{lang}<span onClick={()=>removeFromFilterParams(lang)}><img src='./images/icon-remove.svg'/></span></p>)}
      </div> : null}
    <div className="App">
       {filteredJobs.map((job, index,setFilterParams) => (<Job setFilter={addToFilterParams} job={job}/>
      ))}
    </div>
    </>
  );
}

export default App;
