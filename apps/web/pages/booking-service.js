import { useEffect, useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { admin } from "./data-sample";

const BookingService = () => {
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [selected, setSelected] = useState(null);

  console.log("Admin", admin.services);
  console.log("selectedService", selected);

  //is opening everything and not only one service - to correct later
  const handleOpenStyle = () => {
    setIsOpenStyle(!isOpenStyle);
  };

  let services = admin.services;

  //let event = { service: selected.title, duration: selected.duration };

  //push event to array of event database now or later - but find a way to import the event object to booking employee

  //console.log("Event", event);
  useEffect(() => {
    console.log("selectedService", selected);
  }, [selected]);

  return (
    <div className={styles.pageContainer}>
      <h1>Unsere Service</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          {services.map((service, id) => {
            return (
              <>
                <h4 type="button" onClick={handleOpenStyle}>
                  {service.categorie} <i className="fa-solid fa-play"></i>
                </h4>
                {service.services.map((el, id) => {
                  return (
                    isOpenStyle && (
                      <SelectItem
                        duration={el.duration}
                        plus
                        price={el.price}
                        title={el.service}
                        key={id}
                        setSelected={setSelected}
                        onClick={() => setSelected({ price, title, duration })}
                      />
                    )
                  );
                })}
              </>
            );
          })}
        </CardContainer>
        <CardContainer>
          <SelectionCard
            selected={selected}
            setSelected={setSelected}
            step="service"
          />
        </CardContainer>
      </div>
    </div>
  );
};

export default BookingService;
