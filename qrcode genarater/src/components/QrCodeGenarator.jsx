import React, { useState } from "react";
import vCardsJS from "vcards-js";
import "./QRCodeGenerator.css"; // Your CSS file

const QRCodeGenerator = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    jobTitle: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const generateVCard = () => {
    const vCard = vCardsJS();
    vCard.firstName = contact.firstName;
    vCard.lastName = contact.lastName;
    vCard.cellPhone = contact.phone;
    vCard.email = contact.email;
    vCard.title = contact.jobTitle;
    vCard.url = contact.website || "";
    vCard.version = "3.0";
    vCard.rev = new Date().toISOString();

    return vCard.getFormattedString();
  };

  const handleDownloadVCard = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "contact.vcf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const isContactFilled = Object.values(contact).some(
    (value) => value.trim() !== ""
  );

  return (
    <div className="qr-code-generator">
      <h2>Contact Information</h2>
      <div className="content-container">
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={contact.firstName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={contact.lastName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={contact.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={contact.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="jobTitle" className="input-label">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Enter job title"
              value={contact.jobTitle}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="website" className="input-label">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="Enter website"
              value={contact.website || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {isContactFilled && (
            <button onClick={handleDownloadVCard} className="download-button">
              Download vCard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
