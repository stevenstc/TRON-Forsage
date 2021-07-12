import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "../../utils";
import CrowdFunding from "../CrowdFunding";
import Levels from "../Levels";
import Oficina from "../Oficina";
import TronLinkInfo from "../TronLinkInfo";
import TronLinkGuide from "../TronLinkGuide";


const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
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
              loggedIn: false
            }
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
          tronWeb: tronWebState
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
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {
    if (!this.state.tronWeb.installed) return (
      <>
        <div className="container">
          <TronLinkGuide />
        </div>
      </>
      );

    if (!this.state.tronWeb.loggedIn) return (
      <>
        <div className="container">
          <TronLinkGuide installed />
        </div>
      </>
      );

    return (

      <>              
                        
        <CrowdFunding />
                      
        

        

        <div className="row">


        <div className="col-lg-3 mb-4">
          <div className="border-gradient section-left" id="userEarningBanner">
            <div
              className="border-gradient_content status-panel"
              style={{"padding-bottom": "1px"}}
            >
              <Oficina /> 
              <div className="status-panel_id">
                <a
                  href="javascript:;"
                  className="status-panel__user-id"
                  data-trigger_value_siblings=".trigger_value__user-id"
                  data-trigger_value="***|1"
                >
                  ID <span title="Show/Hide">1</span>
                </a>
                <div className="status-panel_partners__top">
                  <span >778</span>
                  <img src="files/partners_light.png" alt="" />
                </div>
              </div>
              <div className="status-panel__logo">
                <img src="files/tronicon2.jpg" />
              </div>
              <div className="status-panel_money">
                <div className="status-panel_money_total__dollars">$ 532853.13</div>
                <div className="status-panel_money_total__eth" title="(0)">
                  8583330 TRX
                </div>
              </div>
              <div className="status-panel_money">
                <div className="border-gradient">
                  <div className="border-gradient_content">
                    <div className="logotypeX3">
                      <a href="https://forsagetron.io/dashboard/#x3main"
                        ><img src="files/x3.svg" alt=""
                      /></a>
                    </div>
                    <div className="status-panel_money__dollars">$ 481861.86</div>
                    <div className="status-panel_money__eth" title="(0)">
                      7761950 TRX
                    </div>
                  </div>
                </div>
              </div>
              <div className="telegram-bot_notify" style={{"display": "none"}}>
                <a
                  href="https://telete.in/forsage_io_bot?add_address=0x948e5f339942f9f6cf417c5fe6de73ef6059bd8b"
                  target="_blank"
                >
                  <img src="files/bot_notif.png" alt="" />
                </a>
              </div>
              <span id="bannerVerifyText" style={{"display": "none"}}
                >Verify It at Forsagetron.io</span
              >
            </div>
          </div>
          <div className="section-right">
            <div className="border-gradient">
              <div className="border-gradient_content status-panel_partners pb-5">
                <div className="status-panel_partners__subject">
                  <div className="status-panel_partners__count">
                    <span>778</span>
                    <img src="files/partners_light.svg" alt="" />
                  </div>
                </div>
                <div
                  className="
                    area-text
                    status-panel_partners__link
                    trigger_value__user-refkey
                  "
                  title="https://forsagetron.io/"
                >
                  <input
                    type="text"
                    value="https://my.forsagetron.io/register?1"
                    id="refLink"
                    className="copy_alliliate_link"
                    readonly=""
                  />
                </div>
                <div className="status-panel_partners_copy copy_alliliate_btn">
                  Copy
                </div>
              </div>
            </div>
            <div className="border-gradient mt-5">
              <div className="border-gradient_content status-panel_wallets pb-4">
                <div className="status-panel_wallets__subject">
                  Your TRON wallet
                </div>
                <div className="status-panel_wallet">TENt8...wb87A</div>
                <a
                  href="https://tronscan.org/#/address/TENt8w5Mp9zkC43xSTy68SsS8V6gCwb87A"
                  target="_blank"
                  className="status-panel_wallets__btn"
                  id="copy_tronwallet_link"
                  style={{"left": "6px"}}
                >
                  TO TRONSCAN
                </a>
                <input
                  type="hidden"
                  value="TENt8w5Mp9zkC43xSTy68SsS8V6gCwb87A"
                  id="userbase58"
                  name="userbase58"
                />
                <div
                  className="status-panel_wallets__btn copy_tronwallet_btn"
                  style={{"right": "6px"}}
                  data-link="TENt8w5Mp9zkC43xSTy68SsS8V6gCwb87A"
                >
                  COPY
                </div>
              </div>
            </div>
            <div className="border-gradient mt-5">
              <div className="border-gradient_content status-panel_wallets pb-4">
                <div className="status-panel_wallets__subject">
                  Smart Contract address
                </div>
                <div className="status-panel_wallet">TJRv6qu...REpTQu6</div>
                <a
                  href="https://tronscan.org/#/address/TJRv6qukWEz4DKY6gkd3fhX4uahREpTQu6"
                  target="_blank"
                  className="status-panel_wallets__btn"
                  style={{"left": "6px"}}
                >
                  TO TRONSCAN</a
                >
                <input
                  type="hidden"
                  value="TJRv6qukWEz4DKY6gkd3fhX4uahREpTQu6"
                  className="mainContract_btn1"
                  id="dummy"
                  name="dummy"
                />
                <div
                  className="status-panel_wallets__btn mainContract_btn"
                  style={{"right": "6px"}}
                  data-link="TJRv6qukWEz4DKY6gkd3fhX4uahREpTQu6"
                >
                  COPY
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-lg-9">
          <div className="alert-socket" style={{"display": "none"}}>
            <a className="alert-socket__btn">
              <i className="material-icons fa fa-bell"></i>
            </a>
            <div className="alert-socket__content" style={{"display": "none"}}>
              <div className="alert-socket__subject">50 new events</div>
              <ul className="alert-socket__items">
                <li></li>
              </ul>
            </div>
            <div className="alert-socket__cell"></div>
          </div>

          
          <div className="row">
            <div className="counter-wrapper" style={{"display": "none"}}>
              <span style={{"display": "none"}}>&gt;$</span>
              <div className="odometer" ref="odometer" style={{"display": "none"}}>
                123456789
              </div>
            </div>
            <div className="col">
              <div
                className="notice-bg"
                style={{
                  "border-radius": "7px",
                  "padding": "5px",
                  "color": "white",
                  "margin-bottom": "5px",
                  "display": "none"
                }}
              >
                <p
                  style={{
                    "font-size": "17px",
                    "text-align": "left",
                    "margin-bottom": "0",
                    "text-align": "center",
                    "color": "#000"
                  }}
                >
                  Connecting Crypto to Society<br />
                  Forsagetron crypto social network is a Web 3.0, <br />built on
                  the blockchain &amp; exclusively <br />monetized platform
                  based on the FST Ecosystem.<br />We allow people to connect,
                  share ideas, <br />express them to earn rewards &amp; more.
                  <br />Launching Soon...Get Ready To Thrive
                </p>
                <p
                  style={{
                    "font-weight": "700",
                    "font-size": "22px",
                    "margin-bottom": "0",
                    "text-align": "center"
                  }}
                >
                  <a
                    href="https://gov.forsagetron.io/"
                    target="_blank"
                    style={{"color": "#5210d4"}}
                    >www.gov.forsagetron.io</a
                  >
                </p>
              </div>
              <div className="border-gradient mb-3" style={{"display": "none"}}>
                <div className="border-gradient_content">
                  <div id="x3main" className="logotypeX3">
                    <h5
                      style={{
                        "font-size": "30px",
                        "font-weight": "700",
                        "text-align": "center",
                        "margin-bottom": "20px"
                      }} 
                    >
                      JOIN
                    </h5>
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="panel-join-display"
                      style={{
                        "position": "relative",
                        "display": "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        "border": "2px solid #ff6cc5",
                        "border-radius": "10px",
                        "padding": "10px 15px",
                        "line-height": "1",
                        "font-size": "26px"
                      }}
                    >
                      <span>10</span
                      ><span>TRX</span>
                    </div>
                  </div>
                  <div className="ternary-wrapper">
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >100
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >500
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >1000
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >5000
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >10K
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >30k
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >50K
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >100k
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        
                        className="ternary-root matrix-root__nonactive"
                        >250k
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >500k
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >1000k
                      </a>
                    </div>
                    <div className="ternary panel-join-values">
                      <a
                        className="ternary-root matrix-root__nonactive"
                        >2000k
                      </a>
                    </div>
                  </div>
                  <div className="panel-join-controls text-center">
                    <button
                      className="button btn btn-danger"
                    >
                      <div className="button-content">Reset</div>
                    </button>
                    <button className="button btn btn-success" onclick="deposit()">
                      <div className="button-content">Join</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-gradient mb-3" style={{"display": "none"}}>
                <div className="border-gradient_content">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="text-center">
                        <i
                          className="fa fa-bell mr-2 bell"
                          style={{
                            "color": "#fff",
                            "vertical-align": "-webkit-baseline-middle"
                          }}
                        ></i
                        ><br /><span
                          className="text-white text-capitalize"
                          style={{"font-size": "15px", "font-style": "italic"}}
                        >
                          WHO CAN USE THIS FORM
                        </span>
                      </h1>
                      <p>
                        1. If you are not able to swap your old FST into Hybrid
                        FST, you can submit your details.
                      </p>
                      <p>
                        2. If you are able to see your FST balance but not able
                        to transfer into mother wallet, submit your details.
                      </p>
                      <p>
                        3. If any portion of FST has been swapped with NEW
                        HYBRID FST &amp; some part of FST remains same.
                      </p>
                      <p>
                        4. If you have old FST other than your mother wallet,
                        submit your details.<br />Note: If you are able to see
                        USDF value of your FST you can claim, for rest amount
                        you can submit your details
                      </p>
                      <p>
                        Link:-<a
                          href="https://forms.gle/7wycfhQFUMihdnSW7"
                          target="_blank"
                        >
                          https://forms.gle/7wycfhQFUMihdnSW7</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-gradient mb-3" style={{"display": "none"}}>
                <div className="border-gradient_content">
                  <div id="x3main" className="logotypeX3">
                    <div className="row">
                      <div className="col-md-5">
                        <h3 className="text-white mb-2">
                          Forsagetron DeFi Detail
                          <em
                            className="fa fa-info-circle"
                            data-toggle="modal"
                            data-target="#info_modal"
                          ></em>
                        </h3>
                      </div>
                      <div className="col-md-7 text-center">
                        <h3
                          style={{
                            "font-size": "12px",
                            "color": "rgb(255, 255, 255)",
                            "line-height": "35px"
                          }}
                        >
                          FST Smart Contract Address:
                          <a
                            target="_blank"
                            style={{"color": "#bfd3ff"}}
                            href="https://tronscan.org/#/address/TRfgMcT2698L4Ph1LEHzu7dsf25xHb1uaY"
                            >TRfgMcT2698L4Ph1LEHzu7dsf25xHb1uaY</a
                          >
                        </h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 py-3">
                        <div className="col-sm-12">
                          FST Current Rate : $<span id="fstpremrate1"
                            >47.73</span
                          >
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div
                          id="marcketbox3"
                          style={{"display": "block"}}
                          className="update-view marcketbox3 marcketbox green-bg"
                        >
                          <span className="mkt-price mr-3"
                            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                          ><span className="mkt-below">Change in last 24 hrs.</span>
                        </div>
                        <div
                          id="marcketbox3"
                          style={{"display": "block"}}
                          className="update-view marcketbox3 marcketbox green-bg"
                        >
                          <span className="mkt-price mr-3">FST | USD 39.2500</span
                          ><span className="mkt-below text-success"
                            ><i
                              className="fa up-view mr-1 fa-caret-up text-success"
                            ></i>
                            0.2800 (+0.0028%)</span
                          >
                        </div>
                        <div
                          id="marcketbox3"
                          style={{"display": "block"}}
                          className="update-view marcketbox3 marcketbox green-bg"
                        >
                          <span className="mkt-price mr-3"
                            >FST | TRX
                            <span id="fsttotrx">1687.7328</span></span
                          ><span className="mkt-below text-success"
                            ><i
                              className="fa up-view mr-1 fa-caret-up text-success"
                            ></i>
                            0.0000 (+0.0000%)</span
                          >
                        </div>
                        <div
                          id="marcketbox3"
                          style={{"display": "block"}}
                          className="update-view marcketbox3 marcketbox green-bg"
                        >
                          <span className="mkt-price mr-3">FST | BTC 0.0186</span
                          ><span className="mkt-below text-danger"
                            ><i
                              className="fa up-view mr-1 fa-caret-down text-danger"
                            ></i>
                            -0.0002 (0.0000%)</span
                          >
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <div
                          className="token-statistics card card-token height-auto"
                        >
                          <div className="card-innr">
                            <div className="card-head">
                              <h4 className="card-title">FST Token Details</h4>
                            </div>
                            <div
                              className="token-balance token-balance-with-icon mb-2"
                            >
                              <div className="token-balance-icon">
                                <img
                                  src="files/favicon.ico"
                                  alt="logo"
                                  style={{"width": "36px"}}
                                />
                              </div>
                              <div className="token-balance-text">
                                <span className="lead" id="userfstbal"
                                  >0.0000 <span>FST</span></span
                                ><br />
                                <span className="lead" id="userfstusdbal"
                                  >0.0000 <span>USD</span></span
                                >
                              </div>
                            </div>
                            <div
                              className="token-balance token-balance-s2 mb-2 pb-0"
                            >
                              <ul className="token-info-list pb-0">
                                <li>
                                  <span>Current Supply: </span
                                  ><span
                                    style={{"color": "#fff", "margin-left": "25px"}}
                                    id="totalSupply"
                                    >11986 / 26000 FST</span
                                  >
                                </li>
                                <li>
                                  <span>Exchange Supply: </span
                                  ><span
                                    style={{
                                      "color": "#fff",
                                      "min-width": "10px",
                                      "margin-left": "10px",
                                      "margin-right": "24px"
                                    }}
                                    id="premSupply"
                                    >211985.5311 FST</span
                                  >
                                </li>
                                <li>
                                  <span>Max Supply:</span>
                                  <span
                                    style={{
                                      "color": "#fff",
                                      "min-width": "10px",
                                      "margin-left": "25px"
                                    }}
                                  >
                                    720,000 FST</span
                                  >
                                </li>
                                <li>
                                  <span>Total Current Supply: </span
                                  ><span
                                  style={{
                                    "color": "#fff",
                                    "min-width": "10px",
                                    "margin-left": "10px"
                                  }}
                                    id="totalcurrSupply"
                                    >586856.1908 FST</span
                                  >
                                </li>
                                <li>
                                  <span>Current phase:</span>
                                  <span
                                    style={{"color": "#fff", "min-width": "10px"}}
                                    id="dvfstphase"
                                  >
                                    Forsagetron Exchange - 12</span
                                  >
                                </li>
                              </ul>
                            </div>
                            <div className="text-center" style={{"margin-top": "20px"}}>
                              <a
                                target="_blank"
                                href="https://forsagetron.io/dashboard/assets/docs/forsagetron_letest_whitepaper_31102020.pdf"
                                className="btn btn-primary"
                                ><em className="fa fa-download mr-3"></em>
                                Download Whitepaper
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="token-sales card card-full-height">
                          <div className="card-innr">
                            <div className="card-head pb-5">
                              <h4 className="card-title">
                                FST Token Sales Progress
                              </h4>
                            </div>
                            <ul className="progress-info">
                              <li>
                                <span>Raised</span>
                                <span id="raisedfst" style={{"display": "initial"}}
                                  >11986 / 26000</span
                                >
                                FST
                              </li>
                              <li className="text-right">
                                <span>MAX SUPPLY</span> 720,000 FST
                              </li>
                            </ul>
                            <div className="progress-bar">
                              <div
                                className="progress-hcap"
                                data-percent="90"
                                style={{"width": "90%"}}
                              >
                                <div>
                                  Hard cap <span id="hcapvalue">648,000</span>
                                </div>
                              </div>
                              <div
                                className="progress-scap"
                                data-percent="74.44"
                                style={{"width": "74.44%"}}
                              >
                                <div>
                                  Soft cap <span id="softcap">536,000</span>
                                </div>
                                <span
                                  id="raisedper"
                                  style={{
                                    "font-size": "12px",
                                    "line-height": "45px",
                                    "padding-right": "28px"
                                  }}
                                  >46.10%</span
                                >
                              </div>
                              <div
                                className="progress-percent"
                                data-percent="46.10"
                                style={{"width": "46.1%"}}
                              ></div>
                            </div>

                            <div
                              className="countdown-clock12"
                              id="countdownclock12"
                            >
                              <h1
                                className="text-white text-center"
                                style={{"font-size": "18px"}}
                              >
                                Decentralised Exchange is Launched
                              </h1>
                            </div>

                            <div
                              className="text-center mt-60"
                              style={{"margin-top": "58px"}}
                            >
                              <button
                                id="view_transactionss"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#team_actiavtion"
                              >
                                Token Distribution Chart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 ccol-12">
                        <div className="pay-option">
                          <h4>Your TRX Balance</h4>
                          <input
                            className="pay-option-check"
                            type="radio"
                            id="payeth"
                            name="payOption"
                            checked=""
                          />
                          <label className="pay-option-label" for="payeth">
                            <span className="pay-title">
                              <em className="pay-icon cf cf-eth"></em>
                              <span className="pay-cur">TRX</span>
                            </span>
                            <span className="pay-amount" id="trxbalance"
                              >0.0014</span
                            >
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 ccol-12">
                        <div className="pay-option">
                          <h4>Your FST Balance</h4>
                          <input
                            className="pay-option-check"
                            type="radio"
                            id="paylte"
                            name="payOption"
                          />
                          <label className="pay-option-label" for="paylte">
                            <span className="pay-title">
                              <em className="pay-icon cf cf-ltc"></em>
                              <span className="pay-cur">FST</span>
                            </span>
                            <span className="pay-amount" id="fstbalance1"
                              >0.0000</span
                            >
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div
                          className="token-calculator card card-full-height"
                          style={{"height": "calc(100% - 50px)"}}
                        >
                          <div className="card-innr">
                            <div className="card-head">
                              <h4 className="card-title">Buy FST Tokens</h4>

                              <p className="card-title-text">
                                Open Buying at price of $<span
                                  id="fstpremrate2"
                                  style={{"display": "contents", "color": "#fff"}}
                                  >47.73</span
                                >
                              </p>
                            </div>
                            <div className="token-calc mt-2">
                              <div className="token-pay-amount">
                                <lable
                                  style={{
                                    "position": "absolute",
                                    "top": "-25px",
                                    "color": "#fff",
                                    "font-size": "12px"
                                  }}
                                  >Buy with TRX
                                </lable>
                                <input
                                  id="buytokenamount"
                                  className="input-bordered input-with-hint"
                                  type="number"
                                  oninput="this.value = Math.abs(this.value)"
                                  step="any"
                                  min="0"
                                  value="1"
                                />
                                <div className="token-pay-currency">TRX</div>
                              </div>
                              <div className="token-received">
                                <div className="token-eq-sign">=</div>
                                <div className="token-received-amount">
                                  <h5 className="token-amount" id="buytokentrx">
                                    0.0006
                                  </h5>
                                  <div className="token-symbol">FST</div>
                                </div>
                              </div>
                            </div>
                            <div className="token-buy" style={{"margin-top": "50px"}}>
                              <a
                                href="https://forsagetron.io/dashboard/?#!"
                                disable=""
                                className="btn btn-success btn-block"
                                >Buy FST DeFi Tokens</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div
                          className="token-calculator card card-full-height"
                          style={{"height": "calc(100% - 50px)"}}
                        >
                          <div className="card-innr">
                            <div className="card-head">
                              <h4 className="card-title">Sell FST Tokens</h4>
                              <p className="card-title-text">
                                Enter amount to calculate FST token.
                              </p>
                            </div>
                            <div className="token-calc mt-2">
                              <div className="token-pay-amount">
                                <lable
                                  style={{
                                    "position": "absolute",
                                    "top": "-25px",
                                    "color": "#fff",
                                    "font-size": "12px"
                                  }}
                                  >Withdraw to TRX</lable
                                >
                                <input
                                  id="selltokenamount"
                                  className="input-bordered input-with-hint"
                                  type="number"
                                  oninput="this.value = Math.abs(this.value)"
                                  step="any"
                                  min="0"
                                  value="1"
                                />
                                <div className="token-pay-currency">FST</div>
                              </div>
                              <div className="token-received">
                                <div className="token-eq-sign">=</div>
                                <div className="token-received-amount">
                                  <h5 className="token-amount" id="selltokentrx">
                                    1637.1008
                                  </h5>
                                  <div className="token-symbol">TRX</div>
                                </div>
                              </div>
                            </div>
                            <div className="token-calc-note note note-plane">
                              <em className="fa fa-info-circle text-light"></em>
                              <span className="note-text text-light"
                                >Amount calculated based current FST tokens
                                price.</span
                              >
                              <span className="note-text text-light"
                                >3% LeaderPool fee has been deducted.</span
                              >
                            </div>
                            <div className="token-buy1 mt-3">
                              <a
                                href="https://forsagetron.io/dashboard/?#!"
                                className="btn btn-danger btn-block"
                                disable=""
                                >Sell FST DeFi Tokens</a
                              >
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <a
                            href="https://tronscan.org/#/address/TENt8w5Mp9zkC43xSTy68SsS8V6gCwb87A/transactions"
                            target="_blank"
                            className="btn btn-primary"
                            >View Transactions</a
                          >
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 my-3">
                        <div
                          id="view_transaction_detailsss"
                          className="token-transaction card card-full-height"
                          style={{
                            "height": "calc(100% - 116px)",
                            "background": "transparent",
                            "border": "1px solid",
                            "display": "none"
                          }}
                        >
                          <div className="card-innr">
                            <div className="card-head has-aside">
                              <h4 className="card-title">Transaction</h4>
                              <div className="card-opt">
                                <a
                                  href="https://forsagetron.io/dashboard/transactions.html"
                                  className="link ucap"
                                  >View ALL
                                  <em className="fa fa-angle-right ml-2"></em
                                ></a>
                              </div>
                            </div>
                            <table className="table tnx-table">
                              <thead>
                                <tr>
                                  <th>TWZ Tokens</th>
                                  <th>Amount</th>
                                  <th className="d-none d-sm-table-cell tnx-date">
                                    Date
                                  </th>
                                  <th className="tnx-type">
                                    <div className="tnx-type-text"></div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="text-center data-state">
                                        <i
                                          className="fa fa-exclamation-triangle"
                                          aria-hidden="true"
                                          style={{"color": "orange", "font-size": "30px"}}
                                        ></i>
                                      </div>
                                      <span className="lead">18,750</span>
                                    </div>
                                  </td>
                                  <td>
                                    <span>
                                      <span className="lead">3.543</span>
                                      <span className="sub"
                                        >ETH
                                        <em
                                          className="fa fa-info-circle"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          data-original-title="1 ETH = 590.54 USD"
                                        ></em
                                      ></span>
                                    </span>
                                  </td>
                                  <td className="d-none d-sm-table-cell tnx-date">
                                    <span className="sub sub-s2"
                                      >2018-08-24 10:20 PM</span
                                    >
                                  </td>
                                  <td className="tnx-type">
                                    <span
                                      className="
                                        tnx-type-md
                                        badge
                                        badge-outline
                                        badge-success
                                        badge-md
                                      "
                                      >Purchase</span
                                    >
                                    <span
                                      className="
                                        tnx-type-sm
                                        badge
                                        badge-sq
                                        badge-outline
                                        badge-success
                                        badge-md
                                      "
                                      >P</span
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="text-center data-state">
                                        <i
                                          className="fa fa-clock-o text-primary"
                                          aria-hidden="true"
                                          style={{"font-size": "30px"}}
                                        ></i>
                                      </div>
                                      <span className="lead">8,052</span>
                                    </div>
                                  </td>
                                  <td>
                                    <span>
                                      <span className="lead">0.165</span>
                                      <span className="sub"
                                        >BTC
                                        <em
                                          className="fa fa-info-circle"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          data-original-title="1 BTC = 5450.54 USD"
                                        ></em
                                      ></span>
                                    </span>
                                  </td>
                                  <td className="d-none d-sm-table-cell tnx-date">
                                    <span className="sub sub-s2"
                                      >2018-08-24 10:20 PM</span
                                    >
                                  </td>
                                  <td className="tnx-type">
                                    <span
                                      className="
                                        tnx-type-md
                                        badge
                                        badge-outline
                                        badge-warning
                                        badge-md
                                      "
                                      >Bonus</span
                                    >
                                    <span
                                      className="
                                        tnx-type-sm
                                        badge
                                        badge-sq
                                        badge-outline
                                        badge-warning
                                        badge-md
                                      "
                                      >B</span
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="text-center data-state">
                                        <i
                                          className="
                                            fa fa-check-circle-o
                                            text-success
                                          "
                                          aria-hidden="true"
                                          style={{"font-size": "30px"}}
                                        ></i>
                                      </div>
                                      <span className="lead">19,000</span>
                                    </div>
                                  </td>
                                  <td>
                                    <span>
                                      <span className="lead">3.141</span>
                                      <span className="sub"
                                        >LTC
                                        <em
                                          className="fa fa-info-circle"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          data-original-title="1 LTC = 180.54 USD"
                                        ></em
                                      ></span>
                                    </span>
                                  </td>
                                  <td className="d-none d-sm-table-cell tnx-date">
                                    <span className="sub sub-s2"
                                      >2018-08-24 10:20 PM</span
                                    >
                                  </td>
                                  <td className="tnx-type">
                                    <span
                                      className="
                                        tnx-type-md
                                        badge
                                        badge-outline
                                        badge-warning
                                        badge-md
                                      "
                                      >Bonus</span
                                    >
                                    <span
                                      className="
                                        tnx-type-sm
                                        badge
                                        badge-sq
                                        badge-outline
                                        badge-warning
                                        badge-md
                                      "
                                      >B</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-gradient">
                <div className="border-gradient_content">
                  




                  <div id="x3main" className="logotypeX3">
                    <img src="files/x3.svg" alt="" />
                  </div>
                  <div className="ternary-wrapper">


                    <Levels />
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/1/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          1
                        </span>
                        <span className="matrix-price"> 350 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_1"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_1"
                        x3_data_plan="1"
                        x3_data_level="1"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>1215</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>405</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/2/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          2
                        </span>
                        <span className="matrix-price"> 700 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_2"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="78574"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/2/78574/?tx=66d3f40fda8b1b5c4cc540338ca1f581f9f163a4ff3a17fda1e40dc0a324c84b"
                            title="UID: 78574"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="2"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/2/2/?tx=3a80a47013004f0052de7ba7604140a446ad91e7fd179e96be807f083a883eba"
                            title="UID: 2"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_2"
                        x3_data_plan="1"
                        x3_data_level="2"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>347</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>115</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/3/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          3
                        </span>
                        <span className="matrix-price"> 1,400 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_3"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="77476"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/3/77476/?tx=12c9ae3c6b7b8826719bb85aa626474653cc7f17c16b44adcaaaf2cb071506b0"
                            title="UID: 77476"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="78574"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/3/78574/?tx=2b554c3e4a71a2fa31541344a5cf56d325750919fccadad33dba1f37b0c23451"
                            title="UID: 78574"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_3"
                        x3_data_plan="1"
                        x3_data_level="3"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>179</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>59</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/4/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          4
                        </span>
                        <span className="matrix-price"> 2,800 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_4"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="80"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/4/80/?tx=65d395116676d2390b60a31d5fa1572c3257ce2e88f3ee447d9b932ed9c29da3"
                            title="UID: 80"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_4"
                        x3_data_plan="1"
                        x3_data_level="4"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>103</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>34</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/5/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          5
                        </span>
                        <span className="matrix-price"> 5,600 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_5"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_5"
                        x3_data_plan="1"
                        x3_data_level="5"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>63</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>21</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/6/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          6
                        </span>
                        <span className="matrix-price"> 11,200 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_6"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_6"
                        x3_data_plan="1"
                        x3_data_level="6"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>39</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>13</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/7/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          7
                        </span>
                        <span className="matrix-price"> 22,400 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_7"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="80"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/7/80/?tx=5d64e2f5ab110ddcab687a2da219b1744984a87d35e4f7a95d77621563fcc3a9"
                            title="UID: 80"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_7"
                        x3_data_plan="1"
                        x3_data_level="7"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>19</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>6</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/8/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          8
                        </span>
                        <span className="matrix-price"> 44,800 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_8"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="80"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/8/80/?tx=4224cdd2a554263c1e8f0cb8d54bc28d351450fd1553ba51f284a993047c296d"
                            title="UID: 80"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_8"
                        x3_data_plan="1"
                        x3_data_level="8"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>10</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>3</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/9/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          9
                        </span>
                        <span className="matrix-price"> 89,600 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_9"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lilac)"}}
                          title="74444"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/9/74444/?tx=928793a3eae99e1dcd9a7b08b0b4b4202a5db87437aca97e2194f08edb43c146"
                            title="UID: 74444"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_9"
                        x3_data_plan="1"
                        x3_data_level="9"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>7</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>2</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/10/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          10
                        </span>
                        <span className="matrix-price"> 179,200 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_10"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_10"
                        x3_data_plan="1"
                        x3_data_level="10"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>6</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>2</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/11/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          11
                        </span>
                        <span className="matrix-price"> 358,400 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_11"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div
                          className="matrix-children__active"
                          style={{"background-color": "var(--color-lightblue)"}}
                          title="2"
                        >
                          <a
                            href="https://forsagetron.io/dashboard/?page/x3/11/2/?tx=f5e57ba23278f253a42fe24f2d95f6e20aa0fb80828177a71abb40fc5f35bafa"
                            title="UID: 2"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_11"
                        x3_data_plan="1"
                        x3_data_level="11"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>7</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>2</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                    <div className="ternary">
                      <a
                        href="https://forsagetron.io/dashboard/?page/x3/12/1/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          12
                        </span>
                        <span className="matrix-price"> 716,800 </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_12"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                            title="To activate reopen on this platform, please upgrade to the next level!"
                            alt="!"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id="x3_loop_12"
                        x3_data_plan="1"
                        x3_data_level="12"
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>6</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>2</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2 mb-5">
            <div className="col">
              <div className="icon-tips">
                <div className="matrix_currency">
                  <strong style={{"color": "var(--color-lightblue)", "font-weight": "bold"}}> 
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
            var towar = "1";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "2";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "3";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "4";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "5";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "6";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "7";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "8";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "9";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "10";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "11";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
            var towar = "12";
            console.log(towar);
            document.getElementById(
              "x3_partner_high_warning_" + towar
            ).style.display = "inline";
          </script>
          <script type="text/javascript">
            var towar_x6 = "1";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "2";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "3";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "4";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "5";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "6";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "7";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "8";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "9";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "10";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "11";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
            var towar_x6 = "12";
            console.log(towar_x6);
            document.getElementById(
              "x6_partner_high_warning_" + towar_x6
            ).style.display = "inline";
          </script>
        </div>
      </div>

      </>
    );

  }
}
export default App;

// {tWeb()}

