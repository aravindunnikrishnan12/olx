//src/components/He
import React, { useContext, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../Confirmation/ConfirmationPopup";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleSellClick = () => {
    navigate("/create");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const confirmLogout = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    handleLogout();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />

          <input type="text" />

          <Arrow />
        </div>
        <div className="productSearch">
          
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
              className="styledInput"
            />
      
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span onClick={() => !user && navigate("/login")}>
            {user ? `Welcome ${user.displayName}` : "Login"}
          </span>
        </div>

        {user && (
          <span className="logoutButton" onClick={confirmLogout}>
            Logout
          </span>
        )}

        <div className="sellMenu" onClick={handleSellClick}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>

        <div></div>
      </div>
      {showPopup && (
        <ConfirmationPopup
          message="Are you sure you want to logout?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Header;
