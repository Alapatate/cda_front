import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    login(email, password);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-1/2">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-500">
          Login to your account to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};
