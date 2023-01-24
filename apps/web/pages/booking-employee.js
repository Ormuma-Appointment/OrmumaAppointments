import { useEffect, useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { db } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";

//let service = { style: "style 1", price: "45€", time: "30min" };

const BookingEmployee = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  async function getEmployees() {
    let employeesArray = [];
    const querySnapshot = await getDocs(
      collection(db, "stores", "one", "employeeList")
    );
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, doc.data());
      employeesArray.push(doc.data());
    });
    setEmployees(employeesArray);
    SetIsLoading(false);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const router = useRouter();
  const selectedService = router.query;

  console.log("selected service from employee", selectedService);

  return (
    <div className={styles.pageContainer}>
      <h1>Wähle eine*n Mitarbeiter*In</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Employees</h4>
          {!isLoading ? (
            employees.map((employee, id) => {
              return (
                <SelectItem
                  plus
                  employee={employee.name}
                  key={id}
                  setSelected={setSelected}
                />
              );
            })
          ) : (
            <div>Is loading</div>
          )}
        </CardContainer>
        <CardContainer>
          <SelectionCard
            selected={selected}
            setSelected={setSelected}
            service={selectedService}
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
