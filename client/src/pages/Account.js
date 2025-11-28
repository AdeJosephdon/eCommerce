import { Link } from "react-router-dom";
import PageStructure from "../components/PageStructure";
import { useContext, useState, useRef } from "react";
import { DataContext } from "../components/DataContext";
import AlertPopup from "./../components/AlertPopup.js";

function Account() {
  // const navigateHome = useNavigate();

  const inputRefs = useRef([]);

  // const isAlertPopupOpen = {
  //   alertState: true,
  //   message: "Welcome",
  //   type: "success",
  // };

  const {
    currentUser,
    // auth,
    isAlertPopupOpen,
    closeAlertPopup,
    openAlertPopup,
    setCurrentUser,
  } = useContext(DataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const saveChangesCreateAccount = async (event) => {
    event.preventDefault();

    setLoadingState(true);

    if (currentUser && newPassword === confirmPassword) {
      const user = {
        name: name,
        email: email,
        password: newPassword,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/send-reset-otp`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const data = await response.json();

        if (data.success) {
          closeAlertPopup();
          openAlertPopup(data, "otp");
          setLoadingState(false);
          // console.log("success");
        }
      } catch (error) {
        closeAlertPopup();
        openAlertPopup(error.message, "failure");
        console.error("Error posting product:", error);
        setLoadingState(false);
      }
    } else if (!currentUser && newPassword === confirmPassword) {
      const user = {
        name: name,
        email: email,
        password: newPassword,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Account data", data);
          setCurrentUser(data.user);
          openAlertPopup("Account succesfully registered", "success");
          setLoadingState(false);

          // console.log("Account auth", auth);
          window.location.href = "/home";
        }
        // console.log("Server response:", data);
      } catch (error) {
        openAlertPopup(error.message, "failure");
        console.error("Error posting product:", error);
        setLoadingState(false);
      }
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (e.target.value.length === 6) {
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoadingState(true);

    if (newPassword !== confirmPassword) {
      return openAlertPopup("Passwords do not match", "failure");
    }

    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");

    console.log(otp);

    if (currentUser) {
      const user = {
        email: email,
        currentPassword: currentPassword,
        otp: otp,
        newPassword: newPassword,
      };

      console.log(user);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const data = await response.json();

        if (data.success) {
          closeAlertPopup();

          openAlertPopup(data.message, "success");
          setLoadingState(false);
          console.log("success");
        } else {
          openAlertPopup(data.message, "failure");
        }
      } catch (error) {
        closeAlertPopup();
        openAlertPopup(error.message, "failure");
        console.error("Error posting product:", error);
        setLoadingState(false);
      }
    } else if (!currentUser && newPassword === confirmPassword) {
      const user = {
        name: name,
        email: email,
        password: newPassword,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Account data", data);
          setCurrentUser(data.user);
          // openAlertPopup(data, "success");
          setLoadingState(false);
          // console.log("Account auth", auth);
          window.location.href = "/home";
        }
        // console.log("Server response:", data);
      } catch (error) {
        openAlertPopup(error.message, "failure");
        console.error("Error posting product:", error);
        setLoadingState(false);
      }
    }
  };

  return (
    <PageStructure>
      <main className="account-container">
        <div className="account-top">
          <div className="cart-route">
            <span>
              {" "}
              <Link to="/">Home /</Link>{" "}
            </span>
            My Account
          </div>
          <div className="name-welcome">
            {" "}
            Welcome <span>{currentUser ? currentUser.user.name : "User"}!</span>
          </div>
        </div>

        <div className="account-left-right">
          <div className="account-links">
            <div>Manage My Account</div>
            <ul>
              <li>My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
            <div>My Orders</div>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
            <div>My WishList</div>
          </div>

          <form
            // action={}
            className="account-form"
            onSubmit={saveChangesCreateAccount}
          >
            <div className="edit-profile-text">
              {" "}
              {currentUser ? "Edit Your Profile" : "Create an Account"}
            </div>

            <div className="edit-profile-form">
              <p>
                <label for="firstName">
                  First Name <span className="required-star">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="account-input"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={currentUser ? currentUser.user.name : ""}
                  required
                />
              </p>

              <p>
                <label for="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="account-input"
                  placeholder="Last Name"
                />
              </p>

              <p>
                <label for="email">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="account-input"
                  placeholder="YourEmail@gmail.com"
                  defaultValue={currentUser ? currentUser.user.email : ""}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </p>

              <p>
                <label for="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  className="account-input"
                  placeholder="Kingston, 5236, United State"
                />
              </p>
            </div>

            <div className="password-inputs">
              <label htmlFor="town">
                Password Changes <span className="required-star">*</span>
              </label>
              {currentUser ? (
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  className="account-input"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              ) : (
                newPassword !== confirmPassword && (
                  <div style={{ color: "red" }}> Passwords do not match </div>
                )
              )}

              <input
                id="newPassword"
                type="password"
                name="newPassword"
                className="account-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <input
                id="newPasswordConfirm"
                type="password"
                name="newPasswordConfirm"
                className="account-input"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="account-buttons">
              <button>Cancel</button>
              <button
                className="save-changes"
                type="submit"
                disabled={loadingState}
                style={{
                  background: loadingState ? "rgb(246, 173, 173)" : "#db4444",
                }}
              >
                {currentUser ? "Save Changes" : "Create Account"}
              </button>
            </div>
          </form>
        </div>

        <AlertPopup
          isOpen={isAlertPopupOpen.alertState}
          onClose={closeAlertPopup}
          type={isAlertPopupOpen.type}
        >
          {isAlertPopupOpen.type === "otp" ? (
            <div className="alert" onPaste={handlePaste}>
              <form onSubmit={onSubmitHandler}>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      required
                      className="alert-input"
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}

                <button aria-label="submit account form">Submit</button>
              </form>
            </div>
          ) : (
            <div>{isAlertPopupOpen.message}</div>
          )}
        </AlertPopup>
      </main>
    </PageStructure>
  );
}

export default Account;
