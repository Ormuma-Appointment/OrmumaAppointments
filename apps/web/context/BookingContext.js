import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);

  const handleRead = async () => {
    const docRef = collection(db, "stores", "one", "employeeList");

    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      const el = doc.data();
      // console.log(doc.id, " => ", doc.data());
      setEmployeeData((prev) => [...prev, el]);
      SetIsLoading(false);
      // empArray.push(el);
    });
  };
  useEffect(() => {
    handleRead();
  }, []);
  console.log(chosen, "chosen");

  return (
    <BookingContext.Provider
      value={{ employeeData, setChosen, chosen, isLoading }}
    >
      {children}
    </BookingContext.Provider>
  );
};
