import { useEffect, useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { BookingContext } from "../context/BookingContext";

const BookingService = () => {
  //const [isLoading, SetIsLoading] = useState(true);
  //const [serviceList, setServiceList] = useState({});
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [event, setEvent] = useState(selected);

  const { serviceList, setChosenService, isLoading } =
    useContext(BookingContext);

  const handleOpenStyle = (e) => {
    setIsOpenStyle(true);
    let id = e.target.value;
    let category = serviceList.serviceObj[id].category;
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selected) {
      let selectedService = {
        service: selected.service,
        duration: selected.duration,
        price: selected.price,
        category: selectedCategory,
      };
      setEvent(selectedService);
    }
  }, [selected]);

  setChosenService(event);

  return (
    <div className={styles.pageContainer}>
      <h1>Wähle deinen gewünschten Service</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          {!isLoading ? (
            serviceList.serviceObj.map((service, id) => {
              return (
                <>
                  <button
                    type="button"
                    onClick={handleOpenStyle}
                    key={id}
                    value={id}
                    className="h4"
                  >
                    {service.category.charAt(0).toUpperCase() +
                      service.category.slice(1)}{" "}
                    <i className="fa-solid fa-play"></i>
                  </button>

                  {service.services.map((el, index) => {
                    if (service.category === selectedCategory) {
                      return (
                        isOpenStyle && (
                          <SelectItem
                            duration={el.duration}
                            plus
                            price={el.price}
                            service={el.service}
                            key={index}
                            setSelected={setSelected}
                            onClick={() =>
                              setSelected({ price, service, duration })
                            }
                          />
                        )
                      );
                    }
                  })}
                </>
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
            category={selectedCategory}
            step="service"
          />
        </CardContainer>
      </div>
    </div>
  );
};

export default BookingService;
