import React, { useState, useEffect } from "react";
import { GET_CASE_ById } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client.js";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CURRENT_CASE } from "../utils/actions";
import { UPDATE_CASE } from "../utils/mutations";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import CaseDetail from '../components/CaseDetail';
import CommentsList from "../components/CommentsList";

const S3_BUCKET = "missingone";
const photo = "https://missingone.s3.amazonaws.com/0.jpg";

const Detail = props => {
    return(
        <div className="text-dark">{props.detailTitle}: {props.detailValue}</div>
    )
};

const formatDate = dateStr => {
    return dateStr.split(' ')[0];
}

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
    images: [],
    case_status: true
};

const CaseDetails = () => {
    const [didCreate, setDidCreate] = useState(false);
    const [formState,setFormState] = useState(initialState);
    const [locationState, setLocationState] = useState('');
    const [addressState, setAddressState] = useState('');
    const [biographState, setBiographState] = useState('');
    const [otherState, setOtherState] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [preview, setPreview] = useState();
    const [updateCase, { error }] = useMutation(UPDATE_CASE);
    const { caseId } = useParams();
    console.log(caseId);
    const history = useHistory();
    const state = useSelector(state => {
        return { user: state.user, currentCase: state.currentCase };
    });
    const dispatch = useDispatch();
    const { data, loading } = useQuery(GET_CASE_ById ,
        {   variables: { id: caseId },}
        );

    const caseDetail = data?.getCaseById || {};
    console.log(caseDetail);

    //Determine whether the logged-in user is the person who created the case
    useEffect(() => {
        if(caseDetail.creator_id) {
            setDidCreate(caseDetail.creator_id === state.user._id);
            if(caseDetail.creator_id === state.user._id) {
                const newFormState = {};
                for(const property in initialState) {
                    if(caseDetail.hasOwnProperty(property) && caseDetail[property] !== null) {
                        newFormState[property] = caseDetail[property];
                    } else {
                        newFormState[property] = null;
                    }
                }
                setFormState(newFormState);
                console.log(formState);
                // console.log(`Last Known Location: ${formState.last_known_location}`)
                // document.querySelector("textarea[name='last_known_location']").value = formState.last_known_location;
                // console.log(`Biography: ${formState.biograph}`);
                // if(formState.biograph) {
                //     document.querySelector("textarea[name='biograph']").value = formState.biograph;
                // }
            }
        }
    }, [caseDetail.creator_id, state.user._id]);

    useEffect(() => {
        if(didCreate) {
            console.log(`Last Known Location: ${formState.last_known_location}`)
            document.querySelector("textarea[name='last_known_location']").value = formState.last_known_location;
            console.log(`Biography: ${formState.biograph}`);
            if(formState.biograph) {
                document.querySelector("textarea[name='biograph']").value = formState.biograph;
            }
            console.log(`Gender: ${formState.gender}`);
            document.querySelector("select[name='gender']").value = formState.gender;
            console.log(`Date of Birth: ${formState.dob}`);
            if(formState.dob) {
                document.querySelector("input[name='dob']").value = formatDate(formState.dob);
            }
            console.log(`Date of Disappearance: ${formState.disappearance_date}`);
            if(formState.disappearance_date) {
                document.querySelector("input[name='disappearance_date']").value = formatDate(formState.disappearance_date);
            }
            console.log(`Nationality: ${formState.nationality}`);
            if(formState.nationality) {
                document.querySelector("input[name='nationality']").value = formState.nationality;
            }
            console.log(`Address: ${formState.address}`);
            if(formState.address) {
                document.querySelector("textarea[name='address']").value = formState.address;
            }
            console.log(`Mobile: ${formState.mobile}`);
            if(formState.mobile) {
                document.querySelector("input[name='mobile']").value = formState.mobile;
            }
            console.log(`License/Id#: ${formState.licenseId}`);
            if(formState.licenseId) {
                document.querySelector("input[name='licenseId']").value = formState.licenseId;
            }
            console.log(`Issuing State: ${formState.issuedState}`);
            if(formState.issuedState) {
                document.querySelector("input[name='issuedState']").value = formState.issuedState;
            }
            console.log(`License Plate: ${formState.licensePlate}`);
            if(formState.licensePlate) {
                document.querySelector("input[name='licensePlate']").value = formState.licensePlate;
            }
            console.log(`NCIC Code: ${formState.ncic}`);
            if(formState.ncic) {
                document.querySelector("input[name='ncic']").value = formState.ncic;
            }
            console.log(`Other Information: ${formState.other_info}`);
            if(formState.other_info) {
                document.querySelector("textarea[name='other_info']").value = formState.other_info;
            }
        }
    }, [didCreate])

    //Update the currentCase property in the store
    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_CURRENT_CASE,
                currentCase: caseDetail
            })
        }
    }, [data, caseDetail, dispatch]);

    console.log(didCreate);
    console.log(state.currentCase);

    // create a preview as a side effect, whenever user preview image (selected file is changed)
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    const handleFileInput = (e) => {
		//setSelectedFile(e.target.files[0]);
        if (e.target.files && e.target.files.length > 0) {
            //uploading file to memory 
           setSelectedFile(e.target.files[0]);
           //substracting extension name 
           const fname = e.target.files[0].name.split('.').pop();
           setSelectedFileType(fname);
        }
  	};

    //if user remove image during previewing time
    const removeSelectedImage = () => {
        setPreview('');
        setSelectedFileType('')
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

    const deleteFile = async filename => {
        const params = {
            Bucket: S3_BUCKET,
            Key: filename
        };
        try {
            const data = await s3Client.send(new DeleteObjectCommand(params));   
        } catch(err) {
            console.error(err);
        }
    }

    const toggleCaseStatus = async event => {
        event.preventDefault();
        const newStatus = !formState.case_status;
        setFormState({ ...formState, case_status: newStatus });
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        //Must be logged in to change case status
        if(!token) {
            return false;
        }
        try {
            const updatedCase = await updateCase({ variables: { case_status: formState.case_status }});
            if(!updatedCase) {
                console.log('Something went terribly wrong.');
            }
        } catch(err) {
            console.error(err);
        }
        dispatch({
            type: UPDATE_CURRENT_CASE,
            currentCase: {}
        });
        history.push(`/cases/${caseId}`);
    }

    //Submit Form
    const handleCaseUpdate = async e => {
        e.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
        //Must be logged in to submit case
        if(!token) {
            return false;
        }
        let changeCount = 0;
        //console.log(userData);
        const newOb = { ...caseDetail, id: caseId };
        //Only update properties to case that have changed
        for(const property in formState) {
            if(formState[property] !== newOb[property]) {
                newOb[property] = formState[property];
                changeCount++;
            }
        }
        
        let filename = null;
        let deleteImage = false;
        let oldImage = null;
        if(selectedFile) {
            filename = uuidv4() + '.' + selectedFileType;
            if(newOb.images.length === 1) {
                deleteImage = true;
                oldImage = newOb.images[0];
            }
            newOb.images = [filename];
            changeCount++;
        }
        console.log(newOb);
        console.log(changeCount);
        //only create the case
        if(changeCount === 0) {
            return false;
        }
        try {
            const updatedCase = await updateCase({ variables: { ...newOb }});
            if(!updatedCase) {
                console.log('Something went terribly wrong.');
            } else if(filename) {
                 //upload function - Image to s3Bucket after creating the case
                //  const filename=newCase.data.createCase._id;
                 console.log (updatedCase.data.updateCase)
                 console.log(filename)
                 uploadFile(selectedFile,filename)
                 if(deleteImage) {
                     deleteFile(oldImage);
                 }
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
        //const currentPage = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
        //window.location.reload('/');
        dispatch({
            type: UPDATE_CURRENT_CASE,
            currentCase: {}
        });
        history.push(`/cases/${caseId}`);
    }

    //Cancel Form
    const cancelUpdate = e => {
        e.preventDefault();
        history.push(`/cases/${caseId}`);
    }

    //Get User details from Global store
	// let username = "Anonymous";
	// if (Object.keys(state.user).length > 0)
	// 	username = `${state.user.first_name} ${state.user.last_name}`;
	// console.log(username);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    return(
        <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
            <div className="lh-1">
                <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                {/* <p className="text-center"> Viewing {caseDetail.firstname} {caseDetail.lastname}'s case.</p> */}
                </h1>
                <h2 className="text-secondary text-center">Case Status: {formState.case_status ? "Open" : "Closed"}</h2>
                {
                    !didCreate ? (
                        <CaseDetail caseDetail={caseDetail} />
                    ) : (
                        <div className="container">
                            <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                                <div className="lh-1">
                                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                                        <p className="text-center">Update Case</p>
                                        <button className={`btn ` && formState.case_status ? `btn-danger` : `btn-primary`} onClick={toggleCaseStatus}>{formState.case_status ? 'Close Case' : 'Reopen Case'}</button>
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
                                                <img src={preview} className="card-img-top" alt="firstimage"></img>{" "}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card p-2">
                                        <input className="form-control btn-primary" type="file" onChange={handleFileInput}/>
                                    </div>
                                    <div className="card p-2">   
                                        <button className=" btn btn-danger btn-lg" onClick={removeSelectedImage} style={styles.delete}>
                                            Remove This Image
                                        </button>
                                    </div>
                                </div> 
                                <div className="col-md-7 col-lg-8 text-dark">
                                    <form onSubmit={handleCaseUpdate}>
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
                                                <label className="form-label" htmlFor='other_info'>Contact Information:</label>
                                                <textarea className="form-control" name='other_info' onChange={updateOther}></textarea>
                                            </div>
                                        </div>  
                                    <hr className="my-4"></hr>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button className="btn btn-primary btn-lg me-md-2" type='submit'>Update Case</button>
                                        <button className="btn btn-danger btn-lg" type="button" onClick={cancelUpdate}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="text-dark">
                    {/* Case Details: {`${JSON.stringify(caseDetail)}`} */}
                </div>
                {/* <CommentsList
				comments={caseDetail.comments}
				case_id={caseDetail._id}
				username={username}
			/> */}
            </div>
        </div>
    );
};

export default CaseDetails;

// Just some styles
const styles = {
    delete: {
        cursor: "pointer",
        padding: 15,
        color: "white",
        border: "none",
     }
    }