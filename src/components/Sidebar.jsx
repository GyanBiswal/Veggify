import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // Function to apply active class based on current path
    const getLinkClass = (path) =>
        `py-4 cursor-pointer ${currentPath === path ? 'border-l-4 border-white pl-4' : ''}`;

    return (
        <div className="h-screen bg-[#2E8B57]">
            <div className="font-semibold text-5xl p-5 text-white">Veggify</div>
            <div className="text-sm font-medium text-white px-5 py-1">
                Your Personal Health Companion
            </div>

            <div className="pt-[30vh] grid-col-1 pl-8 text-white text-xl font-medium">
                <div
                    onClick={() => navigate('/profile')}
                    className={getLinkClass('/profile')}
                >
                    Profile
                </div>
                <div
                    onClick={() => navigate('/recipes')}
                    className={getLinkClass('/recipes')}
                >
                    Recipes
                </div>
                <div
                    onClick={() => navigate('/bookmarks')}
                    className={getLinkClass('/bookmarks')}
                >
                    Bookmarks
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
