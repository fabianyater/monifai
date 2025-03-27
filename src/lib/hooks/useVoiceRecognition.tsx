// hooks/useVoiceRecognition.ts
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useVoiceRecognition({
  isRecording,
  setIsRecording,
  onResult,
  onInterimResult,
}: {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  onResult: (text: string) => void;
  onInterimResult: (text: string) => void;
}) {
  const recognitionRef = useRef<any>(null);
  const isRecognizingRef = useRef(false);
  const shouldRetryRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "es-CO";
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = false;

    recognitionRef.current.onstart = () => {
      isRecognizingRef.current = true;
    };

    recognitionRef.current.onend = () => {
      isRecognizingRef.current = false;
      onInterimResult("");

      setTimeout(() => {
        if (shouldRetryRef.current) {
          shouldRetryRef.current = false;
          try {
            recognitionRef.current.start();
          } catch (e) {
            toast.error("No se pudo reiniciar el reconocimiento.");
            setIsRecording(false);
          }
        } else if (isRecording) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            toast.error("No se pudo continuar el reconocimiento.");
            setIsRecording(false);
          }
        } else {
          setIsRecording(false);
        }
      }, 500); // debounce de silencio
    };

    recognitionRef.current.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (const result of event.results) {
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        onResult(final);
        onInterimResult("");
      } else {
        onInterimResult(interim);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      if (event.error === "no-speech") {
        toast.error("No se detectó voz. Intentando de nuevo...");
        shouldRetryRef.current = true;
      } else {
        toast.error(`Error: ${event.error}`);
        setIsRecording(false);
      }
    };
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;

    if (!recognition) return;

    if (isRecording && !isRecognizingRef.current) {
      try {
        recognition.start();
      } catch (err) {
        console.error("Error al iniciar reconocimiento:", err);
        toast.error("No se pudo iniciar el reconocimiento de voz.");
      }
    }

    if (!isRecording && isRecognizingRef.current) {
      recognition.stop();
    }
  }, [isRecording]);
}
