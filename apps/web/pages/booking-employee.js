import { useEffect, useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { db } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { BookingContext } from "../context/BookingContext";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";

const BookingEmployee = () => {
  //  const [isLoading, SetIsLoading] = useState(true);
  //const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  const { employeeData, setChosen, chosenService, isLoading } =
    useContext(BookingContext);

  const router = useRouter();
  const selectedService = router.query;

  function filterEmployees(selected) {
    let filteredEmployees = employeeData.filter((employee) => {
      return employee.services.some((category) => {
        return (
          category.category === selected.category &&
          category.services.some(
            (service) => service.service === selected.service
          )
        );
      });
    });
    return filteredEmployees.map((employee) => employee.name);
  }

  const filteredEmployees = filterEmployees(chosenService);

  console.log(selectedService);
  console.log("CHOSEN SERVICE FROM EMPLOYEE", chosenService);

  setChosen(selected);

  return (
    <div className={styles.pageContainer}>
      <h1>Wähle eine*n Mitarbeiter*In</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Mitarbeiter</h4>
          {!isLoading ? (
            filteredEmployees.map((employee, id) => {
              return (
                <SelectItem
                  plus
                  employee={employee}
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
            service={chosenService}
            step="employee"
          />
        </CardContainer>
      </div>
      <div>
        <h2>Unsere Mitarbeiter</h2>
        <EmployeeOverview employees={filteredEmployees} />
      </div>
    </div>
  );
};

export default BookingEmployee;
