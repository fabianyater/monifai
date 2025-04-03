import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Input } from "../components/atoms/Input";
import { MaiButton } from "../components/atoms/MaiButton";
import { registerUser } from "../services/users/api";

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
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

    if (field === "name") {
      if (!value.trim()) {
        newErrors.name = "El nombre es obligatorio.";
      } else {
        newErrors.name = "";
      }
    }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = Object.values(errors).every((error) => error === "");

    if (isValid) {
      setIsLoading(true);
      toast.promise(registerUser(formData), {
        loading: "Registrando usuario...",
        success: (res) => {
          setIsLoading(false);
          setFormData({ name: "", email: "", password: "" });
          return res.message || "Registro exitoso";
        },
        error: (error) => {
          setIsLoading(false);
          const message = error.response?.data?.message || "Error inesperado";
          return message;
        },
      });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center h-screen">
      <section className="flex flex-col items-center justify-center gap-8 w-full md:w-full h-full py-8 px-6 md:px-28 bg-black text-white">
        <h2 className="text-clamp font-bold">Registrate en Monifai</h2>
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <Input
            label="Nombre completo"
            placeholder="John Doe"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Correo electrónico"
            placeholder="john@doe.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="********"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <MaiButton type="submit" label="Registrarse" loading={isLoading} />
        </form>
        <p className="text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-pretty font-black">
            Inicia sesión aquí
          </Link>
        </p>
      </section>
    </div>
  );
};
