import { useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";

const BookingEmployee = () => {
  const [selected, setSelected] = useState(null);

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
  return (
    <div className={styles.pageContainer}>
      <h1>Unsere Mitarbeiter</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Employees</h4>
          {employees.map((employee, id) => {
            return (
              <SelectItem
                plus
                title={employee.name}
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