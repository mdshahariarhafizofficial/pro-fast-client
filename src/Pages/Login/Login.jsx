import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const {loginUser, setUser, googleSignIn} = useAuth();
  const { register, handleSubmit, formState: {errors}, } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosUrl = useAxios();
  // Login
  const onSubmit = (data) => {
    loginUser(data.email, data.password)
    .then(result => {
      const user = result.user;
      setUser(user)
      navigate(`${location.state ? location.state : '/' }`)
      toast.success('Login Successful!')
    })
    .catch(error => {
      if (error) {
        toast.error('Invalid email or password')
      }
    })
  };

    // Google SingIn
    const handleGoogleSingIn = () => {
      googleSignIn()
      .then( async(result) => {
        if (result.user) {
          // Send user to DB
          const userInfo = {
            email: result.user.email,
            role: 'user',
            created_at: new Date().toISOString(),
          };

          const res = await axiosUrl.post('/users', userInfo);
          console.log('From Google SignIN --- ', res.data);

          setUser(result.user)
          navigate(`${location.state ? location.state : '/' }`)
         toast.success('Google Sing In SuccessFul!') 
        }
      })
      .catch(error => {
        if (error) {
          toast.error(error.message)
        }});
      
    }; 

  return (
    <div>
        {/* Form */}
        <StyledWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto form">

            <div>            
                {/* Welcome Text */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 mb-6 font-bold">Login with Profast</p>
            </div>

            <div className="flex-column">
            <label>Email </label>
            </div>
            <div className="inputForm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                viewBox="0 0 32 32"
                height={20}
            >
                <g data-name="Layer 3" id="Layer_3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                </g>
            </svg>
            <input 
            { ...register('email', { required: true }) }
            placeholder="Enter your Email" className="input" type="email" />
            </div>
            { errors.email?.type === 'required' && (
              <p className="text-red-500" role="alert">*email is required</p>
            ) }
            <div className="flex-column">
            <label>Password </label>
            </div>
            <div className="inputForm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                viewBox="-64 0 512 512"
                height={20}
            >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
                { ...register('password', {required: true, minLength: 6 }) }
                placeholder="Enter your Password"
                className="input"
                type="password"
            />
            </div>
            {
              errors.password?.type === 'required' && (
                <p className="text-red-500" role="alert">password is required</p>
              )
            }         
            {
              errors.password?.type === 'minLength' && (
                <p className="text-red-500" role="alert">password at least 6 character</p>
              )
            }

            <div>
            <span className="span underline text-secondary font-semibold">Forgot password?</span>
            </div>
            <button type="submit" className="button-submit bg-primary">Login</button>
            <p className="p">
            Don't have an account? <Link to='/register' className="text-lime-600">Register</Link>
            </p>
            <div className="divider">OR</div>
            <div className="flex-row">
            <button type="button" onClick={handleGoogleSingIn} className="btn google">
                <svg
                xmlSpace="preserve"
                style={{ enableBackground: "new 0 0 512 512" }}
                viewBox="0 0 512 512"
                y="0px"
                x="0px"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                width={20}
                version="1.1"
                >
                <path
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
            c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
            C103.821,274.792,107.225,292.797,113.47,309.408z"
                    style={{ fill: "#FBBB00" }}
                />
                <path
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
            c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
            c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                    style={{ fill: "#518EF8" }}
                />
                <path
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
            c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
            c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                    style={{ fill: "#28B446" }}
                />
                <path
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
            c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
            C318.115,0,375.068,22.126,419.404,58.936z"
                    style={{ fill: "#F14336" }}
                />
                </svg>
                Login With Google
            </button>
            </div>
        </form>
        </StyledWrapper>
    </div>
  );
};


const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }


  .button-submit {
    margin: 20px 0 10px 0;
    border: none;
    color: black;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
`;

export default Login;
