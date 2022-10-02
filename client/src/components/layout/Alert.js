import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert, selectAlerts } from '../../reducers/alertSlice';

function Alert() {
  const dispatch = useDispatch();
  const alerts = useSelector(selectAlerts);

  useEffect(() => {
    alerts.forEach((alert) => {
      setTimeout(() => dispatch(removeAlert(alert.id)), 3000);
    });
  });

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
}

Alert.propTypes = {};

export default Alert;
