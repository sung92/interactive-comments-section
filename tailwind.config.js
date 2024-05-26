/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        moderateblue: "hsl(238, 40%, 52%)",
        softred: "hsl(358, 79%, 66%)",
        lightgrayishblue: "hsl(239, 57%, 85%)",
        palered: "hsl(357, 100%, 86%)",
      },
      neutral: {
        darkblue: "hsl(212, 24%, 26%)",
        grayishblue: "hsl(211, 10%, 45%)",
        lightgray: "hsl(223, 19%, 93%)",
        verylgray: "hsl(228, 33%, 97%)",
      },
      white: "#ffff",
      tomato: "#F05B5B",
    },
    fontFamily: { sans: "Rubik, sans-serif" },
    screens: { tablet: "768px", desktop: "1120px" },
    extend: {
      boxShadow: {
        "3xl": "3px 9px 55px -11px rgb(60, 60, 60)",
      },
      backgroundImage: {
        header: "url('/images/bg-pattern-header.svg')",
        footer: "url('/images/bg-pattern-footer.svg')",
        pricing: "url('/images/bg-pattern-pricing.svg')",
        card: "url('/images/bg-pattern-card.svg')",
      },
      backgroundPosition: { bottom4: "center bottom 10rem" },
      gridTemplateRows: {
        mobile: "auto 5% 1fr 5% auto",
        mobileEdit: "auto 10% 1fr",
        mobileReply: "auto 1fr auto",
        desktop: "",
        tabletcards: "1fr 1fr",
        desktopsignup: "auto 1fr .5fr auto",
      },
      gridTemplateColumns: {
        mobile: "auto 10px 1fr",
        desktop: "auto 2rem auto 10px 1fr auto",
        tabletheader: "1fr 1fr",
        desktopsignup: "45% 5vw 5vw 10vw 10vw 1fr",
      },
    },
  },
  plugins: [],
};
