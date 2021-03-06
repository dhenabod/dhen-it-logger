import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";

import TechSelectOptions from "../techs/TechSelectOptions";

import { addLog } from "../../actions/logActions";
import { getTechs } from "../../actions/techActions";

const AddLogModal = ({ addLog }) => {
    const [message, setMessage] = useState("");
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState("");

    const onsubmitHandler = () => {
        if (message === "" || tech === "") {
            M.toast({ html: "Please enter a message and a tech" });
        } else {
            const newLog = {
                message: message,
                attention,
                tech,
                date: new Date(),
            };

            addLog(newLog);

            M.toast({ html: `log added by ${tech}` });
            // clear fields
            setMessage("");
            setAttention(false);
            setTech("");
        }
    };
    return (
        <div id="add-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log : </h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></input>
                        <label htmlFor="message" className="active">
                            Log message
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select
                            name="tech"
                            value={tech}
                            className="browser-default"
                            onChange={(e) => setTech(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Technician
                            </option>
                            <TechSelectOptions></TechSelectOptions>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input
                                    type="checkbox"
                                    className="filled-in"
                                    checked={attention}
                                    value={attention}
                                    onChange={(e) => setAttention(!attention)}
                                ></input>
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a
                    href="#"
                    onClick={onsubmitHandler}
                    className="modal-close waves-effect blue waves-light btn"
                >
                    Enter
                </a>
            </div>
        </div>
    );
};

AddLogModal.propTypes = {
    addLog: PropTypes.func.isRequired,
};

const modalStyle = {
    width: "75%",
    height: "75%",
};
export default connect(null, { addLog })(AddLogModal);
