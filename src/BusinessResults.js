import { starredVar } from "./index";
import { useAuth0 } from '@auth0/auth0-react';

function BusinessResults(props) {
  const { businesses } = props;
  const { isAuthenticated } = useAuth0();
  const starredItems = starredVar();

  const toggleIsStarred = (b) => {
    if (b.isStarred) {
      starredVar(starredItems.filter((items) => items !== b.businessId));
    } else {
      starredVar([...starredItems, b.businessId]);
    }
  };

  return (
    <div>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Category</th>
            {isAuthenticated ? <th>Average Stars</th> : null}
          </tr>
        </thead>
        <tbody>
          {businesses.map((b, i) => (
            <tr key={i}>
              <td>
                <button
                   onClick={() => toggleIsStarred(b)}
                >
                  Star
                </button>
              </td>
              <td style={b.isStarred ? { fontWeight: "bold" } : null}>
                {b.name}
              </td>
              <td>{b.address}</td>
              <td>
                {b.categories.reduce(
                  (acc, c, i) => acc + (i === 0 ? " " : ", ") + c.name,
                  ""
                )}
              </td>
              {isAuthenticated ? <td>{b.averageStars}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusinessResults;
