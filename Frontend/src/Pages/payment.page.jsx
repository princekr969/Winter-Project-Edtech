import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import paymentService from '../services/payment';

const PaymentPage = () => {
    const {amount ,courseId} = useParams();
    
    const [QRUrl, setQRUrl] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [submittedUTR, setSubmittedUTR] = useState('');
    const [utr, setUtr] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (utr) => {
        
        setSubmittedUTR(utr);
        setSubmitted(true);
    };

    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setUtr(value);
        setTouched(true);
    };

    useEffect(() => {
        async function fetchQRUrl(){
            try {
                const data = await paymentService.getQRUrl(amount);
                console.log("payment dta", data.message.qrImageUrl);
                if(data.success){
                    setQRUrl(data.message.qrImageUrl)
                }
            } catch (error) {
                
            }
        }

        
        fetchQRUrl();
    },[])

    

    return (
    <div className='h-screen p-4 flex flex-col justify-center'>

        <div className="max-w-md  max-h-[600px] w-full mx-auto bg-white border border-gray-500 shadow-md">
            <div className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Payment Verification
                </h2>

                <div className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-sm shadow-lg mb-4">
                             {QRUrl ? (
                                <img src={QRUrl} alt="QR Code" className="mx-auto w-48 h-48" />
                                ) : (
                                <p>Loading...</p>)}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm font-medium">
                            <span>Scan this QR code</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label
                            htmlFor="utr"
                            className="block text-sm font-medium text-gray-700 mb-1"
                            >
                            Enter UTR Number
                            </label>
                            <div className="relative">
                            <input
                                id="utr"
                                type="text"
                                value={utr}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border bg-white transition-all duration-200`}
                                placeholder="e.g., UTR123456789"
                            />
                            
                            </div>
                            
                        </div>

                        <button
                            type="submit"
                            className={`
                            w-full flex bg-blue-700 text-white items-center justify-center
                            px-4 py-3 font-medium hover:bg-blue-800
                            transition-all duration-200 `}
                        >
                            <span>Submit</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaymentPage;
