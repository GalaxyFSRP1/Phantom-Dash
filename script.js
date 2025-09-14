/* Base Styles and Variables */
:root {
    --phantom-black: #020408;
    --phantom-dark: #040B14;
    --phantom-gray: #0A1628;
    --phantom-light: #1e1e24;
    --teal-primary: #00e6cc;
    --teal-secondary: #00b3a1;
    --teal-glow: rgba(0, 230, 204, 0.3);
    --text-white: #ffffff;
    --text-light: #e0e0e0;
    --text-gray: #a0a0a0;
    --phantom-light-gray: #a0a0a0;
    --gradient-dark: linear-gradient(135deg, var(--phantom-black) 0%, var(--phantom-dark) 100%);
    --gradient-glow: linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-secondary) 100%);
    --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.15);
    --shadow-strong: 0 8px 30px rgba(0, 0, 0, 0.25);
    --transition-fast: all 0.2s ease;
    --transition-medium: all 0.3s ease;
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-xl: 20px;
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: auto;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--phantom-black);
    color: var(--text-white);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}

a {
    text-decoration: none;
    color: var(--text-white);
    transition: var(--transition-fast);
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
}

h1 {
    font-size: 3.5rem;
    letter-spacing: -0.5px;
}

h2 {
    font-size: 2.5rem;
    letter-spacing: -0.3px;
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.25rem;
}

p {
    margin-bottom: 1rem;
    color: var(--text-light);
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    transition: var(--transition-medium);
    cursor: pointer;
    text-align: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    z-index: -1;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.btn:hover::before {
    transform: translateY(0);
}

.btn-primary {
    background: linear-gradient(90deg, var(--teal-primary) 0%, var(--teal-secondary) 100%);
    color: var(--phantom-black);
    box-shadow: 0 0 15px var(--teal-glow);
}

.btn-primary .text-gradient, .btn-outline .text-gradient {
    background: var(--phantom-black);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
}

.btn-primary .text-gradient::after, .btn-outline .text-gradient::after {
    display: none;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px var(--teal-glow);
}

.btn-secondary {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary .text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, var(--teal-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
}

.btn-secondary .text-gradient::after {
    display: none;
}

.btn-secondary:hover {
    border-color: var(--text-light);
    transform: translateY(-3px);
}

.btn-outline {
    background-color: transparent;
    border: 2px solid var(--teal-primary);
    color: var(--teal-primary);
}

.btn-outline:hover {
    background-color: rgba(0, 230, 204, 0.1);
    transform: translateY(-3px);
}

.btn-large {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    letter-spacing: 1px;
}

.btn-full {
    width: 100%;
}

/* Layout */
.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

section {
    padding: 8rem 2rem;
    position: relative;
    z-index: 1;
    margin-bottom: -2px;
}

/* Hero Section */
.hero {
    position: relative;
    background-color: var(--phantom-black);
    padding: 6rem 0;
    background-image: 
        radial-gradient(circle at 50% 0%, rgba(0, 247, 255, 0.02) 0%, transparent 40%),
        linear-gradient(180deg, var(--phantom-black) 0%, var(--phantom-gray) 100%);
 }

.pricing-cards {
    margin-top: 3rem;
}

.pricing-card {
    height: auto;
    min-height: 450px;
}



/* White blobs in background */
.hero .star-field {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

.hero .blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 50% 50%, rgba(0, 247, 255, 0.03) 0%, transparent 60%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 100%);
    filter: blur(50px);
    opacity: 0.95;
}

.hero .star {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
    animation: twinkle 2s infinite;
}

.hero .star::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background: inherit;
    border-radius: inherit;
    transform: translate(-50%, -50%) scale(0);
    animation: pulse 2s ease-in-out infinite;
}

.hero .star-1 { top: 10%; left: 15%; animation-delay: 0.1s; }
.hero .star-2 { top: 25%; left: 45%; animation-delay: 0.3s; }
.hero .star-3 { top: 35%; left: 75%; animation-delay: 0.5s; }
.hero .star-4 { top: 45%; left: 5%; animation-delay: 0.7s; }
.hero .star-5 { top: 55%; left: 35%; animation-delay: 0.9s; }
.hero .star-6 { top: 65%; left: 65%; animation-delay: 1.1s; }
.hero .star-7 { top: 75%; left: 95%; animation-delay: 1.3s; }
.hero .star-8 { top: 85%; left: 25%; animation-delay: 1.5s; }
.hero .star-9 { top: 15%; left: 85%; animation-delay: 1.7s; }
.hero .star-10 { top: 95%; left: 55%; animation-delay: 1.9s; }
.hero .star-11 { top: 5%; left: 95%; animation-delay: 2.1s; }
.hero .star-12 { top: 15%; left: 35%; animation-delay: 2.3s; }
.hero .star-13 { top: 25%; left: 65%; animation-delay: 2.5s; }
.hero .star-14 { top: 35%; left: 95%; animation-delay: 2.7s; }
.hero .star-15 { top: 45%; left: 25%; animation-delay: 2.9s; }
.hero .star-16 { top: 55%; left: 55%; animation-delay: 3.1s; }
.hero .star-17 { top: 65%; left: 85%; animation-delay: 3.3s; }
.hero .star-18 { top: 75%; left: 15%; animation-delay: 3.5s; }
.hero .star-19 { top: 85%; left: 45%; animation-delay: 3.7s; }
.hero .star-20 { top: 95%; left: 75%; animation-delay: 3.9s; }
.hero .star-21 { top: 8%; left: 88%; animation-delay: 4.1s; }
.hero .star-22 { top: 18%; left: 12%; animation-delay: 4.3s; }
.hero .star-23 { top: 28%; left: 92%; animation-delay: 4.5s; }
.hero .star-24 { top: 38%; left: 8%; animation-delay: 4.7s; }
.hero .star-25 { top: 48%; left: 82%; animation-delay: 4.9s; }
.hero .star-26 { top: 58%; left: 18%; animation-delay: 5.1s; }
.hero .star-27 { top: 68%; left: 72%; animation-delay: 5.3s; }
.hero .star-28 { top: 78%; left: 28%; animation-delay: 5.5s; }
.hero .star-29 { top: 88%; left: 62%; animation-delay: 5.7s; }
.hero .star-30 { top: 98%; left: 38%; animation-delay: 5.9s; }
.hero .star-31 { top: 75%; left: 5%; animation-delay: 6.1s; }
.hero .star-32 { top: 82%; left: 15%; animation-delay: 6.3s; }
.hero .star-33 { top: 88%; left: 25%; animation-delay: 6.5s; }
.hero .star-34 { top: 92%; left: 35%; animation-delay: 6.7s; }
.hero .star-35 { top: 78%; left: 45%; animation-delay: 6.9s; }
.hero .star-36 { top: 85%; left: 55%; animation-delay: 7.1s; }
.hero .star-37 { top: 90%; left: 65%; animation-delay: 7.3s; }
.hero .star-38 { top: 95%; left: 75%; animation-delay: 7.5s; }
.hero .star-39 { top: 80%; left: 85%; animation-delay: 7.7s; }
.hero .star-40 { top: 87%; left: 95%; animation-delay: 7.9s; }

.hero .blob-6 {
    width: 120px;
    height: 120px;
    top: 40%;
    left: 15%;
    animation-delay: 5s;
}

.hero .blob-7 {
    width: 160px;
    height: 160px;
    bottom: 20%;
    right: 35%;
    animation-delay: 6s;
}

.hero .blob-8 {
    width: 140px;
    height: 140px;
    top: 15%;
    right: 25%;
    animation-delay: 7s;
}

.hero .blob-9 {
    width: 190px;
    height: 190px;
    bottom: -30px;
    right: -50px;
    animation-delay: 8s;
}

.hero .blob-10 {
    width: 220px;
    height: 220px;
    top: 45%;
    left: -60px;
    animation-delay: 9s;
}

.hero .blob-11 {
    width: 170px;
    height: 170px;
    bottom: 40%;
    left: 40%;
    animation-delay: 10s;
}

.hero .blob-12 {
    width: 130px;
    height: 130px;
    top: -20px;
    right: 40%;
    animation-delay: 11s;
}

.hero .blob-13 {
    width: 210px;
    height: 210px;
    bottom: -40px;
    left: 25%;
    animation-delay: 12s;
}

.hero .blob-14 {
    width: 160px;
    height: 160px;
    top: 35%;
    right: 10%;
    animation-delay: 13s;
}

@keyframes pulse {
    0% {
        transform: scale(1) translate(0, 0);
        opacity: 0.03;
    }
    50% {
        transform: scale(1.05) translate(10px, 10px);
        opacity: 0.04;
    }
    100% {
        transform: scale(1) translate(0, 0);
        opacity: 0.03;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.03;
    }
}

@keyframes twinkle {
    0% {
        opacity: 0.3;
        transform: scale(0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0.3;
        transform: scale(0.3);
    }
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
    }
    100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
}



.section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
    position: relative;
    z-index: 2;
}

