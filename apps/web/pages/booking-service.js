import { useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";

const BookingService = () => {
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [selected, setSelected] = useState(undefined);

  console.log("selectedService", selected);

  //is opening everything and not only one service - to correct later
  const handleOpenStyle = () => {
    setIsOpenStyle(!isOpenStyle);
  };
  let services = [
    {
      name: "Cutting & Styling",
      service: [
        { style: "style 1", price: "45€", time: "30min" },
        { style: "style 2", price: "30€", time: "30min" },
        { style: "style 3", price: "25€", time: "30min" },
        { style: "style 4", price: "45€", time: "30min" },
        { style: "style 5", price: "455€", time: "30min" },
      ],
    },
    {
      name: "Colors",
      service: [
        { style: "color 1", price: "65€", time: "30min" },
        { style: "color 2", price: "70€", time: "30min" },
        { style: "color 3", price: "55€", time: "30min" },
      ],
    },
  ];
  return (
    <div className={styles.pageContainer}>
      <h1>Unsere Service</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          {services.map((service, id) => {
            return (
              <>
                <h4 type="button" onClick={handleOpenStyle}>
                  {service.name} <i className="fa-solid fa-play"></i>
                </h4>
                {service.service.map((el, id) => {
                  return (
                    isOpenStyle && (
                      <SelectItem
                        duration={el.time}
                        plus
                        price={el.price}
                        title={el.style}
                        key={id}
                        setSelected={setSelected}
                        onClick={() => setSelected(id)}
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
