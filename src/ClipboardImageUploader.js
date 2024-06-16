import React, { useState } from 'react';

const ClipboardImageUploader = () => {
    const [image, setImage] = useState(null);

    const handlePaste = (event) => {
        const items = event.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImage(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    };

    return (
        <div className="clipboard-uploader" onPaste={handlePaste}>
            <h4>Upload Image from Clipboard</h4>
            <p>Paste an image here (Ctrl+V / Cmd+V)</p>
            {image && <img src={image} alt="Pasted from clipboard" />}
        </div>
    );
};

export default ClipboardImageUploader;
