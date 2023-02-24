import React, {useState} from 'react';

const RegisterForm = () => {

    const InitialData =[{
        user: "",
        name: "",
        email:"",
        password: ""
    }
    ];

    const[data, setData] = useState(InitialData);

    return (
        <div>
            
        </div>
    );
}

export default RegisterForm;
