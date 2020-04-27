import React from "react";
import "./main.css";
import "./breakpoints.css";
import axios from "axios";

class Main extends React.Component {
  state = {
    cities: [],
    isCheckedHdEnabled: false,
    isCheckedOneWayEnabled: false,
    allCities: [],
    userSearchData: "",
  };
  componentDidMount() {
    axios
      .get("https://api.zoomcar.com/v4/cities?platform=web")
      .then((response) => {
        var allCities = response.data.cities;
        this.setState({ cities: allCities });
        this.setState({ allCities });
      });
  }
  //    ------------ Search City-----------
  searchCity = (event) => {
    this.setState({ userSearchData: event.target.value });

    setTimeout(() => {
      var searchData = this.state.allCities.filter((res) => {
        return res.name.includes(this.state.userSearchData) == true;
      });
      this.setState({ cities: searchData });
    }, 2000);
  };

  //---------handle check box events----------
  handleChecked = (data, string) => {
    if (data.length && string == "oneWayEnabledCheckbox") {
      setTimeout(() => {
        this.setState(
          {
            isCheckedOneWayEnabled: document.getElementById("oneWayEnabled")
              .checked,
          },
          function () {}
        );
      }, 10);

      if (document.getElementById("oneWayEnabled").checked == true) {
        var oneWayEnabledArray = this.state.cities.filter((city) => {
          return city.one_way_enabled == true;
        });
        setTimeout(() => {
          this.setState({ cities: oneWayEnabledArray }, function () {});
        }, 50);
      } else {
        setTimeout(() => {
          this.setState({ cities: this.state.allCities }, function () {});
        }, 50);
      }
    } else if (data.length && string == "hdEnabledCheckbox") {
      setTimeout(() => {
        this.setState(
          { isCheckedHdEnabled: document.getElementById("hdEnabled").checked },
          function () {
            console.log("hdEnabledCheckbox", this.state.isCheckedHdEnabled);
          }
        );
      }, 10);

      if (document.getElementById("hdEnabled").checked == true) {
        var hdEnabledArray = this.state.cities.filter((city) => {
          return city.hd_enabled == true;
        });

        setTimeout(() => {
          this.setState({ cities: hdEnabledArray }, function () {});
        }, 50);
      } else {
        setTimeout(() => {
          this.setState({ cities: this.state.allCities }, function () {});
        }, 50);
      }
    } else if (data === null && string == "hdEnabledCheckbox") {
      setTimeout(() => {
        this.setState(
          { isCheckedHdEnabled: document.getElementById("hdEnabled").checked },
          function () {
            console.log("hdEnabledCheckbox", this.state.isCheckedHdEnabled);
          }
        );
      }, 10);
    } else {
      setTimeout(() => {
        this.setState(
          {
            isCheckedOneWayEnabled: document.getElementById("oneWayEnabled")
              .checked,
          },
          function () {
            console.log("onewayenabled", this.state.isCheckedOneWayEnabled);
          }
        );
      }, 10);
    }

    setTimeout(() => {
      if (
        this.state.isCheckedHdEnabled == true &&
        this.state.isCheckedOneWayEnabled == true
      ) {
        var hdEnabledAndOneWayArray = this.state.cities.filter((city) => {
          return city.hd_enabled == true && city.one_way_enabled == true;
        });

        setTimeout(() => {
          this.setState({ cities: hdEnabledAndOneWayArray }, function () {
            console.log("hdEnabledAndOneWayArray.... list", this.state.cities);
          });
        }, 50);
      }
    }, 100);
  };

  render() {
    let { userSearchData } = this.state;

    return (
      <div>
        <h1>Cities</h1>
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <input
              type="text"
              id="searchBox"
              name="search"
              placeholder="Search City"
              className="search-input"
              value={userSearchData}
              onChange={this.searchCity}
            />
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 float-right">
            <div>
              <label for="vehicle1">HD ENABLED</label>
              <input
                type="checkbox"
                id="hdEnabled"
                name="hdEnabled"
                value="hdEnabled"
                onChange={(evt) =>
                  this.handleChecked("hdEnabled", "hdEnabledCheckbox", evt)
                }
              />
            </div>
            <div>
              <label for="oneWayEnabled">ONE WAY ENABLED</label>
              <input
                type="checkbox"
                id="oneWayEnabled"
                name="oneWayEnabled"
                value="oneWayEnabled"
                onChange={(evt) =>
                  this.handleChecked(
                    "oneWayEnabled",
                    "oneWayEnabledCheckbox",
                    evt
                  )
                }
              />
            </div>
          </div>
        </div>
        <section className="data-section row">
          <h3>Popular</h3>
          {this.state.cities.map((city) => {
            if (city.popular === true) {
              return (
                <div className="col-md-3 col-sm-6 col-xs-6">
                  <div className="city-data">
                    <img src={city.icon} className="img-icon"></img>
                    {city.name}
                  </div>
                </div>
              );
            }
          })}
        </section>
        <section className="data-section row">
          <h3>Other</h3>
          {this.state.cities.map((city) => {
            if (city.popular === false) {
              return (
                <div className="col-md-3 col-sm-6 col-xs-6">
                  <div className="city-data">
                    <img src={city.icon} className="img-icon"></img>
                    {city.name}
                  </div>
                </div>
              );
            }
          })}
        </section>
      </div>
    );
  }
}
export default Main;
