import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, InputGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const Autocomplete = ({ 
    options, 
    value, 
    onChange, 
    placeholder, 
    label, 
    icon = "bi-geo-alt", 
    onSelect 
}) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        onChange && onChange(val);

        if (val.length > 1) {
            const filtered = options
                .filter(opt => opt.toLowerCase().includes(val.toLowerCase()))
                .slice(0, 6);
            setSuggestions(filtered);
            setIsOpen(true);
            setActiveIndex(-1);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                selectOption(suggestions[activeIndex]);
            } else if (inputValue) {
                selectOption(inputValue);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const selectOption = (opt) => {
        setInputValue(opt);
        setIsOpen(false);
        onSelect && onSelect(opt);
        onChange && onChange(opt);
    };

    return (
        <div ref={wrapperRef} className="position-relative w-100 mb-2">
            {label && <Form.Label className="form-label">{label}</Form.Label>}
            <InputGroup className="bg-dark border border-z rounded-3 overflow-hidden shadow-sm">
                <InputGroup.Text className="bg-dark border-0 text-accent">
                    <i className={`bi ${icon}`}></i>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="bg-dark text-white border-0 py-3 shadow-none"
                    onFocus={() => inputValue.length > 1 && suggestions.length > 0 && setIsOpen(true)}
                />
            </InputGroup>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="position-absolute w-100 mt-1 z-index-1000 shadow-glow rounded-3 overflow-hidden border border-z"
                        style={{ zIndex: 1050, background: 'rgba(19, 19, 22, 0.95)', backdropFilter: 'blur(10px)' }}
                    >
                        <ListGroup variant="flush">
                            {suggestions.length > 0 ? (
                                suggestions.map((opt, idx) => (
                                    <ListGroup.Item
                                        key={opt}
                                        action
                                        onClick={() => selectOption(opt)}
                                        className={`bg-transparent border-0 py-3 px-4 text-white hover-accent transition-smooth ${activeIndex === idx ? 'bg-graphite text-accent' : ''}`}
                                        style={{ borderBottom: idx < suggestions.length - 1 ? '1px solid var(--z-border)' : 'none' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-geo-alt-fill me-3 text-accent small"></i>
                                            <span className="fw-500">{opt}</span>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item className="bg-transparent border-0 py-3 px-4 text-muted small text-center italic">
                                    No matching locations found
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Autocomplete;
