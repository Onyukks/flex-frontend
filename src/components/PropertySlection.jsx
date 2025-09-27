const PropertySelection = ({ propertyName, onSelectProperty }) => {
  const properties = [
    "2B N1 A - 29 Shoreditch Heights",
    "3B N1 B - 15 High Street",
    "1A N2 C - 17 Elm Road"
  ];

  return (
    <div className="p-4">
      <select 
        value={propertyName} 
        onChange={(e) => onSelectProperty(e.target.value)} 
        className="select-input"
      >
        <option value="">Select a Property</option>
        {properties.map(property => (
          <option key={property} value={property}>{property}</option>
        ))}
      </select>
    </div>
  );
};

export default PropertySelection;
