import * as React from "react";
import { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { spacer64, spacer32 } from "../../styles/tokens";
import { Role, loginUser, UserI } from "../../services/api";
import Banner, { BannerType } from "../Banner";

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer64};
  & div {
    width: 300px;
  }
`;

const Spacer = styled.div`
  height: ${spacer32};
  width: 100%;
`;

const Login: FC<{}> = () => {
  const history = useHistory();
  const [user, setUser] = useState<UserI>({
    username: "",
    password: "",
    role: Role.User,
  });

  const [error, setError] = useState("");

  const onLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user.username || !user.password) {
        setError("Please fill up all fields");
      }
      try {
        await loginUser(user);
        history.push("/");
      } catch (e) {
        setError(e.message);
      }
    },
    [user]
  );

  const handleChange = useCallback(
    async (e) => {
      setError("");
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });
    },
    [user]
  );

  return (
    <div className="container">
      {error && <Banner message={error} type={BannerType.ERROR} />}
      <Flexbox>
        <h4>Welcome back</h4>
        <Spacer />
        <form onSubmit={onLogin}>
          <div>
            <label htmlFor="emailInput">Email</label>
            <input
              className="u-full-width"
              type="email"
              placeholder="test@mailbox.com"
              id="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="passwordInput">Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="xxxxx"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="role">Are you a</label>
            <select
              className="u-full-width"
              id="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value={Role.User}>User</option>
              <option value={Role.Owner}>Restaurant owner</option>
            </select>
          </div>

          <Spacer />
          <input type="submit" value="Log me in!" className="button-primary" />
        </form>
        <div>
          Do not have an account? <Link to="signup">Create an account</Link>
        </div>
      </Flexbox>
    </div>
  );
};

export default Login;
