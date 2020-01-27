import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import Spinner from "../layout/Spinner";
import {Redirect
 } from "react-router-dom"

const Settings = props => {
  const {isAuthenticated, loadUser, user, authLoading } = props;
  useEffect(() => {
    loadUser();
  }, [] );
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading) {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "3rem auto 0 auto" }}>
          Loading...
        </h2>
        <Spinner />
      </>
    );
  } else {
    return (
      <div>
        Welcome!
        {!authLoading && user !== null && user.name}
        user's Settings
        <button>logout</button>
      </div>
    );
  } 
};

const mapDispatchToProps = {
  loadUser
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);