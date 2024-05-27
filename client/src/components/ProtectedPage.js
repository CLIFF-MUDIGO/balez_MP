import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../redux/loadersSlice';
import { setUser } from '../redux/usersSlice';



function ProtectedPage({ children }) {

    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateToken = async () => {
        try {

            dispatch(setLoader(true));
            const response = await GetCurrentUser();
            dispatch(setLoader(false));
            if (response.success) {
                dispatch(setUser(response.data));
            } else {
                navigate('/login');
                message.error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            navigate('/login');
            message.error(error.message);
        }


    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {

            navigate('/login');
        }

    }, [navigate]);


    return (
        user && (
            <div>
                {/* header */}
                <div className='flex justify-between items-center p-5 bg-primary'>

                    <h1 className='text-white text-2xl'>
                        CMP
                    </h1>
                    <div className='bg-white py-2 px-5 rounded flex gap-1 items-center'>
                        <i className="ri-user-line"></i>
                        <span
                            className="underline cursor-pointer uppercase"
                            onClick={() => navigate("/profile")}
                        >

                            {user.name}
                        </span>
                        <i className="ri-logout-box-r-line ml-10"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}

                        ></i>

                    </div>


                </div>

                {/* content */}
                <div className='p-5'>
                    {children}
                </div>
            </div>


        )

    );
}

export default ProtectedPage
