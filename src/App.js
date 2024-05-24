import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CallGPT } from './gpt';
import SignatureCanvasComponent from './SignatureCanvasComponent'; // Import the SignatureCanvasComponent
import ClipboardImageUploader from './ClipboardImageUploader'; // Import the ClipboardImageUploader
import './design.css';

const Dictaphone = () => {

  /*audio*/
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    // useEffect는 조건 없이 항상 호출되어야 합니다.
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser doesn't support speech recognition.");
      return;
    }

    // Flask 서버와 연결
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, [browserSupportsSpeechRecognition]);




  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ language: 'ko', continuous: true });


  /*GPT call -> 유료라 실패*/
  const handleClickAPICall = async () => {
    await CallGPT();
  };


  /*HTML*/
  return (
    <div>
      <div className="header">
        <h1>MaT</h1>
      </div>
      <div className="dictaphone-container">
        <div className="function-box">
          <h2>🎙️ Speech</h2>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <button onClick={handleClickAPICall}>GPT Call</button>
          <p>{transcript}</p>
        </div>
        <div className="function-box">
          <h2>✍️ Handwriting</h2>
          <SignatureCanvasComponent />
        </div>
        <div className="function-box">
          <h2>🖼️ Upload Image</h2>
          <ClipboardImageUploader />
        </div>
      </div>
    </div>
  );
};

export default Dictaphone;