.section-header::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    border-radius: 3px;
    opacity: 0.6;
}

.pricing {
    padding: 10rem 2rem;
    position: relative;
    overflow: hidden;
    background: var(--phantom-dark);
    background-image: 
        linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(30, 30, 36, 0.98) 100%),
        radial-gradient(circle at 50% 0%, rgba(0, 230, 204, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, rgba(58, 123, 213, 0.05) 0%, transparent 50%);
}

.pricing-top-text {
    background: rgba(30, 30, 36, 0.7);
    color: white;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
    margin-bottom: 60px;
    box-shadow: 0 4px 15px rgba(0, 230, 204, 0.2);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 230, 204, 0.3);
}

.pricing-top-text h3 {
    margin: 0;
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 1.2rem;
    background: linear-gradient(to right, #00e6cc, #3a7bd5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}



.pricing .container {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
}

.pricing .section-header {
    position: relative;
    z-index: 2;
    animation: fadeIn 1.5s ease-in-out;
}

.pricing-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
}

.pricing-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.2;
    animation: float 15s infinite ease-in-out alternate;
}

.pricing-orb-1 {
    top: -15%;
    right: -10%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(0, 230, 204, 0.6) 0%, rgba(0, 230, 204, 0) 70%);
    animation-delay: 0s;
}

.pricing-orb-2 {
    bottom: -20%;
    left: -15%;
    width: 900px;
    height: 900px;
    background: radial-gradient(circle, rgba(58, 123, 213, 0.6) 0%, rgba(58, 123, 213, 0) 70%);
    animation-delay: 2s;
}

.pricing-orb-3 {
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 102, 204, 0.4) 0%, rgba(255, 102, 204, 0) 70%);
    animation: float 15s infinite ease-in-out alternate, pulse 8s ease-in-out infinite;
    animation-delay: 4s;
}

.pricing-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 25px 25px;
    z-index: 2;
    opacity: 0.8;
    animation: fadeIn 2s ease-in-out, shimmer 15s linear infinite;
}

.pricing-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
.testimonials::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
        radial-gradient(rgba(0, 230, 204, 0.12) 2px, transparent 2px),
        radial-gradient(rgba(58, 123, 213, 0.08) 3px, transparent 3px);
    background-size: 30px 30px, 60px 60px, 90px 90px;
    background-position: 0 0, 15px 15px, 30px 30px;
    z-index: 3;
    opacity: 0.8;
    animation: particleMove 30s infinite linear;
}
}

.pricing-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    gap: 1.5rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.06) 100%);
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10;
    transition: all 0.3s ease;
}

.pricing-toggle:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.08) 100%);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.25),
        inset 0 2px 2px rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.pricing-toggle .toggle-option {
    font-size: 1rem;
    color: var(--phantom-light-gray);
    transition: all 0.3s ease;
    font-weight: 500;
}

.pricing-toggle .toggle-option:hover {
    color: var(--text-white);
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.05);
    transition: .4s;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 3px;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    transition: .4s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

input:checked + .slider {
    background-color: rgba(255, 255, 255, 0.1);
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.discount {
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
    color: white;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 10px rgba(0, 230, 204, 0.3);
    animation: pulse 2s infinite;
}

.pricing-cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: stretch;
    margin: 0 auto;
    max-width: 1300px;
    position: relative;
    z-index: 10;
    padding: 2rem 1rem;
}

.pricing-card {
    flex: 1;
    min-width: 320px;
    background: rgba(30, 30, 36, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-lg);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 
        0 8px 30px rgba(0, 0, 0, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.pricing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-10px) rotateX(2deg) rotateY(-2deg);
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        inset 0 2px 2px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
}

.pricing-card:hover::before {
    opacity: 1;
    transform: translateY(-5px) rotateX(-2deg);
}

.pricing-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.pricing-card:hover::after {
    opacity: 1;
}

.pricing-card.featured {
    background: rgba(30, 30, 36, 0.4);
    border: 1px solid rgba(0, 230, 204, 0.2);
    box-shadow: 0 15px 50px rgba(0, 230, 204, 0.15);
    position: relative;
    transform: scale(1.05);
}

.pricing-card.featured::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    border-radius: calc(var(--border-radius-lg) + 2px);
    z-index: -1;
    opacity: 0.15;
    filter: blur(12px);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.pricing-card.featured:hover::after {
    opacity: 0.3;
    filter: blur(15px);
}

.pricing-badge {
    position: absolute;
    top: -15px;
    right: 20px;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    color: white;
    padding: 0.6rem 1.4rem;
    border-radius: 30px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 20px rgba(0, 230, 204, 0.4);
    text-transform: uppercase;
    z-index: 10;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: pulse 2s infinite;
}

.pricing-icon {
    width: 80px;
    height: 80px;
    background: rgba(0, 230, 204, 0.05);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.pricing-icon::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    opacity: 0.15;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    filter: blur(8px);
}

.pricing-icon i {
    font-size: 2rem;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.pricing-card:hover .pricing-icon {
    transform: scale(1.1) rotate(10deg);
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.2) 0%, rgba(58, 123, 213, 0.2) 100%);
    box-shadow: 0 0 30px rgba(0, 230, 204, 0.5);
    border-color: rgba(255, 255, 255, 0.2);
}

.pricing-card:hover .pricing-icon i {
    transform: scale(1.1);
}

.pricing-card:hover .pricing-icon::after {
    opacity: 0.4;
    filter: blur(15px);
}

.pricing-card-header {
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1.5rem;
    position: relative;
}

.pricing-card-header::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--teal-primary), transparent);
}

.pricing-card-header h3 {
    font-size: 1.8rem;
    margin: 1.2rem 0;
    background: linear-gradient(135deg, var(--text-white) 0%, var(--text-light) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;
    font-weight: 700;
}

.pricing-card-price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 1.8rem 0;
    position: relative;
}

.pricing-card-price::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.currency {
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 0.25rem;
    opacity: 0.8;
    color: var(--text-white);
}

.amount {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.period {
    font-size: 1rem;
    margin-left: 0.25rem;
    color: var(--phantom-light-gray);
}

.pricing-features {
    padding: 2rem 0;
    flex-grow: 1;
}

.pricing-features ul li {
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    color: var(--text-light);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.pricing-features ul li:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(5px) translateY(-2px);
    box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.1),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
}

.pricing-features ul li i {
    position: relative;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 1rem;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.pricing-features ul li i::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
    transition: all 0.3s ease;
}

.pricing-features ul li:hover i {
    transform: scale(1.2);
}

.pricing-features ul li:hover i::after {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.2;
}

.pricing-cta {
    text-align: center;
    margin-top: 2rem;
}

.pricing-cta .btn {
    width: 100%;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.pricing-guarantee {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: var(--border-radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    max-width: 600px;
    margin: 3rem auto 0;
}

.pricing-guarantee h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.pricing-guarantee h4 .text-gradient,
.pricing-guarantee p .text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
}

.pricing-guarantee h4 .text-gradient::after,
.pricing-guarantee p .text-gradient::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-primary), var(--teal-secondary));
    opacity: 0.7;
    border-radius: 2px;
}

.pricing-guarantee p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.5;
}

.pricing-guarantee-icon {
    color: var(--teal-primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

@media (max-width: 992px) {
    .pricing-cards {
        flex-direction: column;
        max-width: 600px;
        margin: 0 auto;
    }

    .pricing-card {
        margin-bottom: 2.5rem;
        transform: none !important;
    }

    .pricing-card:last-child {
        margin-bottom: 0;
    }
    
    .pricing-card.featured {
        order: -1;
        transform: scale(1.03) !important;
    }
}

@media (max-width: 768px) {
    .pricing {
        padding: 6rem 1rem;
    }

    .pricing .section-header {
        margin-bottom: 3rem;
    }

    .pricing-card {
        padding: 1.5rem;
    }

    .pricing-card-header {
        padding-bottom: 1.5rem;
    }

    .pricing-card-header h3 {
        font-size: 1.25rem;
    }

    .pricing-features {
        padding: 1.5rem 0;
    }

    .pricing-features ul li {
        font-size: 0.9rem;
    }
    
    .pricing-icon {
        width: 60px;
        height: 60px;
        margin-bottom: 1rem;
    }
    
    .pricing-icon i {
        font-size: 1.5rem;
    }
    
    .amount {
        font-size: 3rem;
    }
}

@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes shimmer {
    0% {
        opacity: 0.8;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0.8;
    }
}

@keyframes particleMove {
    0% {
        background-position: 0 0, 15px 15px, 30px 30px;
    }
    100% {
        background-position: -30px -30px, -15px -15px, 0 0;
    }
}

.section-header h2 {
    margin-bottom: 1.5rem;
    font-size: 2.8rem;
    letter-spacing: -0.5px;
}

.section-header p {
    font-size: 1rem;
    color: var(--text-gray);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
}







/* Header and Navigation */
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1.5rem 2rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    background: linear-gradient(90deg, rgba(4, 11, 20, 0.95) 0%, rgba(10, 22, 40, 0.95) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 230, 204, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 230, 204, 0.1);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 0px));
    animation: headerFadeIn 0.8s ease-out forwards;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@keyframes headerFadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

