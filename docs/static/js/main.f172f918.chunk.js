(this["webpackJsonptron-forsage"]=this["webpackJsonptron-forsage"]||[]).push([[0],{193:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(52),c=n.n(s),o=n(2),l=n.n(o),i=n(3),d=n(53),u=n.n(d),m={tronWeb:!1,contract:!1,setTronWeb(e){this.tronWeb=e},setContract(e,t){var n=this;return Object(i.a)(l.a.mark((function a(){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.contract().at(t);case 2:n.contract=a.sent;case 3:case"end":return a.stop()}}),a)})))()}},w="TExwHCjZYbb7ToQUfQY5JgumwbcXAgeaVd",p="TQMpFtCgDJaJondLpFUbyTHMbeNQoEhKEV";class h extends a.Component{constructor(e){super(e),this.state={min:200,texto:"Register",sponsor:"",level:"Loading...",levelPrice:0,balanceUSDT:"Loading..."},this.deposit=this.deposit.bind(this),this.estado=this.estado.bind(this)}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.setContract(window.tronWeb,p);case 2:e.estado(),setInterval(()=>e.estado(),3e3);case 4:case"end":return t.stop()}}),t)})))()}estado(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a,r,s,c,o,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:n=t.sent,n=window.tronWeb.address.fromHex(n.address),a=20,r=0,s=15;case 7:if(!(s>=0)){t.next=15;break}return t.next=10,m.contract.usersActiveX3Levels(n,s).call();case 10:if(!t.sent){t.next=12;break}r++;case 12:s--,t.next=7;break;case 15:return t.next=17,m.contract.levelPrice(r+1).call();case 17:return c=t.sent,t.next=20,window.tronWeb.contract().at(w);case 20:return o=t.sent,t.next=23,o.balanceOf(n).call();case 23:i=t.sent,i=parseInt(i._hex)/Math.pow(10,6),e.setState({min:a,level:r,levelPrice:parseInt(c._hex)/Math.pow(10,6),balanceUSDT:i});case 26:case"end":return t.stop()}}),t)})))()}deposit(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a,r,s,c,o,i,d,u,h,b,f,x,v,E,g,k,W,N,y,T;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state,a=n.min,r=n.level,s=n.levelPrice,c=n.balanceUSDT,o=s,o=parseFloat(o),t.next=5,window.tronWeb.trx.getAccount();case 5:return i=t.sent,i=window.tronWeb.address.fromHex(i.address),t.next=9,window.tronWeb.trx.getBalance();case 9:return d=t.sent,u=window.tronWeb.fromSun(d),u=parseFloat(u),console.log(u),console.log(o),t.next=16,m.contract.owner().call();case 16:return h=t.sent,b=window.tronWeb.address.fromHex(h),t.next=20,window.tronWeb.contract().at(w);case 20:return f=t.sent,t.next=23,f.allowance(i,p).call();case 23:if(x=t.sent,x=parseInt(x.remaining._hex)/Math.pow(10,6),!(u>=50&&x>=o&&c>=o)){t.next=57;break}if(!((v=document.location.href).indexOf("?")>0)){t.next=41;break}for(E=v.split("?")[1],g=E.split("&"),k={},W=0,N=g.length;W<N;W++)y=g[W].split("="),k[y[0]]=unescape(decodeURI(y[1]));if(!k.ref){t.next=41;break}return y=k.ref.split("#"),t.next=36,m.contract.idToAddress(y[0]).call();case 36:return T=t.sent,t.next=39,m.contract.isUserExists(T).call();case 39:if(!t.sent){t.next=41;break}b=window.tronWeb.address.fromHex(T);case 41:if(e.setState({sponsor:b}),!(o>=a)){t.next=54;break}return t.next=45,m.contract.isUserExists(i).call();case 45:if(!t.sent){t.next=50;break}return t.next=48,m.contract.buyNewLevel(r+1,o*Math.pow(10,6)).send();case 48:t.next=52;break;case 50:return t.next=52,m.contract.registrationExt(b,o*Math.pow(10,6)).send();case 52:t.next=55;break;case 54:window.alert("Please enter an amount greater than 200 TRX");case 55:t.next=62;break;case 57:if(console.log(x),!(x<=0)){t.next=61;break}return t.next=61,f.approve(p,"115792089237316195423570985008687907853269984665640564039457584007913129639935").send();case 61:o>200&&u>250?o>u?u<=50?window.alert("You do not have enough funds in your account you place at least 250 TRX"):(document.getElementById("amount").value=u-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):(document.getElementById("amount").value=o-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):window.alert("You do not have enough funds in your account you place at least 250 TRX");case 62:case"end":return t.stop()}}),t)})))()}render(){var e=this.state.min;return e="Min. "+e+" TRX",r.a.createElement("div",null,r.a.createElement("h6",{className:"text-center"},r.a.createElement("strong",null,this.state.balanceUSDT," USDT"),r.a.createElement("br",null)),r.a.createElement("div",{className:"form-group text-center"},r.a.createElement("p",{className:"card-text"},"You must have ~ 50 TRX to make the transaction"),r.a.createElement("p",null,"current level = ",this.state.level),r.a.createElement("button",{onClick:()=>this.deposit()},"Buy next level"),r.a.createElement("p",null,"Price ",this.state.levelPrice," USDT")))}}var b=n(54);class f extends a.Component{constructor(e){super(e),this.state={direccion:"",link:"Haz una inversi\xf3n para obtener el LINK de referido",registered:!1,balanceRef:0,totalRef:0,invested:0,paidAt:0,my:0,withdrawn:0},this.Investors=this.Investors.bind(this),this.Link=this.Link.bind(this),this.withdraw=this.withdraw.bind(this)}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.setContract(window.tronWeb,p);case 2:setInterval(()=>e.Link(),1e3),setInterval(()=>e.Investors(),2e3);case 4:case"end":return t.stop()}}),t)})))()}Link(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:return n=t.sent,n=window.tronWeb.address.fromHex(n.address),t.next=6,m.contract.users(n).call();case 6:return a=t.sent,t.next=9,m.contract.isUserExists(n).call();case 9:if(!t.sent){t.next=16;break}(r=document.location.href).indexOf("?")>0&&(r=r.split("?")[0]),n=r+"?ref="+parseInt(a.id._hex),e.setState({link:n}),t.next=17;break;case 16:e.setState({link:"Haz una inversi\xf3n para obtener el LINK de referido"});case 17:case"end":return t.stop()}}),t)})))()}Investors(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a,s,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:n=t.sent,n=window.tronWeb.address.fromHex(n.address),0,a=[],s=15;case 7:if(!(s>=0)){t.next=19;break}return t.next=10,m.contract.usersActiveX3Levels(n,s).call();case 10:if(!t.sent){t.next=16;break}return t.next=14,m.contract.usersX3Matrix(n,s).call();case 14:c=t.sent,a[s]=r.a.createElement("div",{className:"col-sm-4 single-services",key:"level"+s},r.a.createElement("h4",{className:"pt-30 pb-20"},"Nivel ",s),r.a.createElement("p",null,"personas ",c[1].length,"| ciclos ",parseInt(c[1].length/3)));case 16:s--,t.next=7;break;case 19:e.setState({canastas:a});case 20:case"end":return t.stop()}}),t)})))()}withdraw(){return Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.contract.withdraw().send();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))()}render(){var e=this.state,t=e.balanceRef,n=e.totalRef,a=e.invested,s=e.withdrawn,c=e.my,o=e.direccion,l=e.link,i=t+c;return i=i.toFixed(6),i=parseFloat(i),t=t.toFixed(6),t=parseFloat(t),n=n.toFixed(6),n=parseFloat(n),a=a.toFixed(6),a=parseFloat(a),s=s.toFixed(6),s=parseFloat(s),c=c.toFixed(6),c=parseFloat(c),r.a.createElement("section",{id:"office",className:"simple-services-area section-gap"},r.a.createElement("div",{className:"container text-center"},r.a.createElement("header",{className:"section-header"},r.a.createElement("h3",{className:"white"},r.a.createElement("span",{style:{fontweight:"bold"}},"My office:")),r.a.createElement("p",null,o),r.a.createElement("br",null),r.a.createElement("h3",{className:"white"},"Referral link:"),r.a.createElement("h6",{className:"aboutus-area",style:{padding:"1.5em",fontSize:"11px"}},r.a.createElement("a",{href:l},l),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(b.CopyToClipboard,{text:l},r.a.createElement("button",{type:"button",className:"primary-btn header-btn text-uppercase ",style:{paddingRight:"30px"}},"Copy to clipboard"))),r.a.createElement("hr",null)),r.a.createElement("div",{className:"row"},this.state.canastas)))}}class x extends a.Component{constructor(e){super(e),this.state={accountAddress:"Billetera NO conectada",accountBalance:"Billetera NO conectada",accountBandwidth:"Billetera NO conectada"}}componentDidMount(){setInterval(()=>this.fetchAccountAddress(),1e3),setInterval(()=>this.fetchAccountBalance(),1e3),setInterval(()=>this.fetchAccountBandwidth(),1e3)}fetchAccountAddress(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:n=t.sent,a=n.address,r=window.tronWeb.address.fromHex(a),e.setState({accountAddress:r});case 6:case"end":return t.stop()}}),t)})))()}fetchAccountBalance(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getBalance();case 2:n=t.sent,a=window.tronWeb.fromSun(n),e.setState({accountBalance:a});case 5:case"end":return t.stop()}}),t)})))()}fetchAccountBandwidth(){var e=this;return Object(i.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getBandwidth();case 2:n=t.sent,e.setState({accountBandwidth:n});case 4:case"end":return t.stop()}}),t)})))()}render(){var e=this.state,t=e.accountAddress,n=e.accountBalance,a=e.accountBandwidth;return r.a.createElement("div",null,r.a.createElement("h5",{className:"text-center"},"Connected Wallet"),r.a.createElement("h6",{className:"text-center"},"Address:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",{style:{fontSize:"11px"}},t)),r.a.createElement("br",null),r.a.createElement("br",null),"Balance:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",null,n," TRX")),r.a.createElement("br",null),r.a.createElement("br",null),"Bandwidth:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",null,a)),r.a.createElement("br",null)))}}var v=n(55),E=n.n(v),g="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/",k=r.a.createElement("div",{className:"col-sm-4 text-center"},r.a.createElement("img",{src:E.a,className:"img-fluid",alt:"TronLink logo"})),W=()=>{window.open(g,"_blank")},N=e=>{var t=e.installed;return void 0!==t&&t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"tronLink row",onClick:W,style:{padding:"3em"}},r.a.createElement("div",{className:"info col-sm-8"},r.a.createElement("h1",null,"Log in Required"),r.a.createElement("p",null,"TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your first wallet or decrypt a previously created wallet.")),k)):r.a.createElement("div",{className:"row",onClick:W},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h1",null,"TronLink Required"),r.a.createElement("p",null,"To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser that can be ",r.a.createElement("a",{href:g,target:"_blank",rel:"noopener noreferrer"},"installed from the Chrome Webstore"),". Once installed, return back and refresh the page.")),k)};class y extends a.Component{constructor(e){super(e),this.state={tronWeb:{installed:!1,loggedIn:!1}}}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise(t=>{var n={installed:!!window.tronWeb,loggedIn:window.tronWeb&&window.tronWeb.ready};if(n.installed)return e.setState({tronWeb:n}),t();var a=0,r=setInterval(()=>{if(a>=10){return window.tronWeb=new u.a("https://api.trongrid.io","https://api.trongrid.io","https://api.trongrid.io"),e.setState({tronWeb:{installed:!1,loggedIn:!1}}),clearInterval(r),t()}if(n.installed=!!window.tronWeb,n.loggedIn=window.tronWeb&&window.tronWeb.ready,!n.installed)return a++;e.setState({tronWeb:n}),t()},100)});case 2:e.state.tronWeb.loggedIn||(window.tronWeb.defaultAddress={hex:window.tronWeb.address.toHex("TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"),base58:"TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"},window.tronWeb.on("addressChange",()=>{e.state.tronWeb.loggedIn||e.setState({tronWeb:{installed:!0,loggedIn:!0}})})),m.setTronWeb(window.tronWeb);case 4:case"end":return t.stop()}}),t)})))()}render(){return this.state.tronWeb.installed?this.state.tronWeb.loggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"convert-area",id:"convert"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"convert-wrap"},r.a.createElement("div",{className:"row justify-content-center align-items-center flex-column pb-30"},r.a.createElement("h1",{className:"text-white"},"Make your investment")),r.a.createElement("div",{className:"row justify-content-center align-items-start"},r.a.createElement("div",{className:"col-lg-6 cols"},r.a.createElement(h,null)),r.a.createElement("div",{className:"col-lg-6 cols"},r.a.createElement(x,null)))))),r.a.createElement(f,null)):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(N,{installed:!0}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(N,null)))}}var T=y,I=document.getElementById("root");c.a.render(r.a.createElement(T,null),I)},55:function(e,t,n){e.exports=n.p+"static/media/TronLinkLogo.d3a8f115.png"},56:function(e,t,n){e.exports=n(193)},85:function(e,t){},86:function(e,t){}},[[56,1,2]]]);
//# sourceMappingURL=main.f172f918.chunk.js.map