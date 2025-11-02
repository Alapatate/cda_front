import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, user, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const displayName = formData.get("displayName");
    if (isRegister) {
      register(email, password, displayName);
    } else {
      login(email, password);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-1/4">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">
            {isRegister ? "Register" : "Login"}
          </h1>
          <Button onClick={() => setIsRegister(!isRegister)} variant="outline">
            {isRegister ? "Login" : "Register"}
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <Input name="displayName" type="text" placeholder="Display Name" />
          )}
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">{isRegister ? "Register" : "Login"}</Button>
        </form>
      </div>
    </div>
  );
};
