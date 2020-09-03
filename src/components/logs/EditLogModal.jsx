import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import M from "materialize-css/dist/js/materialize.min.js";

import { updateLog } from "../../actions/logActions";

const EditLogModal = ({ updateLog, current }) => {
    const [message, setMessage] = useState("");
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState("");

    useEffect(() => {
        if (current) {
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech);
        }
    }, [current]);

    const onsubmitHandler = () => {
        if (message === "" || tech === "") {
            M.toast({ html: "Please enter a message and a tech" });
        } else {
            const updatedLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date(),
            };
            updateLog(updatedLog);
            M.toast({ html: `Log Update by ${tech}` });

            // clear fields
            setMessage("");
            setAttention(false);
            setTech("");
        }
    };
    return (
        <div id="edit-log-modal" className="modal" style={modalStyle}>
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
                            <option value="John Doe">John Doe</option>
                            <option value="Sam Smith">Sam Smith</option>
                            <option value="Sarah Wilson">Sarah Wilson</option>
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

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLog: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    current: state.log.current,
});

const modalStyle = {
    width: "75%",
    height: "75%",
};
export default connect(mapStateToProps, { updateLog })(EditLogModal);
