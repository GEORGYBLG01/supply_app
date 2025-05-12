import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UploadImage.css";

function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const {
    label,
    x1200PxLogo_Icam__20081,
    place,
    formalismesEnFonct,
    navItems3Props,
    frame11332Props,
    frame232Props,
    frame222Props,
  } = props;

  // Gestion de la sélection de fichier
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus(null);
  };

  // Téléversement du fichier
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(window.env.API_URL + "/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file");
      }

      setUploadStatus({ success: true, message: "File uploaded successfully!" });
      alert("Upload Successful!");
    } catch (error) {
      setUploadStatus({ success: false, message: error.message });
    }
  };

  return (
    <div className="container-center-horizontal">
      <div className="upload screen">
        <div className="overlap-group">
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />

          <div className="nav-items">
            <Frame11332 className={frame11332Props.className} />
            <Link to="/upload">
              <div className="frame-upload">
                <div className="upload-label">Upload</div>
              </div>
            </Link>
            <Frame232 headerMenuDefault2Props={frame232Props.headerMenuDefault2Props} />
            <div className="label">{label}</div>
          </div>

          <Link to="/home">
            <img
              className="logo"
              src={x1200PxLogo_Icam__20081}
              alt="Logo"
            />
          </Link>

          <Link to="/functional-view">
            <Frame222>{frame222Props.children}</Frame222>
          </Link>

          <Link to="/visual-management">
            <div className="place-label">{place}</div>
          </Link>

          <p className="formalismes">{formalismesEnFonct}</p>

          <div className="file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button className="button" onClick={handleUpload}>
              Upload
            </button>
          </div>

          {uploadStatus && (
            <div
              className={`upload-status ${
                uploadStatus.success ? "success" : "error"
              }`}
            >
              {uploadStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
