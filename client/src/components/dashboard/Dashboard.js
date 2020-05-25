import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  // using useEffect hook which is similar to componentDidMount
  useEffect(() => {
    console.log('calling getCurrentUserProfile from Dashboard.js');
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
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
