import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SignatureCanvasComponent from './SignatureCanvasComponent'; // Import the SignatureCanvasComponent
import ClipboardImageUploader from './ClipboardImageUploader'; // Import the ClipboardImageUploader
import './design.css';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import image from './mathgirl.png'
import image2 from './profile.png'

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  /*
  // Define the query function
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  */

  const [generatedText, setGeneratedText] = useState("");

  // Function to send transcript to the Flask backend
  const sendTranscriptToBackend = async () => {
    try {

      const response = await fetch('http://127.0.0.1:5000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);

      // Process \\\\ back to \\
      const processedText = data.generated_text.replace(/\\\\/g, '\\').toLowerCase();
      setGeneratedText(processedText);

      // Handle the response data as needed
    } catch (error) {
      console.error('Error sending transcript to backend:', error);
    }
  };

  /*
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser doesn't support speech recognition.");
      return;
    }

     
    // Hugging Face API와 연결
    query({ "inputs": "Please change the following to LaTeX syntax: a plus b equals e to the power of 6" }).then((response) => {
      console.log(JSON.stringify(response));
    });
    

    
    // GeoGebra 스크립트 로드
    const script = document.createElement('script');
    script.src = "https://www.geogebra.org/apps/deployggb.js";
    script.async = true;
    script.onload = () => {
      const params = {
        "appName": "graphing",
        "width": 800,
        "height": 700,
        "showAlgebraInput": true
      };
      const applet = window.GGBApplet(params, true);
      applet.inject('ggb-element');
      
    };

    document.body.appendChild(script);
  }, [browserSupportsSpeechRecognition]);
  */

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ language: 'en-US', continuous: true });

  return (
    <div>
      <div className="header">
        <h1>
          <span className="custom-font"> ma.T</span> Math.Transpose to LaTeX
        </h1>
        <div className="user">
          <h2>Welcome back, Ewha!👏</h2>
        </div>
        <img src={image2} alt="profile" className="profile-image" />
        <img src={image} alt="Description" className="mathgirl-image" />
      </div>
      <div className="container">
        <div className="right-container">
          <div className="function-box image-box">
            <h2>🖼️ Upload Image</h2>
            <ClipboardImageUploader />
          </div>
          <div className="function-box voice-box">
            <h2>🎙️ Speech</h2>
            <p>Microphone: {listening ? '🔴ON' : '⚫OFF'}</p>
            <div className="transcript">
              <p>{transcript}</p>
            </div>
            <div className="button-container">
              <button onClick={startListening}>Start</button>
              <button onClick={SpeechRecognition.stopListening}>Stop</button>
              <button onClick={resetTranscript}>Reset</button>
              <button onClick={sendTranscriptToBackend}>Convert</button> {/* Convert Button */}
            </div>
          </div>
          <div className="function-box latex-box">
            <div className="left-section">
              <h2>➿ Equation</h2>
              <div className="transcript">
                <Latex>{`$${generatedText}$`}</Latex>
              </div>
            </div>
            <div className="dot-line"></div>
            <div className="right-section">
              <h2>🚀 LaTeX</h2>
              <div className="transcript">
                <p>{generatedText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="function-box handwriting-box">
          <h2>✍️ Handwriting</h2>
          <SignatureCanvasComponent />
        </div>
      </div>
      {/*<div id="ggb-element" className="ggb-box"></div> GeoGebra 앱을 넣을 요소 */}
    </div>
  );

};

export default Dictaphone;