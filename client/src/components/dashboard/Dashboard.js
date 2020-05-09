import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentUserProfile }) => {
  // using useEffect hook which is similar to componentDidMount
  useEffect(() => {
    console.log('calling getCurrentUserProfile from Dashboard.js');
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);
  return <div>Dashboard</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserProfile: () => dispatch(getCurrentUserProfile()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
