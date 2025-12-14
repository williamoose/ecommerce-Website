import React, {useState} from 'react'
import styles from '../styles/Dropdown.module.css'

type Dropdown = {
    type: string;
    options: string[];
    value: string;
    setSelected: (option: string) => void;
    width: number | string;
}

export default function Dropdown({ type, options, value, setSelected, width }: Dropdown) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = (): void => setIsOpen(prev => !prev);

    const handleSelection = (option: string): void => {
        setIsOpen(false);
        setSelected(option);
    }

    return(
        <div className={styles.Dropdown}>
            <h2 className={styles.Header}>{type}</h2>
            <button 
            className={styles.DropdownToggle} 
            onClick={toggleDropdown}
            style={{ width: width }}
            >
                {value}
            </button>
            {isOpen && 
            <ul className={styles.DropdownBar}>
                {options.map((option, index) => (
                    <>
                        <li 
                        className={styles.DropdownOption}
                        key={option} 
                        onClick={() => handleSelection(option)}
                        >
                            {option}
                        </li>
                        {index != (options.length - 1) && <hr />}
                    </>
                ))}
            </ul>
            }
        </div>
    )
    
}