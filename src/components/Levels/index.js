import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      my: 0,
      withdrawn: 0

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);

    await this.Investors();
    setInterval(() => this.Link(),1*1000);
    setInterval(() => this.Investors(),2*1000);
  };

  async Link() {

    let mydireccion = await window.tronWeb.trx.getAccount();
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

      var user = await Utils.contract.users(mydireccion).call();

    if( await Utils.contract.isUserExists(mydireccion).call() ){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      

      mydireccion = loc+'?ref='+parseInt(user.id._hex);
      this.setState({
        link: mydireccion,
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
      });
    }
  }
    

  async Investors() {

    var direccion = await window.tronWeb.trx.getAccount();
    var direccion = window.tronWeb.address.fromHex(direccion.address);

    var canasta = [];

    for (var i = 15; i >= 1; i--) {

      var levelPrice = await Utils.contract.levelPrice(i).call();
      levelPrice = parseInt(levelPrice._hex)/10**6;

      if (await Utils.contract.usersActiveX3Levels(direccion, i).call()) {
        
        var matrix = await Utils.contract.usersX3Matrix(direccion, i).call();

        var partners;

        if (matrix[1].length%3 != 0) {

          if (matrix[1].length%3 == 2){

            partners = (
              <>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__nonactive"></div>

              </>

            );
            
          }else{

            partners = (
              <>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__nonactive"></div>
                <div className="matrix-children__nonactive"></div>

              </>

            );
          }
          
        } else {

          partners = (
            <>
              <div className="matrix-children__nonactive"></div>
              <div className="matrix-children__nonactive"></div>
              <div className="matrix-children__nonactive"></div>

            </>

          );
          
        }
        
        canasta[i] = (
          <div className="ternary" key={"level"+i}>
                      <a
                        href="/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          {i}
                        </span>
                        <span className="matrix-price"> {levelPrice} </span>
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
                        {partners}
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id={"x3_loop_"+i}
                        x3_data_plan="1"
                        x3_data_level={i}
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>{matrix[1].length}</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>{parseInt(matrix[1].length/3)}</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>

           );

      }else{

        canasta[i] = (
          <div className="ternary" key={"level"+i}>
                      <a
                        href="/"
                        className="ternary-root matrix-root__nonactive"
                      >
                        <span className="matrix-level matrix-level__active">
                          {i}
                        </span>
                        <span className="matrix-price"> {levelPrice} </span>
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
                        id={"x3_loop_"+i}
                        x3_data_plan="1"
                        x3_data_level={i}
                        title="Click here to get details."
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>0</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>0</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>

           );

      }


      
    }


 



    this.setState({
      canastas:canasta

    });

  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {
    var { balanceRef, totalRef, invested,  withdrawn , my, direccion, link} = this.state;

    var available = (balanceRef+my);
    available = available.toFixed(6);
    available = parseFloat(available);

    balanceRef = balanceRef.toFixed(6);
    balanceRef = parseFloat(balanceRef);

    totalRef = totalRef.toFixed(6);
    totalRef = parseFloat(totalRef);

    invested = invested.toFixed(6);
    invested = parseFloat(invested);

    withdrawn = withdrawn.toFixed(6);
    withdrawn = parseFloat(withdrawn);

    my = my.toFixed(6);
    my = parseFloat(my);

    return (

      <>    


            {this.state.canastas}
                   

      </>
      
    );
  }
}
