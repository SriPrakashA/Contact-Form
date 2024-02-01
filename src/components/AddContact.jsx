import { useContext, useEffect, useState } from 'react';
import './styles/Styles.css'
import { dataProvider } from '../context/Context';
import { useLocation, useNavigate } from 'react-router-dom';

function AddContact() {
    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalcode: "",
    });

    const [errors, setErrors] = useState({
        fname: false,
        lname: false,
        email: false,
        phone: false,
        street: false,
        city: false,
        state: false,
        country: false,
        postalcode: false,
    });
    const { data, setData, statusCode } = useContext(dataProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const contact_info = location.state?.c_detail;
    

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value })
    };

    const handleAdd = () => {
        const { fname, lname, phone, email, street, city, state, country, postalcode } = inputs;
        if (fname.length < 3) {
            setErrors({ ...errors, fname: true });
        } else if (lname.length < 3) {
            setErrors({ ...errors, lname: true });
        } else if (email.length < 3) {
            setErrors({ ...errors, email: true });
        } else if (phone.length < 10) {
            setErrors({ ...errors, phone: true });
        } else if (street.length < 3) {
            setErrors({ ...errors, street: true });
        } else if (city.length < 3) {
            setErrors({ ...errors, city: true });
        } else if (state.length < 3) {
            setErrors({ ...errors, state: true });
        } else if (country.length < 3) {
            setErrors({ ...errors, country: true });
        } else if (postalcode.length < 6) {
            setErrors({ ...errors, postalcode: true });
        } else {
            let body = { ...inputs };
            body["id"] = Math.round(Math.random() * 999);
            setData({ type: "add", value: body });
        }
    };

    const handleUpdate = () => {
        const { fname, lname, phone, email, street, city, state, country, postalcode } = inputs;
        if (fname.length < 3) {
            setErrors({ ...errors, fname: true });
        } else if (lname.length < 3) {
            setErrors({ ...errors, lname: true });
        } else if (email.length < 3) {
            setErrors({ ...errors, email: true });
        } else if (phone.length < 10) {
            setErrors({ ...errors, phone: true });
        } else if (street.length < 3) {
            setErrors({ ...errors, street: true });
        } else if (city.length < 3) {
            setErrors({ ...errors, city: true });
        } else if (state.length < 3) {
            setErrors({ ...errors, state: true });
        } else if (country.length < 3) {
            setErrors({ ...errors, country: true });
        } else if (postalcode.length < 6) {
            setErrors({ ...errors, postalcode: true });
        } else {
            let body = { ...inputs };
            body["id"] = contact_info?.id;
            setData({ type: "update", value: body });
        }
    };

    const handleCancel = () => {
        var userResponse = window.confirm("Are you sure you want cancel?");
        if (userResponse) {
            navigate("/")
        }
    };

    useEffect(() => {
       
        if (statusCode === 1) {
            alert("Contact Added Successfully");
            localStorage.setItem("mycontactlist",JSON.stringify(data));
            navigate("/")
        }
        else if (statusCode === 2) {
            alert("Email ID already exist");
        } else if (statusCode === 3) {
            alert("Contact Updated Successfully");
            localStorage.setItem("mycontactlist",JSON.stringify(data));
            navigate("/")
        }
    }, [statusCode]);

    useEffect(() => {
        if (contact_info) {
            setInputs({
                ...inputs,
                fname: contact_info?.fname,
                lname: contact_info?.lname,
                email: contact_info?.email,
                phone: contact_info?.phone,
                street: contact_info?.street,
                city: contact_info?.city,
                state: contact_info?.state,
                country: contact_info?.country,
                postalcode: contact_info?.postalcode,
            })
        }
    }, [contact_info])
    return (<>
        <div className="container add-contact" >
            <h3 className='title'> {contact_info ? "Update Contact" : "Add New Contact"}  </h3>
            <div>
                <div className="row">
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">First Name <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.fname} placeholder="eg:Arun" name="fname" onChange={(e) => { setErrors({ ...errors, fname: false }); handleInputs(e) }} />
                            {errors.fname && <span>Firstname req min 3 char</span>}

                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Last Name <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.lname} placeholder="eg:kumar" name="lname" onChange={(e) => { setErrors({ ...errors, lname: false }); handleInputs(e) }} />
                            {errors.lname && <span>Lastname req min 3 char</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Email <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.email} placeholder="eg:example@gmail.com" name="email" onChange={(e) => { setErrors({ ...errors, email: false }); handleInputs(e) }} />
                            {errors.email && <span>Enter valid email</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Phone <span>*</span></label>
                            <input type="number" className="form-control" id="email" value={inputs.phone} placeholder="eg:8845671123" name="phone" onChange={(e) => { setErrors({ ...errors, phone: false }); handleInputs(e) }} />
                            {errors.phone && <span>Enter valid phone</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Street <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.street} placeholder="eg:123, Street" name="street" onChange={(e) => { setErrors({ ...errors, street: false }); handleInputs(e) }} />
                            {errors.street && <span>Street req min 3 char</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">City <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.city} placeholder="eg:Coimbatore" name="city" onChange={(e) => { setErrors({ ...errors, city: false }); handleInputs(e) }} />
                            {errors.city && <span>City req min 3 char</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">State <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.state} placeholder="eg:Tamilnadu" name="state" onChange={(e) => { setErrors({ ...errors, state: false }); handleInputs(e) }} />
                            {errors.state && <span>State req min 3 char</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Country <span>*</span></label>
                            <input type="text" className="form-control" id="email" value={inputs.country} placeholder="eg:India" name="country" onChange={(e) => { setErrors({ ...errors, country: false }); handleInputs(e) }} />
                            {errors.country && <span>Country req min 3 char</span>}
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">Postal Code <span>*</span></label>
                            <input type="number" className="form-control" id="email" value={inputs.postalcode} placeholder="eg:641010" name="postalcode" onChange={(e) => { setErrors({ ...errors, postalcode: false }); handleInputs(e) }} />
                            {errors.postalcode && <span>Enter Valid postal code</span>}
                        </div>
                    </div>
                </div>
                <div className='bottom-btns' >
                    {contact_info ? <button type="button" className="col-sm-2 mb-3 btn btn-primary confirm-btn" onClick={handleUpdate} >Update</button> : <button type="button" className="col-sm-2 mb-3 btn btn-primary confirm-btn" onClick={handleAdd} >Add</button>}
                    <button type="button" className="col-sm-2 mb-3 btn btn-outline-secondary" onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        </div>
    </>)
}

export default AddContact;