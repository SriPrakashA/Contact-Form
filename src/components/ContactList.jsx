import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataProvider } from "../context/Context";

function ContactList() {
  const [isSort,setIsSort] = useState(false);
  const [tableData,setTableData] = useState([]);
  const { data, setData, statusCode } = useContext(dataProvider);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/addcontact");
  };

  const handleEdit = (val) => {
    navigate("/addcontact", { state: { c_detail: val } });
  };

  const handleDelete = (val) => {
    var userResponse = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (userResponse) {
      setData({ type: "delete", value: val });
    }
  };

  const handleSort = () => {
    let lists = [...tableData];
    if (isSort) {
      let new_list = lists.sort((a, b) => {
        return a.fname.localeCompare(b.fname);
      });
      setTableData(new_list);
      setIsSort(!isSort);
    } else {
      let new_list = lists.sort((a, b) => {
        return b.fname.localeCompare(a.fname);
      });
      setTableData(new_list);
      setIsSort(!isSort);
    }
  };

  useEffect(() => {
    let contact_list = JSON.parse(localStorage.getItem("mycontactlist"));
    if (contact_list) {
      console.log(contact_list,'29');
      setData({ type: "get", value: contact_list });
    } else {
      console.log('31')
      setData({ type: "get", value: [] });
    }
  }, []);

  useEffect(() => {
    if (statusCode === 4) {
      localStorage.setItem("mycontactlist", JSON.stringify(data));
    }
  }, [statusCode]);

  useEffect(() => {
    if (data.length > 0) {
      setTableData(data);
    } else{
      setTableData([]);
    }
  }, [data]);
  return (
    <>
      <div className="py-4 px-3 head">
        <h2 className="title">Contact List</h2>
        <button
          type="button"
          className="btn btn-primary confirm-btn"
          onClick={handleAdd}
        >
          Add Contact
        </button>
      </div>
      <div className="container table-container table-responsive ">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th onClick={handleSort} style={{cursor:"pointer"}} >Firstname {isSort?<i class="fa-solid fa-arrow-up sort"></i>:<i class="fa-solid fa-arrow-down sort"></i>} </th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) &&
              tableData.map((val, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{val.fname}</td>
                  <td>{val.lname}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.street}</td>
                  <td>{val.city}</td>
                  <td>{val.state}</td>
                  <td>{val.country}</td>
                  <td>{val.postalcode}</td>
                  <td>
                    <i
                      class="fa-regular fa-pen-to-square edit-icon"
                      title="edit"
                      onClick={() => handleEdit(val)}
                    ></i>
                    <i
                      class="fa-solid fa-circle-minus del-icon"
                      title="delete"
                      onClick={() => handleDelete(val)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {Array.isArray(tableData) && tableData.length === 0 && (
          <h4 className="text-center">No data found</h4>
        )}
      </div>
    </>
  );
}

export default ContactList;
