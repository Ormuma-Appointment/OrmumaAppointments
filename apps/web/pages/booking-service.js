import { useEffect, useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import { admin } from "./data-sample";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const BookingService = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState({});
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  async function getData() {
    const docRef = doc(db, "stores", "one", "services", "serviceList");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setServiceList(docSnap.data());
      SetIsLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getData();
  }, []);

  //console.log("service list", serviceList.serviceObj);
  //console.log("selectedService", selected);

  //is opening everything and not only one service - to correct later
  const handleOpenStyle = (e) => {
    setIsOpenStyle(!isOpenStyle);
    let id = e.target.value;
    setSelectedCategoryId(id);
    let category = serviceList.serviceObj[id].category;
    setSelectedCategory(category);
  };

  console.log(selectedCategoryId);
  console.log(serviceList.serviceObj[selectedCategoryId]);

  return (
    <div className={styles.pageContainer}>
      <h1>Unsere Service</h1>
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
                    {service.category} <i className="fa-solid fa-play"></i>
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
