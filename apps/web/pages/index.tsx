import Navigation from "../ui/components/Navigation/Navigation";
import Button from "../ui/components/Button/Button";

export default function Web() {
  return (
    <div>
      <Navigation admin_logged_in />
      <Button icon size="medium" variant="primary">
        Termin buchen
      </Button>
      <h1>Web</h1>
      <p>Hello World!</p>
    </div>
  );
}
