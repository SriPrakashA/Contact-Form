import { useContext, useEffect, useState } from 'react';
import './styles/Styles.css'
import { dataProvider } from '../context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkInitialSpace, isEmail } from '../helper/utils';

let my_fields =[
    {
        title:"First name",
        name:"fname",
        type:"text",
        placeholder:"Arun"
    },
    {
        title:"Last name",
        name:"lname",
        type:"text",
        placeholder:"kumar"
    },
    {
        title:"Email",
        name:"email",
        type:"text",
        placeholder:"arun@gmail.com"
    },
    {
        title:"Phone",
        name:"phone",
        type:"number",
        placeholder:"8754898745"
    },
    {
        title:"Street",
        name:"street",
        type:"text",
        placeholder:"45/a , Street One"
    },
    {
        title:"City",
        name:"city",
        type:"text",
        placeholder:"Coimbatore"
    },
    {
        title:"State",
        name:"state",
        type:"text",
        placeholder:"Tamil nadu"
    },
    {
        title:"Country",
        name:"country",
        type:"text",
        placeholder:"India"
    },
    {
        title:"Postal Code",
        name:"postalcode",
        type:"text",
        placeholder:"6410001"
    },
]

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
    const [errorMsg,setErrorMsg] = useState("");
    const { data, setData, statusCode } = useContext(dataProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const contact_info = location.state?.c_detail;
    

    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (!checkInitialSpace(value)) {
            setErrorMsg("");
            setErrors({ ...errors, [name]: false });
            setInputs({ ...inputs, [name]: value });  
        }

    };

    const handleAdd = () => {
        const { fname, lname, phone, email, street, city, state, country, postalcode } = inputs;
        if (fname.length < 3) {
            setErrors({ ...errors, fname: true });
            setErrorMsg("Firstname req min 3 char");
        } else if (lname.length < 1) {
            setErrors({ ...errors, lname: true });
            setErrorMsg("Lastname req min 1 char");
        } else if (!isEmail(email)) {
            setErrors({ ...errors, email: true });
            setErrorMsg("Enter valid email");
        } else if (phone.length !== 10) {
            setErrors({ ...errors, phone: true });
            setErrorMsg("Enter valid 10 digit phone");
        } else if (street.length < 3) {
            setErrors({ ...errors, street: true });
            setErrorMsg("Street req min 3 char");
        } else if (city.length < 3) {
            setErrors({ ...errors, city: true });
            setErrorMsg("City req min 3 char");
        } else if (state.length < 3) {
            setErrors({ ...errors, state: true });
            setErrorMsg("State req min 3 char");
        } else if (country.length < 3) {
            setErrors({ ...errors, country: true });
            setErrorMsg("Country req min 3 char");
        } else if (postalcode.length < 6) {
            setErrors({ ...errors, postalcode: true });
            setErrorMsg("Enter valid 6 digit postalcode");
        } else {
            let body = { ...inputs };
            body["id"] = Math.round(Math.random() * 999);
            body["createdAt"] = new Date();
            setData({ type: "add", value: body });
        }
    };

    const handleUpdate = () => {
        const { fname, lname, phone, email, street, city, state, country, postalcode } = inputs;
        if (fname.length < 3) {
            setErrors({ ...errors, fname: true });
            setErrorMsg("Firstname req min 3 char");
        } else if (lname.length < 1) {
            setErrors({ ...errors, lname: true });
            setErrorMsg("Lastname req min 1 char");
        } else if (!isEmail(email)) {
            setErrors({ ...errors, email: true });
            setErrorMsg("Enter valid email");
        } else if (phone.length < 10) {
            setErrors({ ...errors, phone: true });
            setErrorMsg("Enter valid 10 digit phone");
        } else if (street.length < 3) {
            setErrors({ ...errors, street: true });
            setErrorMsg("Street req min 3 char");
        } else if (city.length < 3) {
            setErrors({ ...errors, city: true });
            setErrorMsg("City req min 3 char");
        } else if (state.length < 3) {
            setErrors({ ...errors, state: true });
            setErrorMsg("State req min 3 char");
        } else if (country.length < 3) {
            setErrors({ ...errors, country: true });
            setErrorMsg("Country req min 3 char");
        } else if (postalcode.length < 6) {
            setErrors({ ...errors, postalcode: true });
            setErrorMsg("Enter valid 6 digit postalcode");
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
                    { my_fields.map((field,index)=>(
                        <div className="col-6 col-sm-5 col-md-4" key={index} >
                        <div className="mb-3 mt-3">
                            <label for="" className="form-label">{field.title} <span>*</span></label>
                            <input type={field.type} className="form-control" value={inputs[field.name]} placeholder={`eg:${field.placeholder}`} name={field.name} onChange={(e) => handleInputs(e) } />
                            {errors[field.name] && <span>{errorMsg}</span>}

                        </div>
                    </div>
                    )) }
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