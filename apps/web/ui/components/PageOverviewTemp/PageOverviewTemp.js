import React from "react";
import Link from "next/link";

function PageOverviewTemp() {
  const divStyle = {
    color: "var(--primary-color)",
    marginRight: "1rem",
  };

  return (
    <div
      style={{
        height: "4rem",
        maxWidth: "95vw",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Link style={divStyle} href="/">
        Home
      </Link>
      <Link style={divStyle} href="/login">
        Login
      </Link>
      <Link style={divStyle} href="/register">
        Registration
      </Link>
      <Link style={divStyle} href="/register-admin">
        Admin Registration
      </Link>
      <Link style={divStyle} href="/account">
        Account
      </Link>
      <Link style={divStyle} href="/account-admin">
        Admin Account
      </Link>
      <Link style={divStyle} href="/setup/store-setup">
        StoreSetup
      </Link>
      <Link style={divStyle} href="/setup/service-setup">
        Service Setup
      </Link>
      <Link style={divStyle} href="/setup/team-setup">
        Team Setup
      </Link>
      <Link style={divStyle} href="/booking-calendar">
        Booking Calendar
      </Link>
      <Link style={divStyle} href="/booking-confirmation">
        Booking Confirmation
      </Link>
      <Link style={divStyle} href="/booking-employee">
        Booking Employee
      </Link>
      <Link style={divStyle} href="/booking-service">
        Booking Service
      </Link>
    </div>
  );
}

export default PageOverviewTemp;
