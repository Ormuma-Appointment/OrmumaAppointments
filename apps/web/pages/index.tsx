import Navigation from "../ui/components/Navigation/Navigation";
import InfoElement from "../ui/components/InfoElement/InfoElement";
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
      <div>
        <InfoElement email infoDetail="naturfriseur@gmail.com" infoHl="Email" />
        <InfoElement
          infoDetail="www.naturfriseur-aachen.de"
          infoHl="Website"
          internet
        />
        <InfoElement infoDetail="+49 1577 37384273" infoHl="Telefon" phone />
      </div>
    </div>
  );
}
