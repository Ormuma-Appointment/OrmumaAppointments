import Navigation from "../ui/components/Navigation/Navigation";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import AddressCard from "../ui/components/AddressCard/AddressCard";

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
        <AddressCard
          name="Naturfriseur Aachen"
          street="Habsburgerallee"
          number={11}
          postalCode="52064"
          city="Aachen"
          country="Deutschland"
        />
      </div>
      <Footer />
    </div>
  );
}
