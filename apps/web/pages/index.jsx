import RoundImage from "../ui/components/RoundImage/RoundImage";
import Button from "../ui/components/Button/Button";
import Logo from "../ui/components/assets/placeholderLogo.png";

export default function Web() {
  return (
    <div>
      <h1>Wir lieben Natürlichkeit</h1>
      <RoundImage alt="Nice Image" image={Logo} initialWidth={200} />
      <Button icon="" size="medium" variant="primary">
        Termin buchen
      </Button>
    </div>
  );
}
