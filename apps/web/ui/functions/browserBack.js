import { useRouter } from "next/router";

const router = useRouter();

export function browserBack(e, path) {
  e.preventDefault();
  router.push(path);
}
