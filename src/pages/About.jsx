import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-lg">This is the about page</p>
      <Button asChild>
        <Link to="/">
          <ArrowLeft />
          Retour a la page d'accueil
        </Link>
      </Button>
    </div>
  );
};
