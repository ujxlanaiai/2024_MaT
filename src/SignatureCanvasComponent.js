// src/SignatureCanvasComponent.js
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureCanvasComponent = () => {
    const sigCanvas = useRef(null);

    const clear = () => {
        sigCanvas.current.clear();
    };

    const download = () => {
        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    };

    return (
        <div className="signature-container">
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            />
            <div className="buttons">
                <button onClick={clear}>Clear</button>
                <button onClick={download}>Finish</button>
            </div>
        </div>
    );
};

export default SignatureCanvasComponent;
