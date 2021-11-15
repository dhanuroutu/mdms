import React, {useState, useEffect } from 'react';
import './Dashboard.css';


export default function Dashboard(props) {

  useEffect(() => {
    props.addTitle("Dashboard");
  });

  const [values, setValues] = useState({
    appName: "",
    version: "",
    dashboardType: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Errors:::", errors);
  });


  const handleChanges = (e) => {
    const {name, value} = e.target;
    setValues({...values,
               [name]: value
             });
    //console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validateForm();
    if(Object.keys(err).length === 0) {
      
    }else {
      setErrors(err);
    }
  }

  const validateForm = () => {
    let errorFields = {};
    if(!values.appName || values.appName.trim() === ""){
      errorFields.appName = "Application name is required.";
    } else if(!/^[a-zA-Z0-9_]*$/.test(values.appName.trim())){
      errorFields.appName = "Invalid Application name.";
    }

    if(!values.version || values.version.trim() === ""){
      errorFields.version = "Version is required.";
    } else if(!/^[a-zA-Z0-9_.]*$/.test(values.version.trim())){
      errorFields.version = "Invalid Version name.";
    }
    if(!values.dashboardType || values.dashboardType.trim() === ""){
      errorFields.dashboardType = "Dashboard type is required.";
    } else if(!/^[a-zA-Z ]*$/.test(values.dashboardType.trim())){
      errorFields.dashboardType = "Invalid Application name.";
    }
    return errorFields;
  }


  return(
    <>
    <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
    <div className="form-content-right">
      <div className="form-inputs">
        <label className="form-label" htmlFor="appName">Application Name</label>
        <input type="text" className="form-input" name="appName" id="appNAme" 
        placeholder="Enter Application" value={values.appName} onChange={handleChanges}/>
              {errors.appName && <p>{errors.appName}</p>}

      </div>
      <div className="form-inputs">
        <label className="form-label" htmlFor="version"> Version </label>
        <input type="text" className="form-input" name="version" id="version" 
        placeholder="Enter Version" value={values.version} onChange={handleChanges}/>
              {errors.version && <p>{errors.version}</p>}

      </div>

      <div className="form-inputs">
        <label className="form-label" htmlFor="dashboardType"> Dashboard Type </label>
        <input type="text" className="form-input" name="dashboardType" id="dashboardType"
         placeholder="Enter Dashboard type" value={values.dashboardType} onChange={handleChanges}/>
               {errors.dashboardType && <p>{errors.dashboardType}</p>}

      </div>
      <div>
        <button className="btn btn-primary">Create Dashboard</button>
      </div>
    </div>
    </form>
    </div>
    </>
  );
}