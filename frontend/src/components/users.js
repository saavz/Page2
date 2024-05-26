import React, {useState, useEffect} from "react";

export const Users = () =>{
    const [name, setname] = useState("");
    const [rut, setrut] = useState("");
    const [pin, setpin] = useState("");
    const [products, setproducts] = useState("");
    const [lastUpdate, setlastupdate] = useState("");
    const [user, setuser] = useState("")

    const API = process.env.REACT_APP_API;


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch(`${API}/user/${pin}`);
        const data = await res.json();
        setuser(data);
        
        }


 

    return (
        <div className='row' style={{ justifyContent: 'center' }}>
           <div className='col-md-4 '>
               <form onSubmit={handleSubmit} className="card card-body">
               <div className='form-group'>
                   <input type="integer"
                   onChange={e => setpin(e.target.value)}
                   value={pin}
                   className="form-control"
                   placeholder="PIN"
                   autoFocus
                   />
   
     
               </div>  
               <button type="submit" className='btn btn-primary btn-block' style={ {marginTop: '10px'}}>
                BUSCAR
                </button>  
               </form>
           </div><div className='col-md-6' style={{textAlign: 'center'}}>
            {user ? ( 
                <div>
                      <table className='table table-striped' style={{justifyContent: 'center'}}>
                        <thead>
                            <tr>
                                <th>NOMBRE</th>
                                <th>RUT</th>
                                <th>PRODUCTOS</th>
                                <th>ULTIMA ACTUALIZACION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.rut}</td>
                                <td>{user.products}</td>
                                <td>{user.lastUpdate}</td>
                                
                            </tr>
                        </tbody>
                      </table>
                </div>
            ) : (
                <h1> </h1>

            )}

           </div>
           
           </div>
    )
    
    

}