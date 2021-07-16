import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "../../utils";
import Levels from "../Levels";
import Oficina from "../Oficina";
import TronLinkGuide from "../TronLinkGuide";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
    };
  }

  async componentDidMount() {
    await new Promise((resolve) => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready,
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState,
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false,
            },
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState,
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object if TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS,
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true,
          },
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {
    if (!this.state.tronWeb.installed)
      return (
        <>
          <div className="container">
            <TronLinkGuide />
          </div>
        </>
      );

    if (!this.state.tronWeb.loggedIn)
      return (
        <>
          <div className="container">
            <TronLinkGuide installed />
          </div>
        </>
      );

    return (
      <>

        <div className="row">
          
          <Oficina />

          <div className="col-lg-9">

            <div className="row">
              
              <div className="col">
              
                <div className="border-gradient">
                  <div className="border-gradient_content">
                    <div id="x3main" className="logotypeX3">
                      <img src="files/x3.svg" alt="" />
                    </div>
                    <div className="ternary-wrapper">
                      <Levels />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2 mb-5">
              <div className="col">
                <div className="icon-tips">
                  <div className="matrix_currency">
                    <strong
                      style={{
                        color: "var(--color-lightblue)",
                        "font-weight": "bold",
                      }}
                    >
                      TRX
                    </strong>
                    <span>THE COST OF SLOTS IN TRX (TRON)</span>
                  </div>
                  <div className="matrix_reinvest">
                    <i className="matrix-icon_sync"></i>
                    <span>NUMBER OF REINVESTS</span>
                  </div>
                  <div className="matrix_partners__count">
                    <i className="matrix-icon_users"></i>
                    <span>PARTNERS ON THE SLOT</span>
                  </div>
                </div>
              </div>
            </div>
            <script type="text/javascript">
              var towar = "1"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "2"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "3"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "4"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "5"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "6"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "7"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "8"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "9"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "10"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "11"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline"; var
              towar = "12"; console.log(towar); document.getElementById(
              "x3_partner_high_warning_" + towar ).style.display = "inline";
            </script>
            <script type="text/javascript">
              var towar_x6 = "1"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "2";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
              var towar_x6 = "3"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "4";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
              var towar_x6 = "5"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "6";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
              var towar_x6 = "7"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "8";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
              var towar_x6 = "9"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "10";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
              var towar_x6 = "11"; console.log(towar_x6);
              document.getElementById( "x6_partner_high_warning_" + towar_x6
              ).style.display = "inline"; var towar_x6 = "12";
              console.log(towar_x6); document.getElementById(
              "x6_partner_high_warning_" + towar_x6 ).style.display = "inline";
            </script>
          </div>
        </div>
      </>
    );
  }
}
export default App;

// {tWeb()}