header::before {
    content: '';
    position: absolute;
    top: -80px;
    left: 5%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 230, 204, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(40px);
    z-index: -1;
    animation: headerGlow 8s infinite alternate ease-in-out;
}

header::after {
    content: '';
    position: absolute;
    top: -50px;
    right: 10%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(88, 103, 221, 0.25) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(30px);
    z-index: -1;
    animation: headerGlow 12s infinite alternate-reverse ease-in-out;
}

@keyframes headerGlow {
    0% {
        opacity: 0.5;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0.8;
        transform: translateY(20px) scale(1.1);
    }
}

header.scrolled {
    padding: 0.8rem 2rem;
    background: rgba(4, 11, 20, 0.98);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 230, 204, 0.1);
    border-bottom: 1px solid rgba(0, 230, 204, 0.15);
    transform: translateY(0);
}

header.hidden {
    transform: translateY(-100%);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
}

.logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    position: relative;
    z-index: 2;
    padding: 8px 12px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo:hover {
    background: rgba(0, 230, 204, 0.05);
    transform: translateY(-2px);
}

.logo::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(0, 230, 204, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(15px);
    z-index: -1;
    animation: logoGlow 4s infinite alternate ease-in-out;
}

@keyframes logoGlow {
    0% {
        opacity: 0.5;
        transform: scale(1);
    }
    100% {
        opacity: 0.8;
        transform: scale(1.3);
    }
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.5); opacity: 0.2; }
}

.logo img {
    height: 42px;
    margin-right: 0.75rem;
    filter: drop-shadow(0 0 12px var(--teal-glow));
    transition: all 0.3s ease;
}

.logo:hover img {
    transform: rotate(-5deg) scale(1.05);
}

.logo-text {
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.logo-highlight {
    color: var(--teal-primary);
    position: relative;
    background: linear-gradient(90deg, var(--teal-primary), #5ee7d3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.logo-highlight::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    box-shadow: 0 0 10px var(--teal-glow);
    opacity: 0.8;
}

.nav-links {
    display: flex;
    gap: 2.5rem;
    margin-left: 40px;
    position: relative;
    z-index: 2;
}

.nav-link {
    position: relative;
    font-weight: 500;
    padding: 8px 16px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 10px;
    background: transparent;
    letter-spacing: 0.3px;
    font-size: 0.95rem;
}

.nav-link:hover {
    color: var(--text-white);
    background: rgba(0, 230, 204, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-link::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: var(--teal-primary);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 8px var(--teal-glow);
}

.nav-link:hover::before {
    opacity: 1;
    bottom: -6px;
    box-shadow: 0 0 12px var(--teal-glow);
}

.nav-link.active {
    color: var(--teal-primary);
    background: rgba(0, 230, 204, 0.1);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 230, 204, 0.15);
}

.nav-link.active::before {
    opacity: 1;
    width: 8px;
    height: 8px;
    bottom: -5px;
    width: 6px;
    height: 6px;
}

.cta-buttons {
    display: flex;
    gap: 1.2rem;
    position: relative;
    z-index: 2;
    margin-left: 4rem;
}

.cta-buttons::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(0, 230, 204, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(10px);
    z-index: -1;
}

.cta-buttons .btn {
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    padding: 0.9rem 1.8rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 230, 204, 0.1);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(5px);
}

.cta-buttons .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 230, 204, 0.15);
}

.cta-buttons .btn-primary {
    background: linear-gradient(135deg, var(--teal-primary) 0%, #5ee7d3 100%);
    border: none;
    color: var(--phantom-black);
    position: relative;
}

.cta-buttons .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #5ee7d3 0%, var(--teal-primary) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.cta-buttons .btn-primary::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--teal-primary), #5ee7d3, var(--teal-primary));
    border-radius: 16px;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-buttons .btn-primary:hover::after {
    opacity: 1;
}

.cta-buttons .btn-primary:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 20px rgba(0, 230, 204, 0.3);
}

.cta-buttons .btn-primary:hover::before {
    opacity: 1;
}

.cta-buttons .btn-outline {
    border: 2px solid rgba(0, 230, 204, 0.3);
    background: rgba(0, 230, 204, 0.05);
    position: relative;
    backdrop-filter: blur(10px);
}

.cta-buttons .btn-outline::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.1), rgba(88, 103, 221, 0.1));
    border-radius: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.cta-buttons .btn-outline:hover {
    border-color: var(--teal-primary);
    background: rgba(0, 230, 204, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 230, 204, 0.2);
    color: var(--teal-primary);
}

.cta-buttons .btn-outline:hover::before {
    opacity: 1;
}

.cta-buttons .btn-primary i {
    margin-left: 8px;
    font-size: 0.9em;
    transition: transform 0.3s ease;
    position: relative;
    top: 1px;
}

.cta-buttons .btn-primary:hover i {
    transform: translateX(6px);
}

/* Hide mobile CTA buttons on desktop */
.mobile-cta-buttons {
    display: none;
}

.menu-toggle {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--teal-primary);
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(0, 230, 204, 0.08);
    border: 1px solid rgba(0, 230, 204, 0.2);
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.menu-toggle::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.1), rgba(88, 103, 221, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.menu-toggle:hover, .menu-toggle.active {
    background: rgba(0, 230, 204, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.4);
}

.menu-toggle:hover::before, .menu-toggle.active::before {
    opacity: 1;
}

.menu-toggle.active i {
    color: var(--text-white);
}

.nav-dot {
    position: absolute;
    width: 5px;
    height: 5px;
    background: var(--teal-primary);
    border-radius: 50%;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px var(--teal-glow);
}

/* Responsive Header */
@media (max-width: 992px) {
    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 75%;
        height: 100vh;
        background: linear-gradient(135deg, rgba(18, 18, 24, 0.98) 0%, rgba(10, 10, 15, 0.98) 100%);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2.5rem;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 999;
        margin-left: 0;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
        border-left: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .nav-links::before {
        content: '';
        position: absolute;
        top: 20%;
        right: 10%;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(0, 230, 204, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
        border-radius: 50%;
        filter: blur(30px);
        z-index: -1;
    }
    
    .nav-links.active {
        right: 0;
    }
    
    .nav-link {
        font-size: 1.2rem;
        padding: 10px 20px;
        width: 80%;
        text-align: center;
    }
    
    .menu-toggle {
        display: flex;
        z-index: 1000;
    }
    
    .cta-buttons {
        display: none;
    }
    
    .mobile-cta-buttons {
        display: flex;
        flex-direction: column;
        margin-top: 3rem;
        width: 80%;
        gap: 1.2rem;
    }
    
    .mobile-cta-buttons .btn {
        width: 100%;
        text-align: center;
        border-radius: 12px;
        padding: 1rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
    }
    
    .mobile-cta-buttons .btn-primary {
        background: linear-gradient(135deg, var(--teal-primary) 0%, #5ee7d3 100%);
        box-shadow: 0 5px 15px rgba(0, 230, 204, 0.2);
    }
    
    .mobile-cta-buttons .btn-outline {
        border: 2px solid rgba(0, 230, 204, 0.3);
        background: rgba(0, 230, 204, 0.05);
    }
}

/* Hero Section */
.hero {
    min-height: 100vh;
    padding: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(125deg, rgba(5,5,15,0.95) 0%, rgba(10,20,40,0.9) 100%);
    z-index: -1;
}





/* Dashboard text with glowing line */
.dashboard-text {
    position: relative;
    color: #00ffea;
    font-weight: 800;
    background: none;
    -webkit-background-clip: initial;
    -webkit-text-fill-color: #00ffea;
    background-clip: initial;
    text-fill-color: initial;
    text-shadow: 0 0 5px rgba(0, 255, 234, 0.5);
}

.dashboard-text::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #00ffea;
    box-shadow: 0 0 10px 2px rgba(0, 255, 234, 0.7);
    opacity: 0.9;
}

.hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    height: 85vh;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 2.5rem;
}

.hero h1 {
    margin-bottom: 1.5rem;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 1.1;
    background: linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
}

.hero-description {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: var(--text-light);
    max-width: 100%;
    opacity: 0.9;
}



.highlight {
    color: #00e6ff;
    position: relative;
    display: inline-block;
    font-weight: 800;
    z-index: 1;
}



.highlight::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, rgba(0, 230, 204, 0.1) 0%, rgba(0, 230, 204, 0.3) 50%, rgba(0, 230, 204, 0.1) 100%);
    z-index: -2;
    border-radius: 4px;
    animation: highlightPulse 3s infinite;
}

@keyframes highlightPulse {
    0%, 100% {
        opacity: 0.4;
        width: 95%;
        left: 2.5%;
    }
    50% {
        opacity: 0.6;
        width: 100%;
        left: 0;
    }
}

