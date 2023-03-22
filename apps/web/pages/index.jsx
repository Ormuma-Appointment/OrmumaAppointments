import styles from "../ui/page_styles/Index.module.css";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import StoreCard from "../ui/components/StoreCard/StoreCard";
import Head from "next/head";

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
        <Head>
          <title>Salounge</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Buche deinen nächsten Termin über Salounge"
            key="desc"
          />
          <meta
            property="og:description"
            content="Buche deinen nächsten Termin über Salounge"
          />
          <meta property="og:image" content="Ormuma appointments" />
          <meta property="og:title" content="Ormuma appointments" />
          <meta name="date.available" content="2023-03-22" />
          {/*<meta
              name="image"
              property="og:image"
              content=""
            />*/}
          <meta name="author" content="Marianne, Muly, Oriane" />
        </Head>
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
