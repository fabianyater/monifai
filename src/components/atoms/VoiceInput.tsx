import { useState } from "react";
import { toast } from "sonner";
import { useVoiceRecognition } from "../../lib/hooks/useVoiceRecognition";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { ClassifiedTransaction } from "../../lib/types/Transactions";
import { useClassifyTransaction } from "../../services/transactions/mutations";
import { MaiButton } from "./MaiButton";

export const VoiceInput = () => {
  const [startRecording, setStartRecording] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [interimText, setInterimText] = useState<string>("");
  const setTransactionInput = useTransactionStore(
    (state) => state.setTransactionInput
  );
  const setClassifiedTransactions = useTransactionStore(
    (state) => state.setClassifiedTransaction
  );
  const setIsTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen
  );
  const { mutateAsync } = useClassifyTransaction();

  const handleClassifyTransaction = (input: string) => {
    toast.promise<ClassifiedTransaction>(mutateAsync(input), {
      loading: "Clasificando...",
      success: (data) => {
        setClassifiedTransactions(data);
        setIsTransactionModalOpen(true);
        return "Clasificación exitosa";
      },
      error: (error) => {
        console.error("Error al clasificar la transacción:", error);
        return error.message || "Error inesperado";
      },
    });
  };

  useVoiceRecognition({
    isRecording: startRecording,
    setIsRecording: setStartRecording,
    onResult: setRecognizedText,
    onInterimResult: setInterimText,
  });

  const handleAccept = () => {
    const trimmedText = recognizedText.trim();
    if (!trimmedText) return;

    setTransactionInput(trimmedText);
    setRecognizedText("");
    handleClassifyTransaction(trimmedText);
  };

  const handleCancel = () => {
    setRecognizedText("");
    setTransactionInput("");
    setStartRecording(false);
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
