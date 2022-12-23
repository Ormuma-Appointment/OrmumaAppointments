import Navigation from "../ui/components/Navigation/Navigation";

export default function Web() {
  return (
    <div>
      <Navigation admin_logged_in />
      <Navigation admin_logged_out />
      <Navigation customer_logged_in />
      <Navigation customer_logged_out />
      <h1>Web</h1>
      <p>Hello World!</p>
    </div>
  );
}
