import React, { useEffect, useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { BookingContext } from "../context/BookingContext";
import BreadCrumb from "../ui/components/BreadCrumb/BreadCrumb";
import { useRouter } from "next/router";
import Down from "../ui/components/assets/down.svg";
import Link from "next/link";

const BookingService = () => {
  const [loading, setLoading] = useState(true);
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [event, setEvent] = useState(selected);
  const router = useRouter();
  const { storeId, setStoreId, serviceList, setChosenService, isLoading } =
    useContext(BookingContext);
  const query = router.query;

  useEffect(() => {
    setStoreId(query.storeid);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

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
        storeId: storeId,
      };
      setEvent(selectedService);
    }
    // eslint-disable-next-line
  }, [selected]);

  setChosenService(event);

  return (
    <div className={styles.pageContainer}>
      <BreadCrumb
        steps={[
          "1. Service wählen",
          "2. Stylist*In wählen",
          "3. Termin wählen",
        ]}
        current={0}
      />
      <h1>Service wählen</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          {!loading && serviceList.serviceObj && !isLoading ? (
            serviceList.serviceObj.map((service, id) => {
              return (
                <React.Fragment key={id}>
                  <button
                    type="button"
                    onClick={handleOpenStyle}
                    value={id}
                    className={`h4 ${styles.button}`}
                  >
                    {service.category.charAt(0).toUpperCase() +
                      service.category.slice(1)}{" "}
                    <div>
                      <Down />
                    </div>
                  </button>

                  {service.services.map((el, index) => {
                    if (service.category === selectedCategory) {
                      return (
                        isOpenStyle && (
                          <Link
                            href={
                              window.screen.availWidth < 760 ? "#overview" : ""
                            }
                            scroll={false}
                          >
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
                          </Link>
                        )
                      );
                    }
                  })}
                </React.Fragment>
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
            category={selectedCategory}
            step="service"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingService;
