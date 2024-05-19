import React, { useState } from 'react';

const BooleanInput = ({ label, value, onChange }) => {
    const handleChange = (e) => {
        const newValue = e.target.checked;
        onChange(newValue);
    };

    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label">{label}</label>
        </div>
    );
};

export default BooleanInput;