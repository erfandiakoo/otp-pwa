import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import escapeHtml from 'escape-html';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
};
const VerifyPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
    const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = data => {
        const otp = `${escapeHtml(data.otp1)}${escapeHtml(data.otp2)}${escapeHtml(data.otp3)}${escapeHtml(data.otp4)}`;
        console.log('Submitted OTP:', otp);
        // TODO: Verify OTP
        navigate('/', { state: { otp } });

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^\d$/.test(value)) {
            setValue(`otp${index + 1}` as keyof FormValues, value);
            if (index < 3) {
                otpRefs[index + 1].current?.focus();
            }
        }
    };

    useEffect(() => {
        const receiveSms = async () => {
            if ('sms' in navigator) {
                try {
                    const sms = await (navigator as any).sms.receive();
                    const otpInput = document.getElementById('otpInput') as HTMLInputElement;
                    const otp = sms.content.match(/\b\d{6}\b/)[0];
                    otpInput.value = otp;
                } catch (error) {
                    console.log('failed to read sms:', error);
                }
            } else {
                console.log('no sms receiver...');
            }
        };

        receiveSms();
    }, []);
    return (
        <section className='flex flex-col justify-end items-center w-full h-screen bg-slate-800'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white w-full p-5 flex flex-col justify-center items-center gap-3 rounded-t-2xl'
            >
                <div >
                    <h1 className='text-xl'>تایید</h1>
                    <p className='text-xs mt-2'>کد تایید چهار رقمی ارسال شده به شماره تلفن خود را وارد کنید </p>
                </div>
                <div className='flex flex-row-reverse gap-4 mx-8 items-center justify-center'>
                    {Array.from({ length: 4 }).reverse().map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            {...register(`otp${index + 1}` as keyof FormValues, {
                                required: "این فیلد الزامی است",
                                pattern: {
                                    value: /^[0-9]$/,
                                    message: "فقط اعداد مجاز هستند"
                                }
                            })}
                            onChange={(e) => handleInputChange(e, index)}
                            ref={otpRefs[index]}
                            autoComplete="one-time-code"
                            className='border border-gray-300 text-center rounded-md w-full p-2'
                            id="otpInput"
                        />
                    ))}
                </div>
                <button type="submit" className='bg-black text-white rounded-xl px-8 py-2 w-full'>ارسال</button>
            </form>
        </section>
    );
}

export default VerifyPage
