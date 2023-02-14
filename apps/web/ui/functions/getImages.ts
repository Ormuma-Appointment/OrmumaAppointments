import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function getImages (requestUrl: string) {
  const imageLocation = ref(storage, requestUrl);
  try {
    const url = await getDownloadURL(imageLocation);
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
