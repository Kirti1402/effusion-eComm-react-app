import { useState } from "react";

export const Address = () => {
  const [address, setAddress] = useState([
    {
      name: "Henry Potter",
      phone: "9920397890",
      address: "Bellandur, Banglore",
      city: "Paris",
      pincode: 234567,
      state: "Punjab",
    },
  ]);
  const [addObject,setAddObject] = useState({
    name: "Henry Potter",
    phone: "9920397890",
    address: "Bellandur, Banglore",
    city: "Paris",
    pincode: 234567,
    state: "Punjab",
  })
  let add = JSON.stringify(address);
  localStorage.setItem("DefaultAddress", add);

  const  updateForm = (e) =>{
    let name = e.target.name;
    console.log(name)
    let value = e.target.value;
    console.log("name:value",name,value)
    setAddObject({
        ...addObject,
        [name]:value,
    })
}
console.log(addObject)


  const [isAddBtn,setIsAddBtn] = useState(false);

  const onClickAddAddress = (event) =>{
    event.preventDefault();
    setAddress([...address,addObject])
    setIsAddBtn(!isAddBtn)
  }
  return (<>
   
  { !isAddBtn &&  <button  className="add-button" type="submit" onClick={()=>setIsAddBtn(!isAddBtn)}>Add Address</button> }
    { isAddBtn &&
    <div className="form-container">
      <form onSubmit={onClickAddAddress}>
        <div className="input-container">
          <label className="form-label">Name:</label>
          <input name='name' className="input-field" type="text" onChange={updateForm}/>
        </div>

        <div className="input-container">
          <label className="form-label">Phone:</label>
          <input name='phone' className="input-field" type="tel" onChange={updateForm} />
        </div>

        <div className="input-container">
        <label className="form-label">City:</label>
        <input  className="input-field" name='city' type="text" onChange={updateForm}/>
        </div>

        <div className="input-container">
        <label className="form-label">Pincode:</label>
        <input className="input-field" name='pincode' type="text" onChange={updateForm}/>
        </div>

        <div className="input-container">
        <label className="form-label">State:</label>
        <input className="input-field" type="text" name='state' onChange={updateForm} />
        </div>

        
        <div className="add-form-btn">
        <button  className="form-add-button" type="submit" >
          Add
        </button>
        <button className="form-cancel-button" onClick={()=>setIsAddBtn(!isAddBtn)}>
            Cancel
        </button>
        </div>
        
      </form>
    </div>
    }
    {address.map(({name,phone,city,pincode,state,address})=>
    <div className="address-detail-display">
        <p><span className="address-title">Name:</span><span className="address-value">{name}</span></p>
        <p><span className="address-title">Phone:</span><span className="address-value">{phone}</span></p>
        <p><span className="address-title">Address:</span><span className="address-value">{address}</span></p>
        <p><span className="address-title">City:</span><span className="address-value">{city}</span></p>
        <p><span className="address-title">Pincode:</span><span className="address-value">{pincode}</span></p>
        <p><span className="address-title">State:</span><span className="address-value">{state}</span></p>
        <button className="add-edit-btn">Edit</button>
        <button className="add-del-btn">Delete</button>

    </div>)}
    </>
  );
};
