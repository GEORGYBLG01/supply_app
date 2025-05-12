import React, { useState } from "react";
import "./Analysis.css"; // Import the corresponding CSS file

function BeautifulPage() {
  const [result, setResult] = useState(null);

  function inference() {
    fetch(window.env.API_URL + "/inferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error performing inferences");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        setResult(data);
        alert("Successful Analysis");
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }

  return (
    <div className="beautifulpage">
      {/* Navigation bar */}
      <div className="navbar">
        <ul className="nav_links">
          <li>
            <img src="" alt="logo" />
          </li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Analysis</a>
          </li>
        </ul>
      </div>
      {/* Button */}
      <div className="button">
        <button type="submit" onClick={inference}>
          {" "}
          Results
        </button>
      </div>
      {/* Body block */}
      {result && (
        <div className="body">
          {result
            .reduce((acc, item) => {
              const documentIndex = item.DocumentIndex;
              // const doc_name = item.doc_name;
              const existingItem = acc.find(
                (groupedItem) => groupedItem.documentIndex === documentIndex
              );

              if (existingItem) {
                existingItem.results.push(item);
              } else {
                acc.push({
                  documentIndex,
                  results: [item],
                });
              }

              return acc;
            }, [])
            .map((group, groupIndex) => (
              <div key={groupIndex} className="result-box">
                <h2>
                  Document {group.documentIndex + 1} {group.doc_name} Results
                </h2>
                <br />
                <div className="scrollable-container">
                  {group.results.map((item, index) => (
                    <div key={index} className="result-item">
                      {item.Element && (
                        <>
                          <p>Analysis: {item.Analysis}</p>
                          <p>
                            Element Info: Row {item.Element.row}, Column{" "}
                            {item.Element.column}, Heading{" "}
                            {item.Element.heading}
                          </p>
                          <br />
                        </>
                      )}
                      {!item.Element && <p>{item.Analysis}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default BeautifulPage;