.hero-tagline {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--teal-primary);
    margin-bottom: 1rem;
    position: relative;
    padding-left: 3rem;
    font-weight: 600;
}

.hero-tagline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 2.5rem;
    height: 1px;
    background-color: var(--teal-primary);
    transform: translateY(-50%);
}

.hero-cta {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    justify-content: flex-start;
}

.hero-stats {
    display: flex;
    gap: 2.5rem;
    justify-content: flex-start;
}


    0%, 100% {
        transform: translate(-50%, -50%) scale(0.9);
        opacity: 0.2;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.4;
    }
}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-light);
    font-size: 0.8rem;
    opacity: 0.7;
    animation: fadeInUp 2s ease-in-out infinite;
}

.mouse {
    width: 26px;
    height: 40px;
    border: 2px solid var(--text-light);
    border-radius: 20px;
    position: relative;
    margin-bottom: 0.5rem;
}

.mouse::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 8px;
    background-color: var(--text-light);
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    border-radius: 4px;
    animation: scrollDown 2s infinite;
}

@keyframes scrollDown {
    0%, 100% {
        opacity: 0.5;
        transform: translateX(-50%) translateY(0);
    }
    50% {
        opacity: 0.8;
        transform: translateX(-50%) translateY(10px);
    }
}

@keyframes fadeInUp {
    0%, 100% {
        opacity: 0.4;
        transform: translate(-50%, 5px);
    }
    50% {
        opacity: 0.6;
        transform: translate(-50%, 0);
    }
}

.stat {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.stat:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
}

.stat::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--teal-primary);
    border-radius: 3px;
    opacity: 0.7;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--teal-primary);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-gray);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0.2rem;
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}

.dashboard-preview {
    position: relative;
    z-index: 2;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-out;
    animation: float 10s ease-in-out infinite;
    will-change: transform;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotateY(-5deg) rotateX(2deg);
    }
    50% {
        transform: translateY(-5px) rotateY(-4deg) rotateX(1deg);
    }
}

.dashboard-preview img {
    position: relative;
    max-width: 600px;
    width: 100%;
    display: block;
    transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
    transition: var(--transition-medium);
    box-shadow: var(--shadow-strong);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    z-index: 1;
}

.dashboard-preview:hover img {
    transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateZ(10px);
}

/* Features Section */
.features {
    background-color: var(--phantom-black);
    position: relative;
    overflow: hidden;
    padding: 10rem 2rem 10rem;
    margin-top: -2px;
    background-image: 
        radial-gradient(circle at 20% 20%, var(--phantom-dark) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, var(--phantom-gray) 0%, transparent 40%),
        linear-gradient(145deg, var(--phantom-black) 0%, var(--phantom-dark) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.features::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, var(--teal-glow) 0%, transparent 70%);
    opacity: 0.1;
}

.features .orb {
    position: absolute;
    border-radius: 50%;
    background: var(--teal-primary);
    filter: blur(80px);
    mix-blend-mode: screen;
    pointer-events: none;
    animation: orbFloat 20s ease-in-out infinite;
}

.features .orb-1 {
    width: 400px;
    height: 400px;
    top: 5%;
    left: -5%;
    animation-delay: 0s;
    background: radial-gradient(circle at center, var(--teal-primary) 0%, rgba(0, 230, 204, 0.1) 70%);
    opacity: 0.15;
}

.features .orb-2 {
    width: 300px;
    height: 300px;
    top: 50%;
    right: -5%;
    animation-delay: -5s;
    background: radial-gradient(circle at center, var(--phantom-light) 0%, rgba(45, 45, 53, 0.1) 70%);
    opacity: 0.12;
}

.features .orb-3 {
    width: 350px;
    height: 350px;
    bottom: 5%;
    left: 25%;
    animation-delay: -10s;
    background: radial-gradient(circle at center, var(--teal-secondary) 0%, rgba(0, 179, 161, 0.1) 70%);
    opacity: 0.1;
}

@keyframes orbFloat {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(40px, -40px) scale(1.1);
    }
}

.features::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to bottom, transparent, var(--phantom-dark));
    z-index: 1;
}



.section-tag {
    display: inline-block;
    background-color: rgba(0, 230, 204, 0.1);
    color: var(--teal-primary);
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 230, 204, 0.1);
}

.text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
    font-weight: 700;
}

.text-gradient::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--teal-primary), var(--teal-secondary));
    opacity: 0.9;
    border-radius: 2px;
}

.features-cards {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.feature-card-large {
    display: flex;
    background: var(--phantom-dark);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    position: relative;
    border: 1px solid var(--phantom-gray);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.4s ease;
}

.feature-card-large::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(45deg, var(--phantom-light), var(--phantom-gray));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.3;
    transition: opacity 0.4s ease;
}

.feature-card-large:hover::before {
    opacity: 0.6;
    background: linear-gradient(45deg, var(--teal-primary), var(--phantom-light));
}

.feature-card-large::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, var(--phantom-light) 0%, transparent 70%);
    opacity: 0.1;
    z-index: 0;
}

.feature-card-content {
    flex: 1;
    padding: 3.5rem;
    position: relative;
    z-index: 1;
}

.feature-card-large:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.2);
}

.feature-card-image {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 400px;
}

.feature-card-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) perspective(1000px) rotateY(-10deg);
    max-width: 120%;
    transition: transform 0.5s ease;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.feature-card-large:hover .feature-card-image img {
    transform: translate(-50%, -50%) perspective(1000px) rotateY(-5deg) scale(1.05);
}

.feature-card-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.2), rgba(58, 123, 213, 0.2));
    border-radius: 16px;
    margin-bottom: 1.2rem;
    font-size: 1.5rem;
    color: var(--teal-primary);
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.feature-card-icon::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.feature-card:hover .feature-card-icon::after {
    opacity: 1;
}

.feature-card:hover .feature-card-icon {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.15);
    color: #ffffff;
}

.feature-card-stats {
    display: flex;
    gap: 2rem;
    margin: 2rem 0;
}

.feature-stat {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--teal-primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-gray);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-width: 100%;
}

/* Temporarily disable responsive behavior to ensure 4 columns */
/*
@media (max-width: 1200px) {
    .features-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .features-grid {
        grid-template-columns: 1fr;
    }
}
*/

.feature-card {
    background: rgba(4, 11, 20, 0.7);
    border-radius: 20px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 230, 204, 0.2);
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 230, 204, 0.1);
    backdrop-filter: blur(10px);
    min-width: 0;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.03), rgba(58, 123, 213, 0.03));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.3);
    background: rgba(4, 11, 20, 0.8);
}

.feature-card-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(0, 230, 204, 0.1);
    padding: 0.4rem 0.8rem;
    border-radius: 50px;
    margin-bottom: 1rem;
    border: 1px solid rgba(0, 230, 204, 0.2);
}

.feature-card-badge .text-gradient {
    font-size: 0.8rem;
    font-weight: 700;
    margin-right: 0.5rem;
}

.feature-card-badge .text-gradient::after {
    display: none;
}

.feature-card-badge .badge-text {
    font-size: 0.8rem;
    color: var(--text-light);
}

.feature-card-list {
    list-style: none;
    margin: 0 0 1.2rem 0;
    padding: 0;
}

.feature-card-list li {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    color: var(--text-light);
    font-size: 0.95rem;
}

.feature-card-list li i {
    margin-right: 0.8rem;
    font-size: 1rem;
}

.feature-card-list li i.text-gradient::after {
    display: none;
}

.feature-card:hover::before {
    opacity: 1;
}

.feature-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    color: var(--text-white);
    position: relative;
    display: inline-block;
}

.feature-card h3::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    opacity: 0.5;
    transition: all 0.3s ease;
}

.feature-card:hover h3::after {
    width: 60px;
    opacity: 0.8;
}

.feature-card p {
    color: var(--phantom-light-gray);
    margin-bottom: 1.2rem;
    line-height: 1.5;
    flex-grow: 1;
    font-size: 0.95rem;
}

.feature-link {
    color: var(--teal-primary);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-top: auto;
}

.feature-link i {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
}

.feature-link:hover {
    color: var(--teal-secondary);
}

.feature-link:hover i {
    transform: translateX(5px);
}

.features-banner {
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.12), rgba(58, 123, 213, 0.12));
    border-radius: 24px;
    padding: 4rem;
    position: relative;
    overflow: hidden;
    margin-top: 3rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    transition: all 0.4s ease;
}

.banner-content {
    position: relative;
    z-index: 1;
    text-align: center;
}

.banner-content h3 {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    color: var(--text-white);
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.banner-content p {
    color: var(--phantom-light-gray);
    margin-bottom: 2.5rem;
    font-size: 1.2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.banner-cta {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
}

.banner-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.features-banner:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 230, 204, 0.15);
    border-color: rgba(0, 230, 204, 0.2);
}

