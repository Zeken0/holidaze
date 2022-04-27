import styles from "../styles/Home.module.scss"
import React, { useState, useEffect, useRef } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {useClickOutside} from "react-click-outside-hook"
import { AnimatePresence, motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "../hooks/debounceHook";
import axios from "axios";

const containerVariants = {
    expanded: {
        height: "20em",
    },
    collapsed: {
        height: "3.8em"
    }
}

const containerTransition = {
    type: "spring",
    damping: 22,
    stiffness: 150
}

function SearchBar(props) {
    const [isExpended, setExpended] = useState(false)
    const [parentRef, isClickedOutSide] = useClickOutside();
    const inputRef = useRef();
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const changeHandler = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    const expandContainer = () => {
        setExpended(true)
    }

    const collapseContainer = () => {
        setExpended(false)
        setSearchQuery("");
        setIsLoading(false);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        if (isClickedOutSide) {
            collapseContainer();
        }
    },[isClickedOutSide])

    const prepareSearchQuery = (query) => {
        const url = `https://makers-studio.herokuapp.com/Products/${query}`;

        return encodeURI(url);
    }

    const searchHotels = async () => {
        if (!searchQuery || searchQuery.trim() === "") 
            return;
        setIsLoading(true);

        const URL = prepareSearchQuery(searchQuery);

        const response = await axios.get(URL).catch((err) => {
            console.log("error:", err); 
        })

        if (response) {
            console.log("Response: ", response.data);

            setIsLoading(false)
        }
    }

    useDebounce(searchQuery, 500, searchHotels);

    return (
        <motion.div className={styles.searchBarContainer} 
            animate={isExpended ? "expanded" : "collapsed"} 
            variants={containerVariants} 
            transition={containerTransition} 
            ref={parentRef}>
            <div className={styles.searchInputContainer}>
                <span className={styles.searchIcon}>
                    <IoSearch/>
                </span>
                <input className={styles.searchInput} 
                    placeholder="Search for hotels" 
                    onFocus={expandContainer} 
                    ref={inputRef} 
                    value={searchQuery} 
                    onChange={changeHandler}/>
                <AnimatePresence>
                    {isExpended && (
                    <motion.span className={styles.closeIcon} 
                        key="close-icon"
                        initial={{Opacity: 0}} 
                        animate={{Opacity: 1}} 
                        exit={{Opacity: 0}} 
                        transition={{duration: 0.2}} 
                        onClick={collapseContainer}>
                        <IoClose />
                    </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {isExpended && <span className={styles.lineSeparator}></span>}
            {isLoading && (
            <div className={styles.searchContent}>
                <div className={styles.loadingWrapper}>
                    <MoonLoader loading size={20}/>
                </div>
            </div>
            )}
        </motion.div>
    )
}

export default SearchBar
