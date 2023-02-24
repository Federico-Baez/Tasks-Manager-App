import React, {useState} from 'react';

const LoginForm = () => {

    const InitialCredentials =[{
        user: "",
        password: ""
    }
    ];

    const[credentials, setCredential] = useState(InitialCredentials);

    return (
        <div>
            
        </div>
    );
}

export default LoginForm;
