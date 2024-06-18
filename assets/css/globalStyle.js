import { createGlobalStyle, styled } from "styled-components"; 
import {Open_Sans} from "next/font/google";
import localFont from 'next/font/local';

export const OpenSansFont = Open_Sans({
    weight: "variable",
  style: ["italic", "normal"],
  display: "swap",
  subsets: ["latin"],

    variable: '--OpenSans',
  })

export const SwitzerV = localFont({
    src: [
        {
            path: "../fonts/switzer-variable/Switzer-Light.woff2",
            weight: '300',
            style: 'normal',

        },
        {
            path: "../fonts/switzer-variable/Switzer-Regular.woff2",
            weight: '400',
            style: 'normal',
        },
        {
            path: "../fonts/switzer-variable/Switzer-Medium.woff2",
            weight: '500',
            style: 'normal',
        },
        {
            path: "../fonts/switzer-variable/Switzer-Semibold.woff2",
            weight: '600',
            style: 'normal',
        },
        {
            path: "../fonts/switzer-variable/Switzer-Bold.woff2",
            weight: '700',
            style: 'normal',
        },
        {
            path: "../fonts/switzer-variable/Switzer-Extrabold.woff2",
            weight: '800',
            style: 'normal',
        },
        {
            path: "../fonts/switzer-variable/Switzer-Black.woff2",
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--SwitzerV',
})

export const DharmaGE = localFont({
    src: [
        {
            path: "../fonts/dharma-gothic-e/DharmaGothicELightR.woff2",
            weight: '300',
            style: 'normal',
        },
        {
            path: "../fonts/dharma-gothic-e/DharmaGothicERegularR.woff2",
            weight: '400',
            style: 'normal',
        },
        {
            path: "../fonts/dharma-gothic-e/DharmaGothicEBold_R.woff2",
            weight: '600',
            style: 'normal',
        },
        {
            path: "../fonts/dharma-gothic-e/DharmaGothicEExBold_R.woff2", 
            weight: '800',
            style: 'normal',  
        },
        {
            path: "../fonts/dharma-gothic-e/DharmaGothicEHeavyR.woff2",
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--DharmaGE',
})



export const GlobalStyle = createGlobalStyle`
 
 

:root{
--equal-paddings: 6.5rem;
}

* {
color: var(--theme-white-primary);
padding: 0;
margin: 0;
}

html {
scroll-behavior: initial!important;
font-size: 16px;
/* font-size: 1.1vw; */
}

body {
margin: 0;
width: 100%;
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
font-size: 1.05rem;
font-family: var(--SwitzerV);
font-weight: 400;
background-color: var(--theme-white);
color: var(--theme-black-primary);
-moz-osx-font-smoothing: grayscale;
overflow-x: hidden;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
-webkit-text-size-adjust: auto;
-moz-text-size-adjust: auto;
-ms-text-size-adjust: auto;
text-size-adjust: auto;
}

::selection {
color:  #fa512d; 
background-color: #72053d;
-webkit-text-fill-color: #fa512d ;
}



/* scroll bar start */


* {
scrollbar-width: thin;
scrollbar-color: #fa512d #72053d;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
background-color: var(--theme-blue);
}

*::-webkit-scrollbar-thumb {
background-color:  var(--theme-black-primary);
border-radius: 1.0625rem;
border: 0px;
}


/* scroll bar end */


h1, h2, h3, h4, h5, h6, ul, p {
margin: 0;
padding: 0;
vertical-align: baseline;
}

h1, h2, h3, h4, h5, h6, .h1,.h2,.h3, .h4{
color: var(--theme-white-primary);
font-family: var(--DharmaGE);
font-weight: 800;
text-transform: uppercase;
line-height:  110% ;  
}
.h-xl{
  font-size: 28.85638rem;
  letter-spacing: -0.28856rem;
  text-transform: uppercase;
}
.h-l{
  font-size: 20.63569rem;
  letter-spacing: -0.20638rem;
  text-transform: uppercase;
}

h1, .h1{
  font-size: 10.89288rem; 
  letter-spacing: -0.10894rem;
}

h2, .h2 {
font-size: 5rem;
letter-spacing: -0.05rem;
}

h3, .h3 {
font-size: 4rem;
letter-spacing: -0.04rem;
}

h4, .h4 {
font-size: 3.5rem;
letter-spacing: -0.035rem;
}

h5 {
font-size: 3rem;
letter-spacing: -0.03rem;
}

h6 {
font-size: 2.5rem;
letter-spacing: -0.03rem;
}


a, *::before, *::after, img, span, input, button, .navbar, .fixedmenu, .tp-bullet {
transition: ease-in-out 0.2s;
-webkit-transition: ease-in-out 0.2s;
-moz-transition: ease-in-out 0.2s;
-ms-transition: ease-in-out 0.2s;
-o-transition: ease-in-out 0.2s;
}

.btn.focus, .btn:focus, .form-control:focus {
-webkit-box-shadow: none;
box-shadow: none;
}

a, a:link, a:visited, a:hover, a:active {
outline: none;
text-decoration: none; 
}

p {
word-wrap: break-word;
word-break: break-word;
font-size: 1rem;
line-height: 160% ;
font-family: var(--SwitzerV);
font-weight: 400;
margin-bottom: 1rem;
letter-spacing: -0.0125rem;
color: rgba(255, 254, 249, 0.50); 
/* -webkit-hyphens: auto;
hyphens: auto; */
}

li, p, span, b, strong {
color: var(--theme-neutral-700);
}

 

strong, b {
font-family: var(--SwitzerV);
font-weight: 700;
}

ul, ol {
padding-left: 1.2rem;
}
:is(ul.theme-list, ol.theme-list) li:not(:last-child) {margin-bottom: 1rem;}

input, textarea, select, button:focus {
outline: 0;
}

section {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.equal-padding-T {
padding-top: var(--equal-paddings);
}

.equal-padding-B {
padding-bottom: var(--equal-paddings);
}

.hero-head{}
.section-head{}
.sub-head{font-size:1.2rem;}

.theme-fw-500{
  font-family:var(--SwitzerV);
  font-weight: 500;
}
.theme-fw-300{
  font-family:var(--SwitzerV);
  font-weight: 300;
}

${'' /* .pixel-head{
  font-family: 'PixelSplitter-Bold';
  -webkit-text-stroke: 1px #FFFEF9;
text-stroke: 1px #FFFEF9; 
color:#0000;
} */}
 

 ${'' /* .custom-btn{
  padding: .75rem 1.5rem;
  background-image: linear-gradient(180deg, var(--theme-purple) 0%, var(--theme-dark-blue) 136.46%);
  font-family: 'Switzer-V-Black';
  border-radius: 0.5rem;
  color: var(--theme-white-primary);
  letter-spacing: -0.01875rem;
  line-height: 150%;
  display: inline-block;
  text-transform: uppercase;
  border:0;
 } */}

/* Btn 10  */
.custom-btn, body .header-menu-btn button{
  padding: .75rem 1.5rem!important;
  height: auto !important;
  background-image: linear-gradient(180deg, var(--theme-purple) 0%, var(--theme-dark-blue) 136.46%)!important;
  font-family: var(--SwitzerV);
  font-weight: 900;
  border-radius: 0.5rem!important;
  color: var(--theme-white-primary);
  letter-spacing: -0.01875rem;
  line-height: 150%;
  display: inline-block;
  text-transform: uppercase;
  border: 0;
    transition: all .3s ease-in-out;  
    position:relative;
    overflow: hidden;
    z-index:11;
    box-shadow: 0 0 0 0 #fff;
}


:is(.custom-btn, .header-menu-btn button):hover{ 
	  color: var(--theme-black-primary);
    box-shadow: 0 0 1rem 1.5px #ffffff40, 0 0 0rem 1px #fff;
}
:is(.custom-btn, .header-menu-btn button):before {
    content: '';
    width: 116%;
    height: 100%;
    display: block;
    background-image: linear-gradient(50deg, #6CA0E3 -5.55%, #ACA3DE 2.67%, #B3A9D7 10.36%, #85E4B2 14.94%, #70D6DD 19.8%, #97ACF1 23.97%, #D9B9E1 28.73%, #E7DDD5 33.09%, #E5CBD9 40.68%, #E4B7DF 48.72%, #B8B6E9 56.17%, #8DB6F2 65.45%, #B2A9F0 73.83%, #E3B2E8 79.67%, #E9DDDA 85.96%, #81F5F7 93.28%, #7BA3F4 98.61%);
    background-size: 150%;
    background-position:150% 0;
    position: absolute;    
    left: -10%;
    opacity: 0;
    top: 0;
    z-index: -12; 
  transition: all .3s  ease-in-out; 
  pointer-events: none;
  }  

  :is(.custom-btn, .header-menu-btn button):hover::before {
	opacity:1; 
  background-position:0 0;
}
 





.corner-round-1rm{
  border-radius: 1rem;
}

.corner-round-1-3rm{
  border-radius: 1.375rem;
}
 


.linked-in-icon{
    width: 2.5rem;
    height: 2.5rem;
    display: inline-flex;
    border-radius: 50%;
    background-color: var(--theme-blue);
    align-items: center;
    justify-content: center;
}


@keyframes infinite-RTL {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
@keyframes infinite-LTR {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}


[data-speed]{
  transition: .3s linear;
}

form{
  & :is(.error-message, .info-message) {
        font-size: 0.8rem;
        line-height: 100%;
        position: absolute;
        right: 1rem;
        font-family: var(--SwitzerV);
        font-weight: 500;
        background-color: var(--theme-white);
        display: inline-block;
        padding: 0.1rem;
        pointer-events: none;
      }
      & .error-message {
        color: var(--theme-error);
        top: -0.4rem;
      }
}
 

@media screen and (max-width:992px){

  .h-xl{
  font-size: 18.85638rem;
  letter-spacing: -0.28856rem;
  text-transform: uppercase;
}
.h-l{
  font-size: 10.63569rem;
  letter-spacing: -0.20638rem;
  text-transform: uppercase;
}

h1, .h1{
  font-size: 7.89288rem; 
  letter-spacing: -0.10894rem;
}

h2, .h2 {
font-size: 4rem;
letter-spacing: -0.05rem;
}

h3, .h3 {
font-size: 3rem;
letter-spacing: -0.04rem;
}

h4, .h4 {
font-size: 2.5rem;
letter-spacing: -0.035rem;
}

h5 {
font-size: 2rem;
letter-spacing: -0.03rem;
}

h6 {
font-size: 1.5rem;
letter-spacing: -0.03rem;
}


  .bg-glass-elem {
    width:200px;
    height:auto;
}
}

@media screen and (max-width:  768px) {

:root{
  --equal-paddings: 3.25rem;
}

.h-xl{
  font-size: 10rem;
  letter-spacing: 0.00894rem;
  text-transform: uppercase;
}
.h-l{
  font-size: 8rem;
  letter-spacing: 0.00894rem;
  text-transform: uppercase;
}

h1, .h1{
  font-size: 3.1rem; 
  letter-spacing: 0.00894rem;
}

h2, .h2 {
font-size: 2.7rem;
letter-spacing: 0.00894rem;
}

h3, .h3 {
font-size: 2.3rem;
letter-spacing: 0.00894rem;
}

h4, .h4 {
font-size: 1.9rem;
letter-spacing: 0.00894rem;
}

h5 {
font-size: 1.7rem;
letter-spacing: 0.00894rem;
}

h6 {
font-size: 1.5rem;
letter-spacing: 0.00894rem;
}
p, .sub-head{
font-size: 1rem;
}

br{display: none;}

.equal-padding-T {
padding-top: var(--equal-paddings);
}

.equal-padding-B {
padding-bottom: var(--equal-paddings);
}

.custom-btn{
  width: 100%;
    text-align: center;
}
 

.container{
  padding-left:1.5rem!important;
  padding-right:1.5rem!important;
}

.bg-glass-elem {
    width:100px;
    height:auto;
}

}


`;


