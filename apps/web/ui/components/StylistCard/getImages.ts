import { storage } from "../../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function getImages (id: string) {
  const imageLocation = ref(storage, `images/team/${id}`);
  try {
    const url = await getDownloadURL(imageLocation);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
