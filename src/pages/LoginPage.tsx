import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import escapeHtml from 'escape-html';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    phoneNumber: string;
};
const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = data => {
        const escapedPhoneNumber = escapeHtml(data.phoneNumber);
        console.log('Submitted phone number:', escapedPhoneNumber);
        navigate('/verify', { state: { phoneNumber: escapedPhoneNumber } });
    };
    return (
        <section className='flex flex-col justify-end items-center w-full h-screen bg-slate-800'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white w-full p-5 flex flex-col justify-center items-center gap-2 rounded-t-2xl'
            >
                <div >
                    <h1 className='text-xl'>ورود</h1>
                    <p className='text-xs mt-2'>برای ارسال کد تایید به تلفن همراه شما, شماره تلفن خود را وارد کنید</p>
                </div>
                <div className='w-full'>
                    <input
                        id="phoneNumber"
                        {...register("phoneNumber", {
                            required: "این فیلد الزامی است",
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: "شماره تلفن معتبر وارد کنید"
                            }
                        })}
                        className=' border border-gray-300 rounded-md w-full p-2'
                        inputMode='numeric'
                        placeholder='شماره تلفن همراه خود را وارد کنید '
                    />
                    {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
                </div>
                <button type="submit" className='bg-black text-white rounded-xl px-8 py-2 w-full'>ارسال</button>
            </form>
        </section>
    )
}

export default LoginPage
