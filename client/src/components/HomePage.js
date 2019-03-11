import React, { Component } from "react";
import HeroBanner from "./HeroBanner";
import UserGallery from "./UserGallery";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HeroBanner />
        <UserGallery />
      </div>
    );
  }
}

export default HomePage;
