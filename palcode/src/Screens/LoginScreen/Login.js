import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin} from '@react-oauth/google';
import { googleAuth} from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { api} from '../../api/api';
const Login = () => {
  const navigate = useNavigate();
  const [ isOTP , setIsOtp ] = useState(false);
  const [dataOtp , setDataOtp] = useState(0); 
  const [email , setEmail] = useState("");
   console.log(email);
   console.log(api);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["credential"]) {
        if (authResult["credential"]) {
            const result = await googleAuth(authResult.credential);
            console.log(result);
            console.log(authResult  )
            console.log(authResult["credential"] )

            const {email, name, pic } = result.data.user;
            const token = result.data.token;
            const obj = {email,name, token, pic};
            localStorage.setItem('user-info', JSON.stringify(obj));
          navigate('/app');
        }
        // Handle the auth code
      } else {
        console.log(authResult);
        // throw new Error(authResult);
      }
    }
     catch(e) {
      console.log('Error while Google Login...', e);
    }
  };


  const handleSendOtp =  async()=>{
    try{
      await api.post(
        '/auth/signIn',
        {
          email
        },{
        headers: {
          'Content-Type': 'application/json', 
        }
      });
      setIsOtp(true)
    }
    catch(err){

    }

  }

  const handleVerifyOtp = async () =>{
    try{
      const {data} = await api.post(
        '/auth/verifyOtp',
        {
          email,
          dataOtp
        },{
        headers: {
          'Content-Type': 'application/json', 
        }
      });
      console.log(data);
      const token = data?.token;

      localStorage.setItem('user-info', JSON.stringify({token}));
      navigate('/app');
      setIsOtp(true)
    }
    catch(err){
      console.log(err);
    }

  }
  
  

  return (
    <GoogleOAuthProvider clientId ="555282467169-d699b6mrgmmvm3chp6uud5g2po1d3qie.apps.googleusercontent.com"  >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                { isOTP ?  'Enter OTP':'Email address' } 
              </label>
              <div className="mt-2">
               {
              isOTP ? 
              <input
              type="number"
              onChange={(e)=>setDataOtp(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
              :<input

                  id="email"
                  name="email"
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
               }
              </div>
            </div>

          

            <div>
              {
                isOTP
                ?
                <button 
                onClick={handleVerifyOtp}
                  className="mt-2 mb-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Enter OTP
                </button>
                :
                <button 
                onClick={handleSendOtp}
                  className="mt-2 mb-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              }
            
              <GoogleLogin

              onSuccess={responseGoogle}
              onError={responseGoogle}
              useOneTap
            />
              
            </div>
          

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
