import { useState } from "react";
import { useVoiceRecognition } from "../../lib/hooks/useVoiceRecognition";
import { MaiButton } from "./MaiButton";

export const VoiceInput = () => {
  const [startRecording, setStartRecording] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [interimText, setInterimText] = useState<string>("");

  useVoiceRecognition({
    isRecording: startRecording,
    setIsRecording: setStartRecording,
    onResult: setRecognizedText,
    onInterimResult: setInterimText,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <MaiButton
        icon="pi pi-microphone"
        rounded
        className={startRecording ? "pulse-animation" : ""}
        style={{
          backgroundColor: startRecording ? "red" : "",
          border: "none",
        }}
        onClick={() => setStartRecording(!startRecording)}
      />
      <p className="italic text-center font-thin text-gray-400 min-h-[1.5rem] px-4">
        {(() => {
          let displayText = "Click para empezar a hablar";
          if (startRecording) {
            displayText = `Escuchando... "${interimText}"`;
          } else if (recognizedText) {
            displayText = recognizedText;
          }
          return displayText;
        })()}
      </p>
    </div>
  );
};
