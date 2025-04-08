import { useState } from "react";
import { useVoiceRecognition } from "../../lib/hooks/useVoiceRecognition";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { MaiButton } from "./MaiButton";

export const VoiceInput = () => {
  const [startRecording, setStartRecording] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [interimText, setInterimText] = useState<string>("");
  const setTransactionInput = useTransactionStore(
    (state) => state.setTransactionInput
  );

  useVoiceRecognition({
    isRecording: startRecording,
    setIsRecording: setStartRecording,
    onResult: setRecognizedText,
    onInterimResult: setInterimText,
  });

  const handleAccept = () => {
    if (!recognizedText.trim()) return;
    setTransactionInput(recognizedText.trim());
    setRecognizedText("");
  };

  const handleCancel = () => {
    setRecognizedText("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-4">
        {!startRecording && recognizedText && (
          <MaiButton
            icon="pi pi-times"
            size="small"
            rounded
            className="bg-transparent border-none hover:bg-red-500"
            onClick={handleCancel}
          />
        )}
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
        {!startRecording && recognizedText && (
          <MaiButton
            icon="pi pi-check"
            rounded
            size="small"
            className="bg-transparent border-none hover:bg-green-700 text-sm"
            onClick={handleAccept}
          />
        )}
      </div>
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
