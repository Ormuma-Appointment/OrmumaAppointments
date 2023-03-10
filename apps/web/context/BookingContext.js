import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(undefined);
  const [serviceList, setServiceList] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployeeData] = useState({});
  const [eventData, setEventData] = useState([]);
  const [clientEventsData, setClientEventsData] = useState([]);
  const [chosenService, setChosenService] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [chosenSlot, setChosenSlot] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);

  async function getData() {
    if (storeId) {
      const docRef = doc(db, "stores", storeId, "services", "serviceList");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setServiceList(docSnap.data());
        SetIsLoading(false);
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    getData();
  }, [storeId]);

  const handleRead = async () => {
    if (storeId) {
      const docRef = collection(db, "stores", storeId, "employeeList");
      const docSnap = await getDocs(docRef);
      docSnap.forEach((doc) => {
        const el = { id: doc.id, ...doc.data() };
        setEmployeeData((prev) => [...prev, el]);
        SetIsLoading(false);
      });
    }
  };
  useEffect(() => {
    setEmployeeData([]);
    handleRead();
  }, [storeId]);

  async function getEmployee() {
    if (chosen !== undefined && chosen !== null && storeId) {
      const docRef = doc(
        db,
        "stores",
        storeId,
        "employeeList",
        chosen && chosen.employeeId
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedEmployeeData(docSnap.data());
        SetIsLoading(false);
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("No such document!");
    }
  }

  const getEvent = async () => {
    if (chosen !== undefined && chosen !== null && storeId) {
      const q = query(
        collection(db, "events"),
        where("storeId", "==", storeId)
      );
      const docSnap = await getDocs(q);
      let temp = [];
      docSnap.forEach((doc) => {
        const el = doc.data();
        if (el.employee === chosen.employee) {
          temp.push(el);
        }
        setEventData(temp);
        SetIsLoading(false);
      });
    }
  };

  const { currentUser } = useAuthContext();
  let user;
  if (currentUser) {
    user = {
      userId: currentUser.uid,
      userName: currentUser.displayName,
    };
  }

  //get client event to add them as well to breakTime
  const getClientEvent = async () => {
    if (user !== undefined && user !== null && user) {
      const q = query(
        collection(db, "events"),
        where("clientId", "==", user.userId)
      );
      const docSnap = await getDocs(q);
      let temp = [];
      docSnap.forEach((doc) => {
        const el = doc.data();

        temp.push(el);

        setClientEventsData(temp);
        SetIsLoading(false);
      });
    }
  };

  useEffect(() => {
    getEmployee();
    getEvent();
  }, [chosen, storeId]);

  useEffect(() => {
    getClientEvent();
  }, [currentUser]);

  let slotToString = "";

  if (chosenSlot) {
    const dateString = chosenSlot.date.toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    slotToString = dateString + " " + chosenSlot.start;
  }

  return (
    <BookingContext.Provider
      value={{
        serviceList,
        eventData,
        clientEventsData,
        employeeData,
        chosenService,
        setChosenService,
        setChosen,
        chosen,
        chosenSlot,
        setChosenSlot,
        isLoading,
        selectedEmployee,
        setStoreId,
        storeId,
        slotToString,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