@media (max-width: 992px) {
    .feature-card-large {
        flex-direction: column;
    }
    
    .feature-card-image {
        min-height: 300px;
    }
    
    .feature-card-image img {
        position: relative;
        top: 0;
        left: 0;
        transform: none;
        width: 100%;
        height: auto;
    }
    
    .feature-card-large:hover .feature-card-image img {
        transform: scale(1.05);
    }
    
    .banner-cta {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .banner-cta .btn {
        width: 100%;
        max-width: 300px;
    }
    
    .features-banner {
        padding: 3rem 2rem;
    }
    
    .banner-content h3 {
        font-size: 1.8rem;
    }
    
    .banner-content p {
        font-size: 1.1rem;
    }
}

@media (max-width: 768px) {
    .features-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .section-header h2 {
        font-size: 2.2rem;
    }
    
    .section-header p {
        font-size: 1.1rem;
    }
    
    .feature-card-content {
        padding: 2.5rem;
    }
    
    .features-cards {
        gap: 3rem;
        margin: 3rem auto;
    }
}

.feature-image img {
    width: 100%;
    max-width: 500px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-strong);
    transform: perspective(1000px) rotateY(-5deg);
    transition: var(--transition-medium);
}

.feature-group.active .feature-image img {
    animation: float 6s ease-in-out infinite;
}

.feature-image:hover img {
    transform: perspective(1000px) rotateY(-8deg) translateZ(10px);
}

.feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: rgba(0, 230, 204, 0.1);
    border-radius: 50%;
    margin-bottom: 1.5rem;
    color: var(--teal-primary);
    font-size: 1.5rem;
    box-shadow: 0 0 20px rgba(0, 230, 204, 0.2);
}

.feature-details h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.feature-details p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
}

.feature-list {
    margin-bottom: 2rem;
}

.feature-list li {
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    color: var(--text-light);
}

.feature-list li i {
    color: var(--teal-primary);
    margin-right: 0.75rem;
    font-size: 1.1rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    max-width: 1200px;
    margin: 4rem auto 0;
    padding: 0 2rem;
}

.feature-mini-card {
    background-color: rgba(30, 30, 36, 0.5);
    border-radius: var(--border-radius-lg);
    padding: 2rem;
    transition: var(--transition-medium);
    box-shadow: var(--shadow-soft);
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    height: 100%;
}

.feature-mini-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.2);
    background-color: rgba(30, 30, 36, 0.7);
}

/* Mini Features Grid - Removed */

@media (max-width: 992px) {
    .mini-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .features-tabs {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .feature-tab {
        margin-bottom: 0.5rem;
    }
    
    .feature-showcase {
        flex-direction: column;
    }
    
    .feature-details,
    .feature-image {
        width: 100%;
    }
    
    .feature-image {
        margin-top: 2rem;
        order: 2;
    }
}

@media (max-width: 576px) {
    .mini-grid {
        grid-template-columns: 1fr;
    }
}

.feature-mini-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--gradient-glow);
    z-index: 1;
    opacity: 0;
    transition: var(--transition-medium);
}

.feature-mini-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.05), rgba(58, 123, 213, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.feature-mini-card:hover::before {
    opacity: 1;
}

.feature-mini-card:hover::after {
    opacity: 1;
}

.feature-mini-card .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.15), rgba(58, 123, 213, 0.15));
    box-shadow: 0 0 20px rgba(0, 230, 204, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.feature-mini-card:hover .feature-icon {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.15);
    color: #ffffff;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.25), rgba(58, 123, 213, 0.25));
}

.feature-mini-card h4 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: var(--text-white);
    position: relative;
    display: inline-block;
}

.feature-mini-card p {
    color: var(--phantom-light-gray);
    margin-bottom: 0;
    font-size: 1rem;
    line-height: 1.6;
    flex-grow: 1;
}

/* Pricing Section */
.pricing {
    position: relative;
    overflow: hidden;
    padding: 10rem 2rem 10rem;
    margin-top: -2px;
    background: var(--phantom-dark);
    background-image: 
        linear-gradient(145deg, rgba(5, 5, 20, 0.8) 0%, rgba(15, 25, 45, 0.9) 100%);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
}

.pricing {
    margin-top: -150px;
    padding: 12rem 2rem 8rem;
    background: transparent;
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
}

.pricing::before {
  content: "";
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(to bottom, rgba(5,5,20,0.95), transparent);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  z-index: -1;
}

.features::after {
  content: "";
  position: absolute;
  bottom: -100px;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(to top, rgba(5,5,20,0.95), transparent);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  z-index: 1;
}

.pricing-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem auto;
    background: rgba(15, 15, 25, 0.8);
    border-radius: 50px;
    padding: 0.6rem 1rem;
    width: fit-content;
    border: 1px solid rgba(0, 230, 204, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.toggle-option {
    padding: 0.5rem 1rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #8A8F98;
    transition: all 0.3s ease;
}

.toggle-option .text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
}

.toggle-option .text-gradient::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-primary), var(--teal-secondary));
    opacity: 0.7;
    border-radius: 2px;
}

.toggle-option.active {
    color: #fff;
}

.toggle-option.active .text-gradient {
    opacity: 1;
}

.switch {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 22px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(30, 30, 40, 0.8);
    border: 1px solid rgba(0, 230, 204, 0.2);
    transition: 0.3s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background: #00E6CC;
    transition: 0.3s;
    box-shadow: 0 0 8px rgba(0, 230, 204, 0.5);
}

input:checked + .slider {
    background: rgba(0, 230, 204, 0.3);
}

input:checked + .slider:before {
    transform: translateX(20px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.discount {
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    background: rgba(0, 230, 204, 0.3);
    border-radius: 50px;
}

.pricing-cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    margin: 0 auto;
    max-width: 1200px;
}

.pricing-grid::-webkit-scrollbar {
    display: none;
}

.pricing-grid {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.pricing-card {
    background: linear-gradient(145deg, rgba(20, 20, 30, 0.3), rgba(10, 10, 20, 0.4));
    border-radius: 24px;
    padding: 2.5rem;
    position: relative;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    width: 320px;
    display: flex;
    flex-direction: column;
}

.pricing-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 230, 204, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.pricing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--teal-glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.pricing-card:hover::before {
    opacity: 0.2;
}

.pricing-card.featured {
    background: rgba(30, 30, 40, 0.4);
    border-color: rgba(0, 230, 204, 0.15);
    position: relative;
}

.pricing-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    background: rgba(0, 230, 204, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    border: 1px solid rgba(0, 230, 204, 0.2);
    z-index: 10;
}

.pricing-badge::before {
    content: 'BEST';
    font-size: 0.8rem;
    font-weight: 700;
    margin-right: 0.5rem;
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.pricing-badge::after {
    content: 'Value';
    font-size: 0.8rem;
    color: var(--text-light);
}

.pricing-card.featured:hover {
    transform: translateY(-5px);
}

.pricing-card-header {
    margin-bottom: 2rem;
    position: relative;
    text-align: center;
}

.pricing-card-header h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.pricing-card-price {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    position: relative;
}

.pricing-card-price .currency {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0.5rem;
    opacity: 0.8;
}

.pricing-card-price .amount {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
}

.pricing-card-price .decimal {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0.5rem;
    opacity: 0.8;
}

.pricing-card-price .period {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1.5rem;
    opacity: 0.7;
    color: var(--text-secondary);
}



.pricing-card-description {
    font-size: 0.875rem;
    color: rgba(255, 75, 75, 0.8);
    margin-bottom: 2rem;
    line-height: 1.6;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.pricing-card-description::before {
    content: '⚠';
    font-size: 1rem;
}

.pricing-features {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
}

.pricing-features li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--text-secondary);
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
}

.pricing-features li .text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    display: inline-block;
}

.pricing-features li .text-gradient::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-primary), var(--teal-secondary));
    opacity: 0.7;
    border-radius: 2px;
}

.pricing-features li::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--teal-primary), transparent);
    opacity: 0.3;
    border-radius: 2px;
}

.pricing-features li:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(5px);
}

.pricing-features li i {
    color: var(--teal-primary);
    font-size: 1rem;
}

.pricing-card-features li::before {
    content: '✓';
    color: var(--teal-primary);
    font-size: 0.8rem;
}

.pricing-card-button {
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    background: var(--teal-primary);
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.9rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.pricing-card-button:hover {
    background: var(--teal-secondary);
    transform: translateY(-2px);
}
    margin: 0 auto 4rem;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
    animation: fadeIn 2s ease-in-out;
}





.pricing-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.1), rgba(0, 230, 204, 0.05));
    border-radius: 20px;
    font-size: 1.5rem;
    color: var(--teal-primary);
    transition: all 0.3s ease;
}

.pricing-card:hover .pricing-icon {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.15), rgba(0, 230, 204, 0.1));
}


.pricing-features li {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-secondary);
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.pricing-features ul li i {
    color: var(--teal-primary);
    font-size: 0.9rem;
}

.pricing-cta {
    margin-top: auto;
    padding-top: 1.5rem;
    text-align: center;
}

.pricing-cta .btn {
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: inline-block;
    text-decoration: none;
}

