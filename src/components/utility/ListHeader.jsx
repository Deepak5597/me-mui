import React from 'react';

function ListHeader({ listHeading, listCount }) {
    return (
        <section className="flex justify-between items-center bg-white text-black p-5 shadow-lg shadow-black-600 pb-3">
            <div className="font-bold text-lg">
                {listHeading}  &nbsp; | &nbsp; {listCount}
            </div>
            <div className="">
                <button className="py-2 px-5 bg-pink-900 text-white"> Export</button>
                <button className="py-2 px-5 bg-gray-900 text-white ml-2"> Print</button>
            </div>
        </section>
    );
}

export default ListHeader;
