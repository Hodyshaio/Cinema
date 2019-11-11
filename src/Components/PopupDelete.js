import React from 'react';
import { useReducer } from 'react';
import { reducer, initialState } from '../Reducers';

export default function PopupDelete(){
    console.log("----popup delete-----");

    return(
        <div className="overlay">
            <div className="popup">
                <form className="ui form">
                    <div className="ui buttons">
                        <button className="ui button">Cancel</button>
                            <div className="or"></div>
                        <button className="ui positive button">Delete</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}