.pricing-cta .btn-outline {
    background: transparent;
    color: var(--teal-primary);
    border: 1px solid rgba(0, 230, 204, 0.3);
}

.pricing-cta .btn-outline:hover {
    background: rgba(0, 230, 204, 0.1);
    border-color: var(--teal-primary);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.pricing-cta .btn-primary {
    background: linear-gradient(135deg, var(--teal-primary), var(--teal-secondary));
    color: var(--dark-bg);
    border: none;
}

.pricing-cta .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 230, 204, 0.2);
}
    overflow: hidden;
}

.pricing-cta .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
}

.pricing-cta .btn:hover::before {
    transform: translate(-50%, -50%) scale(1);
}

.pricing-card.featured .pricing-cta .btn-primary {
    background: linear-gradient(135deg, var(--teal-primary), var(--teal-secondary));
    box-shadow: 0 10px 20px rgba(0, 230, 204, 0.2);
}

.pricing-card.featured .pricing-cta .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 230, 204, 0.3);
}

.pricing-cta .btn {
    width: 100%;
    padding: 0.6rem;
    font-size: 0.85rem;
    border-radius: 8px;
    background: var(--teal-primary);
    border: none;
    color: var(--phantom-black);
    font-weight: 500;
    cursor: pointer;
}

.pricing-cta .btn:hover {
    background: var(--teal-secondary);
}

.pricing-header {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 1rem 0;
    color: var(--teal-primary);
}

.currency {
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 0.25rem;
}

.amount {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
}

.period {
    font-size: 0.9rem;
    margin-left: 0.25rem;
    color: var(--text-gray);
    background-clip: initial;
    color: var(--phantom-light-gray);
}

.pricing-features {
    padding: 1rem;
}

.pricing-features ul {
    list-style: none;
    margin-bottom: 2rem;
}

.pricing-features ul li {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    color: var(--text-light);
    font-size: 1rem;
}

.pricing-features ul li i {
    margin-right: 1rem;
    font-size: 1.2rem;
}

.pricing-features ul li i.text-gradient {
    background: linear-gradient(90deg, var(--teal-primary) 0%, #4DEEEA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.pricing-features ul li i.text-gradient::after {
    display: none;
}

.pricing-cta {
    padding: 1rem;
    text-align: center;
}

.pricing-cta .btn {
    transition: all 0.3s ease;
}

.pricing-guarantee {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
    max-width: 600px;
    margin: 2rem auto 0;
}

.pricing-guarantee h4 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: var(--text-white);
}

.pricing-guarantee p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--phantom-light-gray);
    line-height: 1.4;
}

.pricing-guarantee-icon {
    color: var(--teal-primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: inline-block;
}

.pricing {
    padding: 2rem 0.5rem;
    background: var(--phantom-dark);
}

.pricing .container {
    max-width: 900px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .pricing {
        padding: 1rem 0.5rem;
    }

    .pricing-card {
        padding: 1rem;
    }

    .pricing-card-header h3 {
        font-size: 1rem;
    }

    .pricing-card-header .pricing-card-price {
        font-size: 1.5rem;
    }

    .pricing-card-header .currency {
        font-size: 1.2rem;
    }

    .pricing-card-header .period {
        font-size: 0.8rem;
    }

    .pricing-features ul li {
        font-size: 0.85rem;
    }

    .pricing-icon {
        width: 32px;
        height: 32px;
        font-size: 1rem;
    }
}

.pricing-card {
    flex: 1;
    background: rgba(4, 11, 20, 0.7);
    border: 1px solid rgba(0, 230, 204, 0.2);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 30px rgba(0, 230, 204, 0.1);
    position: relative;
    overflow: hidden;
}

.pricing-card-inner {
    background: transparent;
    border-radius: calc(var(--border-radius-lg) - 4px);
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.pricing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 230, 204, 0.15);
    border-color: rgba(0, 230, 204, 0.4);
}

.pricing-card:hover::before {
    opacity: 1;
}

.pricing-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.pricing-icon i {
    font-size: 1.5rem;
    color: var(--teal-primary);
}

.pricing-card-header {
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 1rem;
}

.pricing-card-header h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--text-primary);
    font-weight: 600;
}

.pricing-card-price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 1.5rem 0;
}


    background-position: 0 0, 15px 15px, 30px 30px;
    z-index: 3;
    opacity: 0.7;
    animation: particleMove 25s infinite linear;
}

.pricing .section-header {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
    z-index: 10;
    animation: fadeIn 1.5s ease-in-out;
}

.pricing .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
}

.pricing .section-header h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    border-radius: 3px;
}

.pricing-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 1rem 2rem;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
}

.pricing-toggle .toggle-option {
    font-size: 1rem;
    color: var(--phantom-light-gray);
    transition: all 0.3s ease;
    font-weight: 500;
}

.pricing-toggle .toggle-option:hover {
    color: var(--text-white);
}

.pricing-toggle .discount {
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
    color: white;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 10px rgba(0, 230, 204, 0.3);
    animation: pulse 2s infinite;
}

.pricing .section-tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(0, 230, 204, 0.1);
    color: var(--teal-primary);
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Contact Section */
.contact-section {
    background-color: var(--phantom-black);
    position: relative;
    overflow: hidden;
    padding: 10rem 2rem 10rem;
    margin-top: -2px;
    background-image: 
        radial-gradient(circle at 20% 20%, var(--phantom-dark) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, var(--phantom-gray) 0%, transparent 40%),
        linear-gradient(145deg, var(--phantom-black) 0%, var(--phantom-dark) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.contact-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, var(--teal-glow) 0%, transparent 70%);
    opacity: 0.1;
}

.contact-section .orb {
    position: absolute;
    border-radius: 50%;
    background: var(--teal-primary);
    filter: blur(80px);
    mix-blend-mode: screen;
    pointer-events: none;
    animation: orbFloat 20s ease-in-out infinite;
}

.contact-section .orb-1 {
    width: 400px;
    height: 400px;
    top: 5%;
    left: -5%;
    animation-delay: 0s;
    background: radial-gradient(circle at center, var(--teal-primary) 0%, rgba(0, 230, 204, 0.1) 70%);
    opacity: 0.15;
}

.contact-section .orb-2 {
    width: 300px;
    height: 300px;
    top: 50%;
    right: -5%;
    animation-delay: -5s;
    background: radial-gradient(circle at center, var(--phantom-light) 0%, rgba(45, 45, 53, 0.1) 70%);
    opacity: 0.12;
}

.contact-section .orb-3 {
    width: 350px;
    height: 350px;
    bottom: 5%;
    left: 25%;
    animation-delay: -10s;
    background: radial-gradient(circle at center, var(--teal-secondary) 0%, rgba(0, 179, 161, 0.1) 70%);
    opacity: 0.1;
}

.contact-section::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to bottom, transparent, var(--phantom-dark));
    z-index: 1;
}

.contact-section .section-header {
    position: relative;
    z-index: 10;
    text-align: center;
    margin-bottom: 4rem;
}

.contact-section .section-tag {
    display: inline-block;
    background-color: rgba(0, 230, 204, 0.1);
    color: var(--teal-primary);
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 230, 204, 0.1);
}

.contact-container {
    max-width: 1200px;
    margin: 0 auto 4rem;
    position: relative;
    z-index: 10;
}

/* Contact form card styling to match feature-card-large */
.contact-form-card {
    background: rgba(4, 11, 20, 0.7);
    border-radius: 20px;
    padding: 3rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 230, 204, 0.2);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 3rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 230, 204, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.contact-form-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 230, 204, 0.03), rgba(58, 123, 213, 0.03));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.contact-form-card:hover::before {
    opacity: 1;
}

.contact-form-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.3);
    background: rgba(4, 11, 20, 0.8);
}

.feature-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.contact-image {
    flex: 0 0 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.contact-image img {
    max-width: 100%;
    height: auto;
    transition: all 0.5s ease;
    transform: scale(0.9);
}

.contact-form-card:hover .contact-image img {
    transform: scale(1);
}

/* Contact cards container for 3-card layout */
.contact-cards-container-vertical {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 3rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
}

.contact-small-cards-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.contact-card-main {
    flex: 2;
    background: rgba(20, 20, 30, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 40px 60px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    min-width: 300px;
    max-width: 800px;
    min-height: 450px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.contact-card-main::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.1));
    opacity: 0.5;
    z-index: -1;
}

.contact-card-main:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(var(--primary-rgb), 0.3);
    background: rgba(25, 25, 35, 0.7);
}

.contact-card-small {
    flex: 1;
    background: rgba(20, 20, 30, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    min-width: 200px;
    max-width: 400px;
}

.contact-card-small::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.1));
    opacity: 0.5;
    z-index: -1;
}

.contact-card-small:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(var(--primary-rgb), 0.3);
    background: rgba(25, 25, 35, 0.7);
}

