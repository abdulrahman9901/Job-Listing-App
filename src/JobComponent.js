import './jobCard.css';
import React , {useState} from 'react';
const Job = ({ job , setFilter}) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(!clicked);
    };
  
  return (
    <div className={"job-Card " + (clicked ? " selected-job" : "")} onClick={()=>handleClick()}>
      <img  src={job.logo} alt={job.company} className="card-icon" />
      <div className='content'>
      <div className='card-header'>
      <p className="card-name">{job.company}</p>
      {job.new ? <p className='new'>New!</p> : null}
       {job.featured ? <p className='featured'>Featured</p> : null}
      </div>
      <div className="position-container">
  <div className="position">
    <p>{job.position}</p>
  </div>
  <div className="lang-list">
    <p className="" onClick={()=>setFilter(job.level)}>{job.level}</p>
    {job.languages.map(lang => <p className="" onClick={()=>setFilter(lang)}>{lang}</p>)}
  </div>
</div>
<div className="footer">
{job.postedAt ? <p>{job.postedAt}</p> : null}
       {job.contract ? <p>{job.contract}</p> : null}
       {job.location ? <p>{job.location}</p> : null}
</div>
      </div>
    </div>
  );
};

export default Job;
