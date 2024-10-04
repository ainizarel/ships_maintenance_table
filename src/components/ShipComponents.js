import React from "react";

const ShipComponent = ({ ships }) => {
  // Recursive function to render subcomponents and maintenance details
  const renderSubcomponents = (subcomponents) => {
    return subcomponents.map((subcomponent, index) => (
      <div key={index} style={{ marginLeft: "20px" }}>
        <h4>{subcomponent.subcomponent_name}</h4>
        {subcomponent.maintenance && subcomponent.maintenance.length > 0 && (
          <ul>
            {subcomponent.maintenance.map((maint, idx) => (
              <li key={idx}>
                <strong>Status:</strong> {maint.status}, <strong>Description:</strong> {maint.description}
                <ul>
                  {maint.details.map((detail, i) => (
                    <li key={i}>
                      <strong>Date:</strong> {detail.date}, <strong>Note:</strong> {detail.note}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {/* Recursive call if there are further nested subcomponents */}
        {subcomponent.subcomponents && renderSubcomponents(subcomponent.subcomponents)}
      </div>
    ));
  };

  const renderShips = (ships) => {
    return ships.map((ship, index) => (
      <div key={index}>
        <h2>{ship.ship_name} ({ship.type})</h2>
        <p>Status: {ship.status}</p>
        {ship.classifications.map((classification, idx) => (
          <div key={idx} style={{ marginLeft: "20px" }}>
            <h3>{classification.classification_name}</h3>
            {classification.subcomponents && renderSubcomponents(classification.subcomponents)}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h1>Ships List</h1>
      {renderShips(ships)}
    </div>
  );
};

export default ShipComponent;
