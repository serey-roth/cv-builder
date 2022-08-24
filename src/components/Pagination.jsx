import React, { useEffect, useState} from 'react'
import { useCV } from '../contexts/cvContext';
import { useLocation } from 'react-router-dom';

const PAGES = [
    {"label": 'Personal Info', "path": "/"}, 
    {"label": 'Work Experience', "path": "/experience"},
    {"label": 'Work History', "path": "/experience/summary"},
    {"label": 'Education', "path": "/education"},
    {"label": 'Education Summary', "path": "/education/summary"},
    {"label": 'Resume', "path": "/resume"}
];

const Pagination = () => {
    const { visitedPages } = useCV();
    const [pageClasses, updatePageClasses] = useState(
        PAGES.map(e => 'text-slate-200 sm:text-md px-2'));
    const currentPage = useLocation().pathname;

    useEffect(() => {
        let newPages = [];
        let strClass = '';
        for (let i = 0; i < PAGES.length; i++) {
            strClass = 'sm:text-md text-sm px-2 transition ' +
            'ease-in-out duration-300';
            if (PAGES[i].path === currentPage) {
                newPages.push(strClass + ' text-indigo-400 font-semibold scale-110');
            } else if (visitedPages.current.includes(PAGES[i].path)) {
                newPages.push(strClass + ' text-red-400 font-semibold');
            } else {
                newPages.push(strClass + ' text-slate-200');
            }
        }
        updatePageClasses([...newPages]);
    }, [visitedPages, currentPage])

    return (
        <div className='flex sm:flex-initial
        flex-wrap justify-center px-4 pb-4 sm:p-3
        w-full gap-2'>
            {PAGES.map((page, index) => 
                <p key={page.label} 
                className={pageClasses[index]}>
                {page.label}
                </p>)
            }
        </div>
    )
}

export default Pagination