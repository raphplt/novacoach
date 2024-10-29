"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { getUser, getStructureById } from "@/lib/dal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StructureType } from "type/structure";
import { UserType } from "type/user";



export default function DashboardStructure() {
  const { user } = useAuth();
  const [infosUser, setInfosUser] = useState<UserType>();
  const [infosStructure, setInfosStructure] = useState<StructureType>();

  const methods = useForm({
    mode: "onSubmit",
  });
  const { reset } = methods;

  useEffect(() => {
	getUser()
	  .then((data) => {
		console.log("Données récupérées", data);
		setInfosUser(data);
		reset(data);
	  })
	  .catch((error) => {
		console.error("Erreur lors de la récupération des données", error);
	  });
  }, []);


  useEffect(() => {
	getStructureById()
	  .then((data) => {
		console.log("Données récupérées", data);
		setInfosStructure(data);
		reset(data);
	  })
	  .catch((error) => {
		console.error("Erreur lors de la récupération des données", error);
	  });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {infosUser ? <p>User: {infosUser.firstName}</p> : <p>Loading...</p>}
      {infosUser ? <p>stucture: {infosStructure?.name}</p> : <p>Loading...</p>}
    </div>
  );
}
