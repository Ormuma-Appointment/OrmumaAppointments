import styles from "../ui/page_styles/Index.module.css";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import StoreCard from "../ui/components/StoreCard/StoreCard";

export default function Web() {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState(true);

  async function getData() {
    const temp = [];
    const q = query(collection(db, "stores"), where("slug", "!=", null));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ data: doc.data(), id: doc.id });
    });

    setStores(temp);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    return (
      <div className={styles.container}>
        <h1>Unsere Partner</h1>
        <div className={styles.stores}>
          {stores.map((el, index) => {
            return <StoreCard key={index} data={el} setLoading={setLoading} />;
          })}
        </div>
      </div>
    );
  }
}
