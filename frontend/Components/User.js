import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";

export default function User() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user || Object.keys(user).length === 0) {
    // Add check for initial value
    return (
      <div onClick={() => route.push(`/api/auth/login`)}>
        <FaUserCircle className="profile" />
        <h3>Login</h3>
      </div>
    );
  }
  return (
    <Profile onClick={() => route.push(`/profile`)}>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
    </Profile>
  );
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
