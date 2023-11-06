import React from "react";
import '../../utils/bootstrap.css'
import '../styles_login.css'

const Fields = (props) => {
    const { login, handleInputChange, fields } = props;


    let fieldsHTML = fields.map((field, index) => {

        if (field.type) {
            return (< div key={index} className="form-row" >
                <div className="col-lg-7">
                    <input
                        placeholder={field.placeholder}
                        id={field.id}
                        className="form-control my-3 p-2"
                        onChange={handleInputChange}
                        name={field.name}
                        value={login[field.name]}
                        type={field.type} />
                </div>
            </div >)
        } else {
        return (< div key={index} className="form-row" >
            <div className="col-lg-7">
                <input
                    placeholder={field.placeholder}
                    id={field.id}
                    className="form-control my-3 p-2"
                    onChange={handleInputChange}
                    name={field.name}
                    value={login[field.name]} />
            </div>
        </div >)
        }
        
    });

    return (
        fieldsHTML
    );
}

export default Fields;