.contact-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.contact-buttons .btn {
    padding: 8px 15px;
    border-radius: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.contact-card-main h3,
.contact-card-small h3 {
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
}

.contact-card-main p,
.contact-card-small p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.8rem;
}

.contact-card-main .feature-card-badge,
.contact-card-small .feature-card-badge {
    padding: 5px 10px;
    font-size: 0.7rem;
}

.contact-card-main .feature-card-icon,
.contact-card-small .feature-card-icon {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
}

.contact-card-main .feature-card-list,
.contact-card-small .feature-card-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-card-main .feature-card-list li,
.contact-card-small .feature-card-list li {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.feature-link {
    display: inline-flex;
    align-items: center;
    color: var(--text-light);
    text-decoration: none;
    margin-top: auto;
    font-size: 0.85rem;
    transition: all 0.3s ease;
}

.feature-link i {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
}

.feature-link:hover {
    color: var(--text-white);
}

.feature-link:hover i {
    transform: translateX(5px);
}

.feature-link:hover .text-gradient {
    background-position: right center;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1rem;
    color: var(--text-white);
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: var(--font-primary);
    width: 100%;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: rgba(0, 230, 204, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 230, 204, 0.1);
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

/* Responsive styles for contact section */
@media (max-width: 992px) {
    .contact-form-card {
        flex-direction: column;
    }
    
    .contact-image {
        order: -1;
        margin-bottom: 2rem;
    }
    
    .contact-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.contact-form .btn {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    padding: 1rem;
}

.contact-form .btn i {
    margin-left: 0.5rem;
}

.form-success-message {
    background: rgba(25, 28, 36, 0.6);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: var(--border-radius-lg);
    padding: 3rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 230, 204, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
    overflow: hidden;
    text-align: center;
    animation: fadeIn 0.5s ease-out;
}

.form-success-message::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), #3a7bd5);
    opacity: 0.5;
}

.success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 230, 204, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    color: var(--teal-primary);
    font-size: 2.5rem;
    animation: scaleIn 0.5s ease-out;
}

.form-success-message h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #fff;
}

.form-success-message p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1rem;
}

.form-success-message .btn {
    display: inline-flex;
    justify-content: center;
    padding: 0.75rem 1.5rem;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

@media (max-width: 992px) {
    .contact-small-cards-row {
        flex-direction: column;
    }
    
    .contact-card-main,
    .contact-card-small {
        min-width: 100%;
    }
    
    .contact-buttons {
        flex-direction: column;
    }
    
    .contact-card {
        flex: 1;
        min-width: 250px;
    }
}

@media (max-width: 768px) {
    .contact-info {
        flex-direction: column;
    }
    
    .contact-form {
        padding: 2rem;
    }
}

/* Testimonials Section */
.testimonials {
    background: var(--phantom-dark);
    position: relative;
    overflow: hidden;
    padding: 10rem 2rem;
    background-image: 
        linear-gradient(145deg, rgba(5, 5, 20, 0.85) 0%, rgba(15, 25, 45, 0.95) 100%),
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M0,0 L100,100 M100,0 L0,100" stroke="rgba(0,230,204,0.05)" stroke-width="1"/></svg>');
    background-size: cover, 30px 30px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}


    height: 100%;
    background-image: 
        radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
        radial-gradient(rgba(0, 230, 204, 0.15) 2px, transparent 2px),
        radial-gradient(rgba(58, 123, 213, 0.1) 3px, transparent 3px);
    background-size: 30px 30px, 60px 60px, 90px 90px;
    background-position: 0 0, 15px 15px, 30px 30px;
    z-index: 3;
    opacity: 0.7;
    animation: particleMove 25s infinite linear;
}

.testimonials .section-header {
    position: relative;
    z-index: 10;
}

.testimonials .section-tag {
    display: inline-block;
    padding: 0.5rem 1.2rem;
    background: rgba(0, 230, 204, 0.15);
    color: var(--teal-primary);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 230, 204, 0.1);
}

.testimonials .text-gradient {
    background: linear-gradient(135deg, var(--teal-primary) 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.testimonial-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
}

.testimonial-slider {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding: 2rem 0.5rem;
    margin: 0 -0.5rem;
    scroll-snap-type: x mandatory;
}

.testimonial-slider::-webkit-scrollbar {
    display: none;
}

.testimonial-card {
    background: rgba(25, 28, 36, 0.6);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: var(--border-radius-lg);
    padding: 2.5rem;
    min-width: 350px;
    flex: 1;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 230, 204, 0.08);
    transition: var(--transition-medium);
    scroll-snap-align: start;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    animation: cardFloat 6s ease-in-out infinite alternate;
}

@keyframes cardFloat {
    0% {
        transform: translateY(0);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 230, 204, 0.08);
    }
    100% {
        transform: translateY(-10px);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 230, 204, 0.12);
    }
}

.testimonial-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), #3a7bd5);
    opacity: 0.5;
    transition: var(--transition-medium);
}

.testimonial-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
}

.testimonial-card:hover::before {
    opacity: 1;
}

.testimonial-content {
    margin-bottom: 2rem;
    position: relative;
}

.quote-icon {
    position: absolute;
    top: -15px;
    left: -10px;
    font-size: 2.5rem;
    color: var(--teal-primary);
    opacity: 0.2;
}

.testimonial-content p {
    font-style: italic;
    color: var(--text-light);
    font-size: 1.1rem;
    line-height: 1.7;
    position: relative;
    z-index: 1;
}

.testimonial-author {
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1.5rem;
}

.testimonial-author img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
    border: 2px solid transparent;
    background: linear-gradient(white, white) padding-box,
               linear-gradient(90deg, var(--teal-primary), #3a7bd5) border-box;
    box-shadow: 0 0 15px rgba(0, 230, 204, 0.3);
}

.author-info h4 {
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    color: var(--text-white);
}

.author-info p {
    margin-bottom: 0;
    color: var(--phantom-light-gray);
    font-size: 0.9rem;
}

.testimonial-indicators {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 2rem 0 3rem;
    position: relative;
    z-index: 10;
}

.indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: var(--transition-medium);
}

.indicator.active {
    background-color: var(--teal-primary);
    box-shadow: 0 0 10px var(--teal-glow);
}

.trusted-brands {
    margin-top: 3rem;
    text-align: center;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
}

.trusted-brands-header {
    margin-bottom: 2.5rem;
}

.trusted-brands-header h3 {
    font-size: 1.5rem;
    color: var(--text-white);
    margin-bottom: 1rem;
}

.brands {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 3.5rem;
    max-width: 1000px;
    margin: 0 auto;
}

.brands img {
    height: 35px;
    opacity: 0.6;
    transition: var(--transition-medium);
    filter: grayscale(100%);
}

.brands img:hover {
    opacity: 1;
    filter: grayscale(0%);
    transform: scale(1.05);
}

/* Contact Section */
.contact-new {
    position: relative;
    background-color: var(--phantom-black);
    padding: 6rem 0;
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(0, 230, 204, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(58, 123, 213, 0.1) 0%, transparent 50%),
        linear-gradient(145deg, rgba(10, 10, 15, 0.8) 0%, rgba(15, 15, 25, 0.9) 100%);
    overflow: hidden;
}



.contact-new .section-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    animation: fadeIn 2s ease-in-out;
}

.contact-new-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
    animation: fadeIn 2s ease-in-out;
}

.contact-new-info {
    background: rgba(20, 20, 30, 0.5);
    border-radius: var(--border-radius-lg);
    padding: 3rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
    transition: var(--transition-medium);
    height: 100%;
}

.contact-new-info:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 230, 204, 0.2);
}

.contact-new-info h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: var(--gradient-glow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.contact-new-info p {
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
    color: var(--phantom-light-gray);
    line-height: 1.7;
}

.contact-new-methods {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-new-method {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--border-radius-md);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: var(--transition-medium);
    transform: translateX(0);
}

.contact-new-method:hover {
    transform: translateX(5px);
    background: rgba(0, 230, 204, 0.08);
    border-color: rgba(0, 230, 204, 0.2);
}

.contact-new-method i {
    width: 50px;
    height: 50px;
    background-color: rgba(0, 230, 204, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    color: var(--teal-primary);
    font-size: 1.3rem;
    box-shadow: 0 0 15px rgba(0, 230, 204, 0.3);
    transition: var(--transition-medium);
}

.contact-new-method:hover i {
    background-color: rgba(0, 230, 204, 0.25);
    box-shadow: 0 0 20px rgba(0, 230, 204, 0.4);
    transform: scale(1.1);
}

.contact-new-social {
    display: flex;
    gap: 1.2rem;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-new-social-link {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-medium);
    font-size: 1.2rem;
    position: relative;
    overflow: hidden;
}

.contact-new-social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--teal-primary), #4DEEEA);
    opacity: 0;
    transition: var(--transition-medium);
    z-index: 0;
}

.contact-new-social-link i {
    position: relative;
    z-index: 1;
    transition: var(--transition-medium);
}

.contact-new-social-link:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: var(--teal-primary);
}

.contact-new-social-link:hover::before {
    opacity: 1;
}

