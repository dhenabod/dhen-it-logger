import React, { useEffect } from "react";
// connects redux to this component
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";

import { getLogs } from "../../actions/logActions";

// destructure log and get logs and loading(log is the prop named in the mapStateToProps)
const Logs = ({ log: { logs, loading }, getLogs }) => {
    useEffect(() => {
        // getLogs is also a prop(we can destructure it above or write props.getLogs)
        getLogs();
        // eslint-disable-next-line
    }, []);

    if (loading || logs === null) {
        return <Preloader></Preloader>;
    }
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (
                <p className="center">No logs to show...</p>
            ) : (
                logs.map((log) => <LogItem log={log} key={log.id}></LogItem>)
            )}
        </ul>
    );
};

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
};

// get anything from app level state and bring it to the component as a prop
const mapStateToProps = (state) => ({
    // log(the prop it can be named anything) : state.log(pertains to the log in the root reducer)
    log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
