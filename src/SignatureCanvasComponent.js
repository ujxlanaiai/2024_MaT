import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureCanvasComponent = () => {
    const sigCanvas = useRef(null);

    const clear = () => {
        sigCanvas.current.clear();
    };

    const sendImageToBackend = async () => {
        const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = trimmedCanvas.width;
        tempCanvas.height = trimmedCanvas.height;

        const ctx = tempCanvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(trimmedCanvas, 0, 0);

        const dataURL = tempCanvas.toDataURL('image/png');

        try {
            const response = await fetch('http://127.0.0.1:5000/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: dataURL }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Response from backend:', responseData);

            // Handle the response data as needed
        } catch (error) {
            console.error('Error sending image to backend:', error);
        }
    };

    return (
        <div className="signature-container">
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 800, height: 400, className: 'sigCanvas' }} // Adjust width and height here
            />
            <div className="buttons">
                <button onClick={clear}>Clear</button>
                <button onClick={sendImageToBackend}>Convert</button>
            </div>
        </div>
    );
};

export default SignatureCanvasComponent;
