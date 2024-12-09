'use client'
import axios from 'axios';
import 'cropperjs/dist/cropper.css'; // Import Cropper CSS
import Image from 'next/image';
import { useRef, useState } from 'react';
import Cropper from 'react-cropper';

const DEFAULT_AVATARS = [
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720802/ca14_ddfiba.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720802/ca12_ikxveh.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720802/ca13_cy9sbi.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720801/ca11_lfasqq.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720800/ca8_eozcrr.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720800/ca9_xgomi6.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720800/ca7_ofyrjx.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720799/ca4_tlwwfb.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720798/ca1_zqdjpt.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720799/ca5_jhsp4s.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720800/ca10_tdavqs.svg',
    'https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720799/ca2_z5mt4g.svg',
];

export default function AvatarSelector({ onAvatarChange }) {
    const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
    const fileInputRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [image, setImage] = useState(null);  // Image to be cropped
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDefaultAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        onAvatarChange(avatar);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);  // Set the image to be cropped
                setModalIsOpen(true);  // Show cropping modal
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        const croppedImage = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        setModalIsOpen(false);  // Close modal
        uploadImage(croppedImage);  // Upload the cropped image
    };

    const cropperRef = useRef(null);

    const uploadImage = async (imageUrl) => {
        const formData = new FormData();
        formData.append('file', imageUrl);
        formData.append('upload_preset', 'avatar');  // Replace with your Cloudinary upload preset

        try {
            setIsUploading(true);
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dn07zqh1o/image/upload',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    },
                }
            );

            setSelectedAvatar(response.data.secure_url);  // Set the selected avatar to the uploaded URL
            setProgress(100);  // Show complete progress
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('File upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            setImage(null);  // Reset the image after upload
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                    <Image
                        src={selectedAvatar}
                        alt="Selected avatar"
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
            </div>
            <div className="flex justify-center space-x-2">
                <div className='grid grid-cols-4 gap-2'>
                    {DEFAULT_AVATARS.map((avatar, index) => (
                        <span
                            key={index}
                            onClick={() => handleDefaultAvatarClick(avatar)}
                            className={`w-12 h-12 cursor-pointer rounded-full overflow-hidden border-2 ${selectedAvatar === avatar ? 'border-blue-500' : 'border-gray-300'
                                }`}
                        >
                            <Image src={avatar} alt={`Default avatar ${index + 1}`} width={60} height={60} />
                        </span>
                    ))}
                </div>

            </div>
            <div className="flex justify-center">
                <span
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Upload Custom Avatar
                </span>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {isUploading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            {modalIsOpen && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-80"
                >
                    <div
                        className="relative w-11/12  max-w-lg bg-white rounded-lg shadow-lg"
                    >
                        <div className="bg-white  w-full p-4 rounded-lg shadow-lg ">
                            <Cropper
                                ref={cropperRef}
                                src={image}
                                style={{ height: 300, width: '100%' }}
                                aspectRatio={1}
                                guides={false}
                                viewMode={1}  // Ensures cropper stays within bounds of image
                                dragMode="move"  // Enables dragging the crop box
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleCrop}
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Crop & Upload
                                </button>
                                <button
                                    onClick={() => setModalIsOpen(false)}
                                    className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
