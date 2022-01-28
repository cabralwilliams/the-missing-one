import React, { useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client.js";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries.js";
import { CREATE_CASE } from "../utils/mutations.js";
import { useQuery, useMutation } from "@apollo/client";

const S3_BUCKET = "missingone";
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
    // console.log(userData);
    // console.log(data);

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

    const uploadFile = async (file) => {
        //const fileName = file.name;
        if (!file) {
            return alert("Choose a file to upload first.");
        }
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key:"4.jpg" 
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
        console.log(newOb);
        try {
            const newCase = await createCase({ variables: { ...newOb }});
            if(!newCase) {
                console.log('Something went terribly wrong.');
            }
        } catch(err) {
            console.error(err);
        }
        

        setFormState(initialState);
        //Clear all of the textarea elements
        const textAreaEls = document.getElementsByTagName('textarea');
        for(const el of textAreaEls) {
            el.value = '';
        }
        window.location.replace('/');
    }

	if (loading) {
		return <h2>Data is loading - please wait...</h2>;
	}

    return(
        <div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={() => uploadFile(selectedFile)}> Upload Image</button>
            <form onSubmit={handleFormSubmit}>
                <div className='d-flex flex-row justify-content-around'>
                    <div>
                        <h2>Required Fields</h2>
                        <div className='d-flex flex-column'>
                            <label htmlFor='firstname'>First Name:</label>
                            <input type="text" name='firstname' value={formState.firstname === null ? '' : formState.firstname} onChange={handleChange} />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='lastname'>Last Name:</label>
                            <input type="text" name='lastname' value={formState.lastname === null ? '' : formState.lastname} onChange={handleChange} />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='age'>Age:</label>
                            <input type="number" name='age' min='0' step='1' value={formState.age === null ? 0 : formState.age} onChange={handleChange} />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='gender'>Gender:</label>
                            <select name='gender' onChange={handleChange}>
                                <option value='--'>------</option>
                                <option value='F'>Female</option>
                                <option value='M'>Male</option>
                                <option value='NB'>Non-Binary</option>
                            </select>
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='last_known_location'>Location Last Seen:</label>
                            <textarea name='last_known_location' onChange={updateLocation}></textarea>
                        </div>
                    </div>
                    <div>
                        <h2>Optional Fields</h2>
                        <div className='d-flex flex-row justify-content-between'>
                            <div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='address'>Address:</label>
                                    <textarea name='address' onChange={updateAddress}></textarea>
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='dob'>Date of Birth:</label>
                                    <input type='date' name='dob' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='biograph'>Biography:</label>
                                    <textarea name='biograph' onChange={updateBiograph}></textarea>
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='nationality'>Nationality:</label>
                                    <input type='text' name='nationality' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='mobile'>Mobile Number:</label>
                                    <input type='text' name='mobile' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='licenseId'>Driver/ID Number:</label>
                                    <input type='text' name='licenseId' onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='issuedState'>Issuing State:</label>
                                    <input type='text' name='issuedState' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='licensePlate'>License Plate:</label>
                                    <input type='text' name='licensePlate' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='disappearance_date'>Disappearance Date:</label>
                                    <input type='date' name='disappearance_date' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='ncic'>NCIC Code:</label>
                                    <input type='text' name='ncic' onChange={handleChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='other_info'>Other Information:</label>
                                    <textarea name='other_info' onChange={updateOther}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type='submit'>Create Case</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UploadImageToS3WithNativeSdk;
