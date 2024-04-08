const PDFContent = ({ userInfo }: any) => {
  return (
    <div className="pdf-content">
      <h1>User Information</h1>
      <div className="user-info">
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {userInfo.phone}
        </p>
      </div>

      <h2>Career Objective</h2>
      <p>{userInfo.carrierObjective}</p>

      <h2>Education</h2>
      <table>
        <thead>
          <tr>
            <th>Qualification</th>
            <th>Institution</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.education.map((edu: any, index: any) => (
            <tr key={index}>
              <td>{edu.qualification}</td>
              <td>{edu.institution}</td>
              <td>{edu.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Skills</h2>
      <table>
        <thead>
          <tr>
            <th>Technology</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.skills.map((skill: any, index: any) => (
            <tr key={index}>
              <td>{skill.technology}</td>
              <td>{skill.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {userInfo.userType === "employee" && (
        <div>
          <h2>Experience</h2>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.experience.map((exp: any, index: any) => (
                <tr key={index}>
                  <td>{exp.company}</td>
                  <td>{exp.role}</td>
                  <td>{exp.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PDFContent;
