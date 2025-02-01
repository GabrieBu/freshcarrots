import {useState} from 'react'

// eslint-disable-next-line react/prop-types
function DropdownFilter({filterObj, onSelectedFilters, onSetSelectedFilters, onSetPageNumber}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSelectedFilters, setCurrentSelectedFilters] = useState([]);

    function handleFilterChange(event) {
        const { value, checked } = event.target;
        onSetSelectedFilters((prev) =>
            checked ? [...prev, value] : prev.filter((filter) => filter !== value)
        );
        setCurrentSelectedFilters(prev => checked ? [...prev, value] : prev.filter((filter) => filter !== value))
        onSetPageNumber(1);
    }
    return(
    <div className="col-md-2">
        {/* eslint-disable-next-line react/prop-types */}
        <label htmlFor="orderBy" className="form-label">By {filterObj?.typeFilter}:</label>
        <div className="dropdown">
            <button
                id="orderBy"
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentSelectedFilters?.length > 0 ? currentSelectedFilters.join(", ") : "Select"}
            </button>
            <div className={`dropdown-menu p-3 ${isOpen ? "show" : ""}`}
                 style={{minWidth: "150px"}}>
                {/* eslint-disable-next-line react/prop-types */}
                {filterObj?.options?.map((option, index) => (
                    <div className="form-check" key={index}>
                        <input
                            type="checkbox"
                            id={option?.name}
                            className="form-check-input"
                            value={option?.name}
                            checked={onSelectedFilters.includes(option?.name)}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor={option?.name} className="form-check-label">
                            {option?.label}
                        </label>
                    </div>
                    ))}

                </div>
        </div>
    </div>)
}

export default DropdownFilter;