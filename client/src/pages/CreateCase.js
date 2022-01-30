import React, { useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client.js";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries.js";
import { CREATE_CASE } from "../utils/mutations.js";
import { useQuery, useMutation } from "@apollo/client";

const S3_BUCKET = "missingone";
const photo = "https://missingone.s3.amazonaws.com/0.jpg";

const initialState = {
	firstname: null,
	lastname: null,
	address: null,
	dob: null,
	age: null,
	gender: null,
	last_known_location: null,
	creator_id: null,
	biograph: null,
	nationality: null,
	mobile: null,
	licenseId: null,
	issuedState: null,
	licensePlate: null,
	disappearance_date: null,
	ncic: null,
	other_info: null,
};

// Add a photo to s3 bucket
const UploadImageToS3WithNativeSdk = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formState, setFormState] = useState(initialState);
    const [locationState, setLocationState] = useState('');
    const [addressState, setAddressState] = useState('');
    const [biographState, setBiographState] = useState('');
    const [otherState, setOtherState] = useState('');
    const { data, loading } = useQuery(QUERY_ME);
    const [createCase, { error }] = useMutation(CREATE_CASE);
    
    const userData = data?.me || {};

	const handleFileInput = (e) => {
		setSelectedFile(e.target.files[0]);
  	};

	const updateLocation = (e) => {
		const locVal = e.target.value;
		//console.log(locVal);
		setLocationState(locVal);
		//console.log(locationState);
		setFormState({ ...formState, last_known_location: locVal });
	};

    const updateAddress = e => {
        const locVal = e.target.value;
        setAddressState(locVal);
        setFormState({ ...formState, address: locVal });
    }

    const updateBiograph = e => {
        const locVal = e.target.value;
        setBiographState(locVal);
        setFormState({ ...formState, biograph: locVal });
    }

    const updateOther = e => {
        const locVal = e.target.value;
        setOtherState(locVal);
        setFormState({ ...formState, other_info: locVal });
    }

    const uploadFile = async (file,filename) => {
        // if (!file) { Thi was moved to sunmit button}
            // return alert("Choose a file to upload first.");
        // }
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: filename
        };
        try {
            const data = await s3Client.send(new PutObjectCommand(params));
            alert("Successfully uploaded photo.");
        }catch (err) {
            return alert("There was an error uploading your photo: ", err.message);
        }
    }

	//Update the form field(s)
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "age") {
			setFormState({
				...formState,
				age: parseInt(value),
			});
		} else {
			setFormState({
				...formState,
				[name]: value,
			});
		}
	};

    //Submit Form
    const handleFormSubmit = async e => {
        e.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        //console.log(token);
        //Must be logged in to submit case
        if(!token) {
            return false;
        }
        //console.log(userData);
        const newOb = { images: [], helpers: [], creator_id: userData._id };
        //Only send properties to case that are non-null
        for(const property in formState) {
            if(formState[property] !== null) {
                newOb[property] = formState[property];
            }
        }
        //check if the user selected a image to upload.
        if (!selectedFile) {
            return alert("Choose a file to upload first.");
        }
        console.log(newOb);
        //only create the case
        try {
            const newCase = await createCase({ variables: { ...newOb }});
            if(!newCase) {
                console.log('Something went terribly wrong.');
            } else {
                 //upload function - Image to s3Bucket after creating the case
                 const filename=newCase.data.createCase._id;
                 console.log (newCase.data.createCase)
                 console.log(filename)
                 uploadFile(selectedFile,filename)
            };
        } catch(err) {
            console.error(err);
        }
        

        setFormState(initialState);
        //Clear all of the textarea elements
        const textAreaEls = document.getElementsByTagName('textarea');
        for(const el of textAreaEls) {
            el.value = '';
        }
        //window.location.replace('/');
    }

	if (loading) {
		return <h2>Data is loading - please wait...</h2>;
	}

    return(
    <div className="container">
            <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                 <div className="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                       <p className="text-center"> Creating a New Case</p>
                    </h1>
                 </div>
             </div> 
            <div className="row g-2">
                    <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Picture</span>
                            </h4>
                            <div className="card">
                                  <div className="card-body">
				                        <div className="avtar">
                                           <img src={photo} className="card-img-top" alt="firstimage"></img>{" "}
                                        </div>
	                    			</div>
                            </div>
                             <div className="card p-2">
                                <input className="form-control" type="file" onChange={handleFileInput}/>
                             </div>
                    </div> 
                    <div className="col-md-7 col-lg-8">
                        <form onSubmit={handleFormSubmit}>
                                <h4 className="mb-3">Required Fields</h4>
                                <div className="row g-3">
                                       <div className="col-sm-6">
                                            <label className="form-label" htmlFor='firstname'>First Name:</label>
                                            <input className="form-control" type="text" name='firstname' value={formState.firstname === null ? '' : formState.firstname} onChange={handleChange} required />
                                        </div>
                                        <div className="col-sm-5">
                                            <label  className="form-label" htmlFor='lastname'>Last Name:</label>
                                            <input className="form-control" type="text" name='lastname' value={formState.lastname === null ? '' : formState.lastname} onChange={handleChange} required />
                                        </div> 
                                        <div className="col-md-5">
                                            <label  className="form-label" htmlFor='gender'>Gender:</label>
                                            <select className="form-select" name='gender' onChange={handleChange} required>
                                                <option value='--'>------</option>
                                                <option value='F'>Female</option>
                                                <option value='M'>Male</option>
                                                <option value='NB'>Non-Binary</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label  className="form-label" htmlFor='age'>Age:</label>
                                            <input className="form-control" type="number" name='age' min='0' step='1' value={formState.age === null ? 0 : formState.age} onChange={handleChange}  required/>
                                        </div>
                                        <div className="col-12">
                                            <label  className="form-label" htmlFor='last_known_location'>Location Last Seen:</label>
                                            <textarea className="form-control" name='last_known_location' onChange={updateLocation} required></textarea>
                                        </div>  
                            </div>
                            <hr className="my-4"></hr>
                            <div className="row g-3">
                                <h4 className="mb-3">Optional Fields</h4>
                                <div className='col-md-12'>
                                    <label className="form-label" htmlFor='biograph'>Biography:</label>
                                    <textarea className="form-control" name='biograph' onChange={updateBiograph}></textarea>
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label" htmlFor='dob'>Date of Birth:</label>
                                    <input className="form-control" type='date' name='dob' onChange={handleChange} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label" htmlFor='disappearance_date'>Disappearance Date:</label>
                                    <input className="form-control" type='date' name='disappearance_date' onChange={handleChange} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label" htmlFor='nationality'>Nationality:</label>
                                    <input className="form-control" type='text' name='nationality' onChange={handleChange} />
                                </div>
                                <div className='col-md-7'>
                                    <label className="form-label" htmlFor='address'>Address:</label>
                                    <textarea className="form-control" name='address' onChange={updateAddress}></textarea>
                                </div>
                                <div className='col-md-5'>
                                    <label className="form-label" htmlFor='mobile'>Mobile Number:</label>
                                    <input className="form-control"type='phone' name='mobile' onChange={handleChange} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label" htmlFor='licenseId'>Driver/ID Number:</label>
                                    <input className="form-control" type='text' name='licenseId' onChange={handleChange} />
                                </div>
                                 <div className='col-md-4'>
                                    <label className="form-label" htmlFor='issuedState'>Issuing State:</label>
                                    <input className="form-control"type='text' name='issuedState' onChange={handleChange} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label" htmlFor='licensePlate'>License Plate:</label>
                                    <input className="form-control" type='text' name='licensePlate' onChange={handleChange} />
                                </div>
                                <div className='col-md-12'>
                                    <label className="form-label" htmlFor='ncic'>NCIC Code:</label>
                                    <input className="form-control" type='text' name='ncic' onChange={handleChange} />
                                </div>
                                <div className='col-md-12'>
                                    <label className="form-label" htmlFor='other_info'>Other Information:</label>
                                    <textarea className="form-control" name='other_info' onChange={updateOther}></textarea>
                                </div>
                            </div>  
                        <hr className="my-4"></hr>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button className="btn btn-primary btn-lg me-md-2" type='submit'>Create Case</button>
                            <button className="btn btn-danger btn-lg" type="button" >Cancel</button>
                         </div>
                        </form>
                    </div>
            </div>
   </div>
    );
}

export default UploadImageToS3WithNativeSdk;
