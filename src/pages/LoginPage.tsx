import { Button } from "primereact/button";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";
import { Input } from "../components/atoms/Input";
import { useAuthContext } from "../lib/hooks/useAuth";
import { loginUser } from "../services/auth/api";

export const LoginPage = () => {
  const { token, setToken, isLoading } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value) {
        newErrors.email = "El correo es obligatorio.";
      } else if (!emailRegex.test(value)) {
        newErrors.email = "El correo no es válido.";
      } else {
        newErrors.email = "";
      }
    }

    if (field === "password") {
      if (!value) {
        newErrors.password = "La contraseña es obligatoria.";
      } else if (value.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);

    if (hasErrors) {
      return toast.error("Por favor, completa correctamente el formulario");
    }

    toast.promise(loginUser(formData), {
      loading: "Iniciando sesión...",
      success: (res) => {
        setFormData({ email: "", password: "" });
        localStorage.setItem("token", res.data.accessToken);
        setToken(res.data.accessToken);
        return res.message || "Inicio de sesión exitoso";
      },
      error: (error) => {
        const message = error.response?.data?.message || "Error inesperado";
        return message;
      },
    });
  };

  if (isLoading) {
    return toast.loading("Validando token...");
  }

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center h-screen">
      <section className="flex flex-col items-start justify-center gap-8 w-full md:w-[50%] h-full py-8 px-6 md:px-28 bg-black text-white">
        <h2 className="text-clamp">Iniciar sesión en Monifai</h2>
        <p className="text-xl">¡Qué bueno verte, Bienvenido!</p>
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="john@doe.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" label="Inciar sesión" />
        </form>
        <p className="text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-pretty font-black">
            Registrate aquí
          </Link>
        </p>
      </section>
      <section className="flex flex-col items-start justify-center gap-8 w-full md:w-[50%] h-full py-8 px-6 md:px-28 bg-[#0f28b8]">
        <h1 className="text-clamp font-bold">Monifai</h1>
        <div>
          <p className="font-black text-white mb-1">
            Comienza a gestionar tus gastos
          </p>
          <p className="text-xl md:text-2xl text-pretty text-white">
            Maneja tus ingresos y gastos con ayuda de la IA
          </p>
        </div>
      </section>
    </div>
  );
};
