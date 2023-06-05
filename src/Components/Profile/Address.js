import { useState } from "react";

export const Address = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState([
    // {
    //   name: "Henry Potter",
    //   phone: "9920397890",
    //   address: "Bellandur, Banglore",
    //   city: "Paris",
    //   pincode: 234567,
    //   state: "Punjab",
    // },
  ]);
  const [addObject, setAddObject] = useState({
    name: "Henry Potter",
    phone: "9920397890",
    address: "Bellandur, Banglore",
    city: "Paris",
    pincode: 234567,
    state: "Punjab",
  });

  const updateForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAddObject({
      ...addObject,
      [name]: value,
    });
  };

  const [isAddBtn, setIsAddBtn] = useState(false);

  const onClickAddAddress = (event) => {
    event.preventDefault();
    const updatedAddress = [...address, addObject];
    localStorage.setItem("DefaultAddress", JSON.stringify([...updatedAddress]));
    setAddress([...address, addObject]);
    setIsAddBtn(!isAddBtn);
  };

  const deleteAddress = (index) => {
    const updatedAddress = address;
    updatedAddress.splice(index, 1);
    setAddress([...updatedAddress]);
    localStorage.setItem("DefaultAddress", JSON.stringify([...updatedAddress]));
  };

  let getAddress = JSON.parse(localStorage.getItem("DefaultAddress"));

  const onClickEditBtn = (index) => {
    setIsEditing(!isEditing);
    const addr = address[index];
    setAddObject(addr);
  };

  const onClickUpdateAddress = (event) => {
    event.preventDefault();

    const updatedAddress = address.map((item) => {
      if (item.name === addObject.name) {
        return { ...addObject };
      }
      return item;
    });

    localStorage.setItem("DefaultAddress", JSON.stringify([...updatedAddress]));
    setAddress([...updatedAddress]);
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {!isAddBtn && (
        <div>
          <button
            className="add-button"
            type="submit"
            onClick={() => setIsAddBtn(!isAddBtn)}
          >
            Add Address
          </button>
        </div>
      )}
      {isAddBtn && (
        <div className="form-container">
          <form onSubmit={onClickAddAddress}>
            <div className="input-container">
              <label className="form-label">Name:</label>
              <input
                name="name"
                className="input-field"
                type="text"
                onChange={updateForm}
              />
            </div>

            <div className="input-container">
              <label className="form-label">Phone:</label>
              <input
                name="phone"
                className="input-field"
                type="tel"
                onChange={updateForm}
              />
            </div>

            <div className="input-container">
              <label className="form-label">City:</label>
              <input
                className="input-field"
                name="city"
                type="text"
                onChange={updateForm}
              />
            </div>

            <div className="input-container">
              <label className="form-label">Pincode:</label>
              <input
                className="input-field"
                name="pincode"
                type="text"
                onChange={updateForm}
              />
            </div>

            <div className="input-container">
              <label className="form-label">State:</label>
              <input
                className="input-field"
                type="text"
                name="state"
                onChange={updateForm}
              />
            </div>

            <div className="add-form-btn">
              <button className="form-add-button" type="submit">
                Add
              </button>
              <button
                className="form-cancel-button"
                onClick={() => setIsAddBtn(!isAddBtn)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isEditing && (
        <form onSubmit={onClickUpdateAddress}>
          <div className="input-container">
            <label className="form-label">Name:</label>
            <input
              name="name"
              value={addObject.name}
              className="input-field"
              type="text"
              onChange={updateForm}
            />
          </div>

          <div className="input-container">
            <label className="form-label">Phone:</label>
            <input
              name="phone"
              value={addObject.phone}
              className="input-field"
              type="tel"
              onChange={updateForm}
            />
          </div>

          <div className="input-container">
            <label className="form-label">City:</label>
            <input
              className="input-field"
              value={addObject.city}
              name="city"
              type="text"
              onChange={updateForm}
            />
          </div>

          <div className="input-container">
            <label className="form-label">Pincode:</label>
            <input
              className="input-field"
              value={addObject.pincode}
              name="pincode"
              type="text"
              onChange={updateForm}
            />
          </div>

          <div className="input-container">
            <label className="form-label">State:</label>
            <input
              className="input-field"
              type="text"
              name="state"
              value={addObject.state}
              onChange={updateForm}
            />
          </div>

          <div className="add-form-btn">
            <button className="form-add-button" type="submit">
              update
            </button>
            <button
              className="form-cancel-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {getAddress &&
        getAddress.map(
          ({ name, phone, city, pincode, state, address }, index) => (
            <div className="address-detail-display ">
              <input type="radio" name="address" />
              <p>
                <span className="address-title">Name:</span>
                <span className="address-value">{name}</span>
              </p>
              <p>
                <span className="address-title">Phone:</span>
                <span className="address-value">{phone}</span>
              </p>
              <p>
                <span className="address-title">Address:</span>
                <span className="address-value">{address}</span>
              </p>
              <p>
                <span className="address-title">City:</span>
                <span className="address-value">{city}</span>
              </p>
              <p>
                <span className="address-title">Pincode:</span>
                <span className="address-value">{pincode}</span>
              </p>
              <p>
                <span className="address-title">State:</span>
                <span className="address-value">{state}</span>
              </p>
              <button
                className="add-edit-btn"
                onClick={() => onClickEditBtn(index)}
              >
                Edit
              </button>
              <button
                className="add-del-btn"
                onClick={() => deleteAddress(index)}
              >
                Delete
              </button>
            </div>
          )
        )}
    </div>
  );
};