.contact-new-social-link:hover i {
    color: var(--phantom-black);
}

.contact-new-form {
    background: rgba(30, 30, 40, 0.6);
    border-radius: var(--border-radius-lg);
    padding: 3rem;
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transform: translateY(0);
    transition: var(--transition-medium);
    animation: fadeIn 2.5s ease-in-out;
    height: 100%;
}

.contact-new-form:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 230, 204, 0.2);
}

.contact-new-form-group {
    margin-bottom: 2rem;
    position: relative;
}

.contact-new-form label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.5px;
    color: var(--text-white);
    transition: var(--transition-fast);
}

.contact-new-form input, 
.contact-new-form textarea {
    width: 100%;
    padding: 1.2rem 1.5rem;
    background-color: rgba(20, 20, 30, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-md);
    color: var(--text-white);
    font-family: 'Inter', sans-serif;
    transition: var(--transition-fast);
    font-size: 1rem;
}

.contact-new-form input:hover, 
.contact-new-form textarea:hover {
    background-color: rgba(30, 30, 40, 0.7);
    border-color: rgba(0, 230, 204, 0.2);
}

.contact-new-form input:focus, 
.contact-new-form textarea:focus {
    outline: none;
    border-color: var(--teal-primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 204, 0.2);
    background-color: rgba(30, 30, 40, 0.8);
}

.contact-new-form textarea {
    min-height: 150px;
    resize: vertical;
}

.contact-new-form .btn-primary {
    margin-top: 1.5rem;
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    box-shadow: 0 5px 20px rgba(0, 230, 204, 0.3);
    transition: var(--transition-medium);
    width: 100%;
}

.contact-new-form .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 230, 204, 0.4);
}

@media (max-width: 992px) {
    .contact-new-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .contact-new-info,
    .contact-new-form {
        height: auto;
    }
}

@media (max-width: 576px) {
    .contact-new {
        padding: 4rem 0;
    }
    
    .contact-new-info,
    .contact-new-form {
        padding: 2rem;
    }
    
    .contact-new-method {
        padding: 0.8rem 1rem;
    }
    
    .contact-new-method i {
        width: 40px;
        height: 40px;
        font-size: 1rem;
        margin-right: 1rem;
    }
}

/* Footer Modern */
.footer-modern {
    background: linear-gradient(180deg, var(--phantom-dark) 0%, rgba(15, 15, 25, 1) 100%);
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}





/* Footer Main Section */
.footer-main {
    padding: 5rem 2rem;
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.footer-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}

/* Footer Brand Section */
.footer-brand {
    display: flex;
    flex-direction: column;
}

.footer-logo {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.footer-logo img {
    height: 40px;
    margin-right: 0.75rem;
    filter: drop-shadow(0 0 8px var(--teal-glow));
}

.footer-brand p {
    color: var(--phantom-light-gray);
    margin-bottom: 2rem;
    font-size: 1rem;
    line-height: 1.7;
    max-width: 350px;
}

.footer-stats {
    display: flex;
    gap: 2rem;
    margin-top: auto;
}

.footer-stat {
    display: flex;
    flex-direction: column;
}

.footer-stat .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--teal-primary);
    margin-bottom: 0.3rem;
}

.footer-stat .stat-label {
    font-size: 0.9rem;
    color: var(--phantom-light-gray);
}

/* Footer Links Container */
.footer-links-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
    position: relative;
}

.footer-links-container::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(0, 230, 204, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(20px);
    z-index: -1;
}

.footer-column {
    min-width: 140px;
    position: relative;
}

.footer-column h4 {
    font-size: 1.15rem;
    margin-bottom: 1.8rem;
    color: var(--text-white);
    position: relative;
    padding-bottom: 0.8rem;
    letter-spacing: 0.5px;
}

.footer-column h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), rgba(88, 103, 221, 0.5));
    border-radius: 3px;
    box-shadow: 0 2px 10px rgba(0, 230, 204, 0.3);
}

.footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-column li {
    margin-bottom: 1rem;
    position: relative;
}

.footer-column a {
    color: var(--phantom-light-gray);
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    padding-left: 0;
}

.footer-column a::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    transition: all 0.3s ease;
}

.footer-column a:hover {
    color: var(--text-white);
    transform: translateX(8px);
}

.footer-column a:hover::before {
    width: 100%;
}

/* Footer Social Links */
.footer-social {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
}

.footer-social .social-link {
    width: 42px;
    height: 42px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.footer-social .social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--teal-primary) 0%, #5867dd 100%);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: 0;
}

.footer-social .social-link i {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
}

.footer-social .social-link:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 230, 204, 0.2);
    border-color: rgba(0, 230, 204, 0.3);
}

.footer-social .social-link:hover::before {
    opacity: 1;
}

.footer-social .social-link:hover i {
    color: var(--phantom-black);
    transform: scale(1.1);
}



/* Footer Bottom Section */
.footer-bottom {
    padding: 2rem;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.footer-bottom-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    background: rgba(20, 20, 30, 0.3);
    border-radius: 16px;
    padding: 1.5rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.footer-legal {
    display: flex;
    flex-wrap: wrap;
    gap: 1.8rem;
}

.footer-legal a {
    color: var(--phantom-light-gray);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    position: relative;
    padding-bottom: 2px;
}

.footer-legal a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--teal-primary), transparent);
    transition: all 0.3s ease;
}

.footer-legal a:hover {
    color: var(--text-white);
}

.footer-legal a:hover::after {
    width: 100%;
}

.copyright p {
    color: var(--phantom-light-gray);
    font-size: 0.9rem;
    margin-bottom: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive Styles for Footer */
@media (max-width: 1200px) {
    .footer-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .footer-links-container {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .footer-brand {
        max-width: 600px;
    }
}

@media (max-width: 768px) {
    .footer-top,
    .footer-main,
    .footer-bottom {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    
    .footer-cta {
        padding: 2.5rem 1.5rem;
    }
    
    .footer-cta h2 {
        font-size: 2rem;
    }
    
    .footer-cta-buttons {
        flex-direction: column;
    }
    
    .footer-links-container {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    
    .footer-bottom-container {
        flex-direction: column-reverse;
        text-align: center;
    }
    
    .footer-legal {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .footer-cta {
        padding: 2rem 1.2rem;
    }
    
    .footer-cta h2 {
        font-size: 1.8rem;
    }
    
    .footer-social {
        justify-content: center;
    }
    
    .newsletter-form {
        flex-direction: column;
    }
    
    .newsletter-form button {
        width: 100%;
        height: 45px;
    }
}

/* Responsive Styles */
@media (max-width: 1200px) {
    .hero {
        flex-direction: column;
        text-align: center;
        gap: 4rem;
    }

    .hero-content {
        max-width: 800px;
    }

    .hero-cta, .hero-stats {
        justify-content: center;
    }

    .dashboard-preview {
        transform: perspective(1000px) rotateY(0) rotateX(5deg);
    }

    .dashboard-preview:hover {
        transform: perspective(1000px) rotateY(0) rotateX(3deg) translateZ(20px);
    }

    .contact-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .contact-orb-1 {
        width: 400px;
        height: 400px;
    }
    
    .contact-orb-2 {
        width: 300px;
        height: 300px;
    }
    
    .contact-orb-3 {
        width: 250px;
        height: 250px;
    }
}

@media (max-width: 992px) {
    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2.2rem;
    }

    .nav-links, .cta-buttons {
        display: none;
    }

    .menu-toggle {
        display: block;
    }

    .pricing-card.featured {
        transform: scale(1);
    }

    .pricing-card.featured:hover {
        transform: scale(1) translateY(-10px);
    }
}

@media (max-width: 768px) {
    section {
        padding: 4rem 1.5rem;
    }

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 2rem;
    }

    .hero {
        padding: 7rem 1.5rem 4rem;
    }

    .hero-cta {
        flex-direction: column;
        gap: 1rem;
    }

    .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
    }

    .stat {
        align-items: center;
    }

    .features-grid, .pricing-grid {
        grid-template-columns: 1fr;
    }

    .testimonial-slider {
        flex-direction: column;
    }

    .testimonial-card {
        min-width: auto;
    }

    .brands {
        justify-content: center;
    }

    .footer-container {
        flex-direction: column;
        gap: 2rem;
    }

    .footer-links {
        flex-direction: column;
        gap: 2rem;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2.2rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    .hero p {
        font-size: 1.1rem;
    }

    .contact-form {
        padding: 1.5rem;
    }
    
    .contact-info {
        padding: 1.5rem;
    }
    
    .contact-method {
        padding: 0.6rem 1rem;
    }
    
    .contact-method i {
        width: 40px;
        height: 40px;
        font-size: 1rem;
        margin-right: 0.8rem;
    }
    
    .social-link {
        width: 45px;
        height: 45px;
        font-size: 1rem;
    }
    
    .contact-orb-1, .contact-orb-2, .contact-orb-3 {
        opacity: 0.1;
    }
}
