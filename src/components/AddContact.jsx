import { useContext, useEffect, useState } from 'react';
import './styles/Styles.css'
import { dataProvider } from '../context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkInitialSpace, isEmail, validateName, validateNumber } from '../helper/utils';

let my_fields = [
    {
        title: "First name",
        name: "fname",
        type: "text",
        placeholder: "Arun",
        errMsg: "First Name Req"
    },
    {
        title: "Last name",
        name: "lname",
        type: "text",
        placeholder: "kumar",
        errMsg: "Last Name Req"
    },
    {
        title: "Email",
        name: "email",
        type: "email",
        placeholder: "arun@gmail.com",
        errMsg: "Enter valid email"
    },
    {
        title: "Phone",
        name: "phone",
        type: "number",
        placeholder: "8754898745",
        errMsg: "10 digit Phone Req"
    },
    {
        title: "Street",
        name: "street",
        type: "text",
        placeholder: "45/a , Street One",
        errMsg: "Street Name Req"
    },
    {
        title: "City",
        name: "city",
        type: "text",
        placeholder: "Coimbatore",
        errMsg: "City Name Req"
    },
    {
        title: "State",
        name: "state",
        type: "text",
        placeholder: "Tamil nadu",
        errMsg: "State Name Req"
    },
    {
        title: "Country",
        name: "country",
        type: "text",
        placeholder: "India",
        errMsg: "Country Name Req"
    },
    {
        title: "Postal Code",
        name: "postalcode",
        type: "number",
        placeholder: "6410001",
        errMsg: "6 digit PostalCode Req"
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
    const [errorMsg, setErrorMsg] = useState("");
    const [errorFields, setErrorFields] = useState([]);
    const { data, setData, statusCode } = useContext(dataProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const contact_info = location.state?.c_detail;


    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (!checkInitialSpace(value)) {
            let removeFields = errorFields.filter((val) => val !== name);
           
            setErrorFields(removeFields)
            setErrorMsg("");
            setErrors({ ...errors, [name]: false });
            if (name === "phone") {
                if (!["0", "1", "2", "3", "4", "5"].includes(value.charAt(0))) {
                    setInputs({ ...inputs, [name]: value });
                }
            } else {
                setInputs({ ...inputs, [name]: value });
            }

        }

    };
  

    const handleAdd = () => {

        let arr = [];
        Object.keys(inputs).map((val) => {

            if (val === "email" || val === "phone" || val === "postalcode") {
                if (val === "email" && !isEmail(inputs["email"])) {
                    arr.push("email")
                } else if (val === "phone" && inputs["phone"].length != 10) {
                    arr.push("phone")
                } else if (val === "postalcode" && inputs["postalcode"].length != 6) {
                    arr.push("postalcode")
                }

            } else {
                if (inputs[val] === "") {
                    arr.push(val);
                }
            }
        })
        setErrorFields(arr);
        if (arr.length === 0) {
            let body = { ...inputs };
            body["id"] = Math.round(Math.random() * 999);
            body["createdAt"] = new Date();
            setData({ type: "add", value: body });
        }
        // else {
        //     let body = { ...inputs };
        //     body["id"] = Math.round(Math.random() * 999);
        //     body["createdAt"] = new Date();
        //     setData({ type: "add", value: body });
        // }
    };

    const handleUpdate = () => {

        let arr = [];
        Object.keys(inputs).map((val) => {

            if (val === "email" || val === "phone" || val === "postalcode") {
                if (val === "email" && !isEmail(inputs["email"])) {
                    arr.push("email")
                } else if (val === "phone" && inputs["phone"].length != 10) {
                    arr.push("phone")
                } else if (val === "postalcode" && inputs["postalcode"].length != 6) {
                    arr.push("postalcode")
                }

            } else {
                if (inputs[val] === "") {
                    arr.push(val);
                }
            }
        })
        setErrorFields(arr);

        if (arr.length === 0) {
            let body = { ...inputs };
            body["id"] = contact_info?.id;
            setData({ type: "update", value: body });
        }
    };

    const handlePrevent = (e, fieldName) => {
       
        if ((fieldName === "fname" || fieldName === "lname" || fieldName === "city" || fieldName === "state" || fieldName === "country") && validateName.includes(e.key)) {
           
            e.preventDefault();
        } else if ((fieldName === "phone" || fieldName === "postalcode") && validateNumber.includes(e.key)) {
            e.preventDefault();
        }
    }

    const handleCancel = () => {
        var userResponse = window.confirm("Are you sure you want cancel?");
        if (userResponse) {
            navigate("/")
        }
    };

    useEffect(() => {

        if (statusCode === 1) {
            alert("Contact Added Successfully");
            localStorage.setItem("mycontactlist", JSON.stringify(data));
            navigate("/")
        }
        else if (statusCode === 2) {
            alert("Email ID already exist");
        } else if (statusCode === 3) {
            alert("Contact Updated Successfully");
            localStorage.setItem("mycontactlist", JSON.stringify(data));
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
                    {my_fields.map((field, index) => (
                        <div className="col-6 col-sm-5 col-md-4" key={index} >
                            <div className="mb-3 mt-3">
                                <label for="" className="form-label">{field.title} <span>*</span></label>
                                <input type={field.type} className="form-control" value={inputs[field.name]} placeholder={`eg:${field.placeholder}`} name={field.name} onChange={(e) => handleInputs(e)} onKeyDown={(e) => handlePrevent(e, field.name)} />
                                {errorFields.includes(field.name) && <span>{field.errMsg}</span>}
                            </div>
                        </div>
                    ))}
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