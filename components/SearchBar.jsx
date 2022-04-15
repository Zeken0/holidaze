import styles from "../styles/_searchBar.module.scss"
import React, { useState, useEffect, useRef } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {useClickOutside} from "react-click-outside-hook"
import { AnimatePresence, motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";

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

    const expandContainer = () => {
        setExpended(true)
    }

    const collapseContainer = () => {
        setExpended(false)
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        if (isClickedOutSide) {
            collapseContainer();
        }
    },[isClickedOutSide])

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
                ref={inputRef}/>
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
        <span className={styles.lineSeparator}></span>
        <div className={styles.searchContent}>
            <div className={styles.loadingWrapper}>
                <MoonLoader/>
            </div>
        </div>
    </motion.div>
  )
}

export default SearchBar
