import React from 'react';
import Moment from 'react-moment';
// Redux
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../reducers/profileThunk';

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const onClick = async (id) => {
    await dispatch(deleteEducation(id));
  };

  console.log('Education is:', education);

  const educations =
    education &&
    education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
          {edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </td>
        <td>
          <button onClick={() => onClick(edu._id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>

        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
