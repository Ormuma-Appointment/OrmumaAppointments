import { useEffect, useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth, useAuthContext } from "../context/AuthContext";
import { BookingContext } from "../context/BookingContext";
const BookingEmployee = () => {
  // const {storeID} = useAuthContext()
  const [selected, setSelected] = useState(null);
  // const [employeeData, setEmployeeData] = useState([]);
  const { employeeData, setChosen } = useContext(BookingContext);
  let service = { style: "style 1", price: "45€", time: "30min" };
  let employees = [
    {
      name: "John",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Marie",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Helene",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  let empArray = [];
  // const handleRead = async () => {
  //   const docRef = collection(db, "stores", "one", "employeeList");

  //   const docSnap = await getDocs(docRef);
  //   docSnap.forEach((doc) => {
  //     const el = doc.data();
  //     // console.log(doc.id, " => ", doc.data());
  //     setEmployeeData((prev) => [...prev, el]);
  //     // empArray.push(el);
  //   });
  // };
  // useEffect(() => {
  //   handleRead();
  // }, []);
  console.log(employeeData, "from booing employee");
  console.log(selected, "seleced");
  setChosen(selected);

  return (
    <div className={styles.pageContainer}>
      <h1>Unsere Mitarbeiter</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Employees</h4>
          {employeeData.map((employee, id) => {
            return (
              <SelectItem
                plus
                employee={employee.name}
                key={id}
                setSelected={setSelected}
              />
            );
          })}
        </CardContainer>
        <CardContainer>
          <SelectionCard
            selected={selected}
            setSelected={setSelected}
            service={service}
            step="employee"
          />
        </CardContainer>
      </div>
      <div>
        <h2>Unsere Mitarbeiter</h2>
      </div>
    </div>
  );
};

export default BookingEmployee;

//<div className={styles.employeeCardContainer}>
//  {employees.map((employee) => (
//    <EmployeeCard employee={employee} />
//  ))}
//</div>;
//
