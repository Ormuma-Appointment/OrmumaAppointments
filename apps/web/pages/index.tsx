import Navigation from "../ui/components/Navigation/Navigation";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import Button from "../ui/components/Button/Button";
import SelectElement from "../ui/components/SelectElement/SelectElement";

export default function Web() {
  return (
    <div>
      <Navigation admin_logged_in />
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
        <SelectElement
          labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
          multiselect
        />
      </div>
    </div>
  );
}
