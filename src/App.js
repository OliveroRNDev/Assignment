import { useEffect } from "react";
import { useState } from "react";
import { BsFillTelephoneFill, BsMailbox2, BsPinMap } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiSolidMap, BiWorld } from "react-icons/bi";
//import GoogleMapReact from "google-map-react";
import GoogleMap from "google-maps-react-markers";
import { MdWork } from "react-icons/md";
import styles from "./App.css";

function App() {
  const Marker = (props) => {
    return (
      <p class="img__wrap">
        <BiSolidMap color="red" onClick={() => {}} />
        <div class="img__description">
          {props.address.street +
            "\n" +
            props.address.suite +
            "\n" +
            props.address.city +
            "\n" +
            props.address.zipcode}
        </div>
      </p>
    );
  };

  const [defaultProps, setProps] = useState(null);

  const [dom, setDom] = useState(null);
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    if (defaultProps !== null) {
      setMaps(
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_KEY}
          defaultCenter={defaultProps.center}
          defaultZoom={11}
        >
          <Marker
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            address={defaultProps.address}
          />
        </GoogleMap>
      );
    } else {
      setMaps(null);
    }
  }, [defaultProps]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        var count = Object.keys(json).length;
        var i = 0;
        const children = json.map((val) => {
          i = i + 1;
          return (
            <div
              style={{
                flexDirection: "row",
                padding: 10,
                margin: 10,
                display: "flex",
                width: "100%",
                borderBottom: i !== count ? "3px solid rgb(0, 0, 0)" : null,
                justifyContent: "space-around",
              }}
            >
              <RiAccountCircleFill
                style={{
                  height: 200,
                  width: 200,
                  color: "purple",
                  float: "left",
                  position: "relative",
                }}
              />
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  width: "30%",
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  {val.name} ({val.username})
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                  }}
                >
                  <p>
                    <MdWork style={{ paddingRight: "10px" }} />
                  </p>
                  <div>
                    <p>{val.company.name}</p>
                    <p>{val.company.catchPhrase}</p>
                    <p>{val.company.bs}</p>
                  </div>
                </div>
              </div>
              <div
                id={String(val.id)}
                style={{
                  height: 200,
                  width: 200,
                  margin: 10,
                  opacity: 0,
                }}
              >
                {defaultProps !== null &&
                defaultProps.mapsOpen === String(val.id)
                  ? maps
                  : null}
              </div>
              <div
                style={{
                  float: "right",
                  position: "relative",
                  flexDirection: "row",
                  display: "flex",
                  padding: "10px",
                }}
              >
                <p class="img__wrap">
                  <BsFillTelephoneFill
                    class="links"
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      window.open(
                        "tel:" + val.phone.replace(/-/g, "").replace(" ", ""),
                        "_self"
                      );
                    }}
                  />
                  <p class="img__description">
                    {val.phone.replace(/-/g, "").replace(" ", "")}
                  </p>
                </p>
                <p class="img__wrap">
                  <BsMailbox2
                    class="links"
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      window.open(
                        "mailto:" +
                          val.email +
                          "?subject=SendMail&body=Description",
                        "_self"
                      );
                    }}
                  />
                  <p class="img__description">{val.email}</p>
                </p>
                <p class="img__wrap">
                  <BiWorld
                    class="links"
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      window.open("https://" + val.website, "_blank");
                    }}
                  />
                  <p class="img__description">{val.website}</p>
                </p>
                <p class="img__wrap" style={{ paddingRight: "10px" }}>
                  <p class="img__description">Location</p>
                  <BsPinMap
                    class="links"
                    onClick={() => {
                      if (
                        defaultProps === null ||
                        (defaultProps !== null &&
                          defaultProps.mapsOpen &&
                          defaultProps.mapsOpen === String(val.id))
                      ) {
                        var hasClosed = false;
                        if (defaultProps !== null && defaultProps.mapsOpen) {
                          document.getElementById(
                            defaultProps.mapsOpen
                          ).style.opacity = 0;
                        }

                        if (
                          defaultProps === null ||
                          (defaultProps !== null &&
                            String(val.id) !== defaultProps.mapsOpen &&
                            defaultProps !== null &&
                            defaultProps.hasClosed)
                        ) {
                          hasClosed = false;
                          document.getElementById(
                            String(val.id)
                          ).style.opacity = 1;
                        } else hasClosed = true;
                        if (!hasClosed)
                          setProps({
                            center: {
                              lat: parseFloat(val.address.geo.lat),
                              lng: parseFloat(val.address.geo.lng),
                            },
                            zoom: 11,
                            mapsOpen: hasClosed ? null : String(val.id),
                            hasClosed: hasClosed,
                            address: val.address,
                          });
                        else {
                          setProps(null);
                        }
                      } else if (
                        defaultProps !== null &&
                        defaultProps.mapsOpen &&
                        defaultProps.mapsOpen !== String(val.id)
                      ) {
                        if (defaultProps !== null && defaultProps.mapsOpen) {
                          document.getElementById(
                            defaultProps.mapsOpen
                          ).style.opacity = 0;
                        }
                        document.getElementById(
                          String(val.id)
                        ).style.opacity = 1;
                        setProps({
                          center: {
                            lat: parseFloat(val.address.geo.lat),
                            lng: parseFloat(val.address.geo.lng),
                          },
                          zoom: 11,
                          mapsOpen: String(val.id),
                          hasClosed: false,
                          address: val.address,
                        });
                      }
                    }}
                  />
                </p>
              </div>
            </div>
          );
        });
        setDom(children);
      });
  }, [maps, defaultProps]);

  return (
    <div id="users" style={{ width: "95%" }}>
      {dom}
    </div>
  );
}

export default App;
