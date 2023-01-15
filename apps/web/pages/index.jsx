import RoundImage from "../ui/components/RoundImage/RoundImage";
import Button from "../ui/components/Button/Button";
import Logo from "../ui/components/assets/placeholderLogo.png";
import OpeningHours from "../ui/components/OpeningHours/OpeningHours";

export default function Web() {
  return (
    <div>
      <div>
        <h1>Wir lieben Natürlichkeit</h1>
        <RoundImage alt="Nice Image" image={Logo} initialWidth={200} />
        <Button icon="" size="medium" variant="primary">
          Termin buchen
        </Button>
      </div>
      <div>
        <h2>Mehr über uns</h2>
        <div>
          <OpeningHours
            hours={[
              {
                day: "Monday",
                end: "18:00",
                start: "08:00",
              },
              {
                day: "Tuesday",
                end: "18:00",
                start: "08:00",
              },
              {
                day: "Wednesday",
                end: "18:00",
                start: "08:00",
              },
              {
                day: "Thursday",
                end: "18:00",
                start: "08:00",
              },
              {
                day: "Friday",
                end: "18:00",
                start: "08:00",
              },
              {
                day: "Saturday",
                end: "15:00",
                start: "08:00",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
