import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import BusinessResults from "./BusinessResults";
import Profile from './Profile';

function App() {
  const [ selectedCategory, setSelectedCategory ] = useState("All");
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const GET_BUSINESSES_QUERY = gql`
    query BusinessesByCategory($selectedCategory: String!) {
      businesses(where: { categories_SOME: { name_CONTAINS: $selectedCategory } }) {
        businessId
        name
        address
        categories {
          name
        }
        ${isAuthenticated ? 'averageStars' : ''}
        isStarred @client
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_BUSINESSES_QUERY, {
    variables: { selectedCategory },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log Out</button>}
      <Profile />
      <h1>Business Search</h1>
      <form>
        <label>
          Select Business Category:
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="All">All</option>
            <option value="Coffee">Coffee</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>
        <input type="button" value="Refetch" onClick={() => refetch()} />
      </form>

      <BusinessResults businesses={data.businesses} />
    </div>
  );
}

export default App;
