import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => {

    return (
        <div className="text-center my-3 mb-5">
            <img src={spinner} alt="loading spinner" />
        </div>
    )

}

export default Spinner