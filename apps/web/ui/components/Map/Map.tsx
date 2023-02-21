import React from "react";

interface MapProps {
  name: string;
  street: string;
  number: number;
  postalCode: string;
  city: string;
  country: string;
  telephone: string;
}

const Map: React.FC<MapProps> = (props) => {
  const {
    name = "Naturfriseur Aachen",
    street = "Habsburgerallee",
    number = 11,
    postalCode = "52064",
    city = "Aachen",
    country = "Deutschland",
    telephone = "0241 / 70 98 99",
    ...rest
  } = props;
  return (
    <div>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m22!1m12!!!!!!!!!!!!1!3m3!1m2!!2s${name}%20${street}${number}%20${postalCode}%20${city}%20${country}!!3m2!!!`}
        style={{ border: 0 }}
        height="100%"
        width="100%"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
