import { useEffect, useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { BookingContext } from "../context/BookingContext";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";
import BreadCrumb from "../ui/components/BreadCrumb/BreadCrumb";
import { useRouter } from "next/router";
import Link from "next/link";

const BookingEmployee = () => {
  const [selected, setSelected] = useState(null);
  const {
    employeeData,
    setChosen,
    chosenService,
    setChosenService,
    isLoading,
    storeId,
    setStoreId,
  } = useContext(BookingContext);

  const router = useRouter();
  const query = router.query;
  if (!storeId) {
    setStoreId(query.storeid);
  }
  useEffect(() => {
    if (!chosenService) {
      setChosenService({
        service: query.service,
        duration: query.duration,
        price: query.price,
        category: query.category,
        storeId: storeId,
      });
    }
    // eslint-disable-next-line
  }, [storeId]);

  function filterEmployees(selected) {
    let filteredEmployees = employeeData.filter((employee) => {
      return employee.services.some((category) => {
        return (
          category.category === selected?.category &&
          category.services.some(
            (service) => service.service === selected.service
          )
        );
      });
    });
    return filteredEmployees.map((employee) => [employee.id, employee.name]);
  }

  const filteredEmployees = filterEmployees(chosenService);
  setChosen(selected);

  return (
    <div className={styles.pageContainer}>
      <BreadCrumb
        steps={[
          "1. Service wählen",
          "2. Stylist*In wählen",
          "3. Termin wählen",
        ]}
        current={1}
      />
      <h1>Mitarbeiter*In wählen</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Mitarbeiter</h4>
          {!isLoading ? (
            filteredEmployees.map((employee, id) => {
              return (
                <Link
                  href={window.screen.availWidth < 760 ? "#overview" : ""}
                  scroll={false}
                  key={id}
                >
                  <SelectItem
                    plus
                    employee={employee[1]}
                    employeeId={employee[0]}
                    key={id}
                    setSelected={setSelected}
                    storeId={storeId}
                  />
                </Link>
              );
            })
          ) : (
            <div>Is loading</div>
          )}
        </CardContainer>

        <div className="container" id="overview">
          <SelectionCard
            selected={selected}
            setSelected={setSelected}
            service={chosenService}
            step="employee"
          />
        </div>
      </div>
      <div>
        <h2>Unsere Mitarbeiter</h2>
        <EmployeeOverview
          employees={employeeData.filter((el) =>
            filteredEmployees.map((employee) => {
              employee.includes(el.name);
            })
          )}
        />
      </div>
    </div>
  );
};

export default BookingEmployee;
