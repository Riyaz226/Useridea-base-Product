import {useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import './Style.css'

const Home = ()=>{
const [prodata, setData] = useState([]);
const navigate=useNavigate();

const LoadDetail=(id)=>{
  navigate('/employee/detail/'+id);
}

const LoadEdit=(id)=>{
    navigate('/employee/edit/'+id);

}

const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:4000/products/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }


     fetch("http://localhost:4000/products")
       .then((response) => response.json())
       .then((json) => {
         console.log(json);
         setData(json);
       });
  
 return(
  <>
  <div className="container">
        <div className="card">
            <div className="card-title">
               <h2>Employee Listing</h2>
               </div>
              <div className="card-body">
                <div className="dtnbtn">
                    <Link to="employee/create" className="btn btn-success">Add New(+)</Link>
                </div>
                <table className="table table-bordered">
                <thead className="bg-dark text-white">
<tr>
    <td>ID</td>
    <td>Name</td>
    <td>Email</td>
    <td>Phone</td>
    <td>Action</td>
</tr>
                </thead>
                <tbody>
                    {  
                       prodata &&
                        prodata.map(item=>(
                            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <a  onClick={()=>{LoadEdit(item.id)}} className="btn btn-success">Edit</a>
                  <a  onClick={()=>{Removefunction(item.id)}} className="btn btn-danger">Remove</a>
                  <a onClick={()=>{LoadDetail(item.id)}} className="btn btn-success">Details</a>
                                                            </td>                              
                            </tr>
                        ))
                    }
                </tbody>
                </table> 
            </div>
        </div>
  </div>
  </>
 )
}
export default Home;