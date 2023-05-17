import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const {getLoginData} = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div>
            <p>Login Page</p> 
            <form >
                    <label>userName
                        <input type="email" required/>
                    </label>
                    <label>Password
                        <input type="password" required/>
                    </label>
                    <button type="submit" onClick={getLoginData}>Log In</button>
                    <button onClick={()=>navigate('/signUp')}>Create New account</button>
            </form>         
        </div>
    )
}