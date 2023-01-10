import Navigation from "../ui/components/Navigation/Navigation";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import Button from "../ui/components/Button/Button";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";

export default function Web() {
  return (
    <div>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <div>
        <InfoElement email infoDetail="naturfriseur@gmail.com" infoHl="Email" />
        <InfoElement
          infoDetail="www.naturfriseur-aachen.de"
          infoHl="Website"
          internet
        />
        <InfoElement infoDetail="+49 1577 37384273" infoHl="Telefon" phone />
        <CheckboxSelectElement
          labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
          multiselect
          type="checkbox"
        />
      </div>
      <Footer />
    </div>
  );
}
