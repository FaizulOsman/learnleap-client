import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useEffect(() => {
    // Your GSAP code here
    const dude = document.querySelector(".dude");
    const head = dude.querySelector(".head");
    const legs = Array.from(dude.querySelectorAll(".leg"));
    const arms = Array.from(dude.querySelectorAll(".arm"));
    const legBottoms = Array.from(dude.querySelectorAll(".leg-bottom"));
    const armBottoms = Array.from(dude.querySelectorAll(".arm-bottom"));

    gsap.set(arms, {
      svgOrigin: "180 58",
    });
    gsap.set(head, {
      svgOrigin: "180 45",
    });
    gsap.set(armBottoms, {
      svgOrigin: "178 118",
    });
    gsap.set(legs, {
      svgOrigin: "177 145",
    });
    gsap.set(legBottoms, {
      svgOrigin: "171 220",
    });

    const halfBodyTimeline = (leg, arm) => {
      const legBottom = leg.querySelector(".leg-bottom");
      const armBottom = arm.querySelector(".arm-bottom");

      return gsap
        .timeline({
          repeat: -1,
          paused: true,
        })
        .fromTo(
          leg,
          {
            rotation: -25,
          },
          {
            duration: 0.5,
            rotation: 15,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          leg,
          {
            duration: 0.25,
            rotation: -25,
            ease: "sine.in",
          },
          ">"
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 15,
            ease: "sine.inOut",
          },
          0.25
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 80,
            ease: "sine.in",
          },
          ">"
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 0,
            ease: "sine.out",
          },
          ">"
        )
        .fromTo(
          arm,
          {
            rotation: -12,
          },
          {
            duration: 0.5,
            rotation: 12,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0
        )
        .fromTo(
          armBottom,
          {
            rotation: -15,
          },
          {
            duration: 0.5,
            rotation: 10,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0
        );
    };

    const backCycle = halfBodyTimeline(legs[0], arms[1]);
    const frontCycle = halfBodyTimeline(legs[1], arms[0]);

    const bodyTimeline = gsap
      .timeline({
        paused: true,
      })
      .to(
        dude,
        {
          duration: 0.25,
          y: "-=20",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      )
      .fromTo(
        head,
        {
          rotation: -25,
        },
        {
          duration: 0.25,
          rotation: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      );

    const numberOfCycles = Math.ceil(
      (3 * window.innerWidth) / window.innerHeight
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".page",
          scrub: true,
          start: "0% 0%",
          end: "100% 100%",
        },
      })
      .to(
        ".arrow-animated",
        {
          duration: 0.05,
          opacity: 0,
        },
        0
      )
      .fromTo(
        ".content",
        {
          xPercent: 0,
        },
        {
          xPercent: -50,
          easy: "none",
        },
        0
      )
      .fromTo(
        bodyTimeline,
        {
          time: 0.7,
        },
        {
          time: 0.75 + numberOfCycles,
        },
        0
      )
      .fromTo(
        backCycle,
        {
          time: 0.7,
        },
        {
          time: 0.75 + numberOfCycles,
        },
        0
      )
      .fromTo(
        frontCycle,
        {
          time: 0.2,
        },
        {
          time: 0.25 + numberOfCycles,
        },
        0
      );

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    // ---------------------------------------------
    // ONLY FOR CODEPEN PREVIEW

    const scrollToOptions = {
      top: 0.32 * window.innerHeight,
      behavior: "smooth", // This adds smooth scrolling
    };

    window.scrollTo(scrollToOptions);
  }, []);

  const [lastId, setLastId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [scrollItems, setScrollItems] = useState([]);
  const [contentPosition, setContentPosition] = useState("fixed");

  //   useEffect(() => {
  //     const topMenu = document.querySelector("#content");
  //     const topMenuHeight = topMenu.offsetHeight + 1;
  //     const menuItems = Array.from(topMenu.querySelectorAll("a"));
  //     const scrollItems = menuItems.map((menuItem) => {
  //       const href = menuItem.getAttribute("href");
  //       const item =
  //         href === "#" ? document.documentElement : document.querySelector(href);
  //       if (item) {
  //         return item;
  //       }
  //     });

  //     setMenuItems(menuItems);
  //     setScrollItems(scrollItems);
  //   }, []);

  useEffect(() => {
    const handleScroll = () => {
      const topMenu = document.querySelector("#content");
      const topMenuHeight = topMenu.offsetHeight + 1;
      const topMenuWidth = topMenu.offsetWidth + 1;
      const fromTop = window.scrollY + topMenuHeight;
      //   console.log(topMenuWidth);
      if (fromTop > topMenuHeight * 2.5) {
        setContentPosition("absolute");
      } else {
        setContentPosition("fixed");
      }

      const cur = scrollItems.filter(
        (scrollItem) => scrollItem && scrollItem.offsetTop < fromTop
      );
      const id = cur.length ? cur[cur.length - 1].id : "";

      if (lastId !== id) {
        setLastId(topMenu);
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove("active");
          if (menuItem.getAttribute("href") === `#${id}`) {
            menuItem.classList.add("active");
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastId, menuItems, scrollItems]);

  return (
    <div className="hero-container relative">
      <div class="page"></div>
      <div class={`content ${contentPosition}`} id="content">
        <div class="content-section">
          <div>
            <h1>Dude and Scroll</h1>
            <p class="arrow-animated">↓</p>
          </div>
        </div>
        <div class="content-section">
          <div>
            <h1>What is this?</h1>
            <p>
              That is{" "}
              <a href="https://twitter.com/uuuuuulala" target="_blank">
                me
              </a>{" "}
              learning the basic walk cycle animation and playing with the GSAP
              implementation&nbsp;of&nbsp;it.
            </p>
          </div>
        </div>
        <div class="content-section">
          <div>
            <h1>So what?</h1>
            <p>
              You can use this code and design concept for your project. The
              animation parameters are easy to tweak, graphic elements can be
              replaced.
            </p>
            <p>
              You can also give a follow on{" "}
              <a
                href="https://www.linkedin.com/in/ksenia-kondrashova/"
                target="_blank"
              >
                linkedin
              </a>
              ,{" "}
              <a href="https://codepen.io/ksenia-k" target="_blank">
                codepen
              </a>{" "}
              and{" "}
              <a href="https://twitter.com/uuuuuulala" target="_blank">
                twitter
              </a>{" "}
            </p>
          </div>
        </div>
        <div class="content-section"></div>
      </div>
      <div class={`animation-container ${contentPosition}`}>
        <svg viewBox="0 -10 315 350">
          <g
            class="dude"
            stroke="black"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          >
            <g class="leg">
              <path
                class="leg-bottom"
                d="M182,317l-10.4-2.8c-2.7-0.7-4.5-3.2-4.4-6c1.7-13,3-27,3.7-42.1c0.8-16.5,0.7-32,0.1-46.1"
              />
              <path d="M171,220l6-60" />
            </g>
            <g class="leg">
              <path
                class="leg-bottom"
                d="M182,317l-10.2-2.7c-2.8-0.8-4.7-3.4-4.6-6.3c-0.8-13.9-1-29.2-0.2-45.8c0.7-15.2,2.1-29.4,4-42.2"
              />
              <path d="M171,222c0.3-10,4.3-42,5.3-48" />
            </g>

            <g class="arm">
              <path d="M175,75c-0.6,8.7-0.6,18.9,0.8,30.1c0.6,4.6,1.3,8.9,2.2,12.9" />
              <path
                class="arm-bottom"
                d="M186,175c-0.2-3.1-0.4-6.2-0.7-9.3c-1.5-16.9-4.1-32.9-7.3-47.7"
              />
            </g>
            <g class="arm">
              <path d="M178.8,82.2c-1.9,13.1-1.8,25.2-0.8,35.8" />
              <path
                class="arm-bottom"
                d="M186,175c-2.4-7.6-4.7-16.8-6.3-27.2c-1.6-11.3-2-21.3-1.7-29.8"
              />
            </g>
            <path
              class="head"
              d="M195,14.8c-10.8-5.7-23.9,1.3-28.2,12.4c-4.9,13,6.3,28.4,17.8,29.1c13.2,0.8,22.2-16.1,19.5-26.7c-1.6-6.5-5.2-7.1-5.2-7.1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

//   const [lastId, setLastId] = useState("");
//   const [menuItems, setMenuItems] = useState([]);
//   const [scrollItems, setScrollItems] = useState([]);
//   console.log(lastId);
//   //   useEffect(() => {
//   //     const topMenu = document.querySelector("#content");
//   //     const topMenuHeight = topMenu.offsetHeight + 1;
//   //     const menuItems = Array.from(topMenu.querySelectorAll("a"));
//   //     const scrollItems = menuItems.map((menuItem) => {
//   //       const href = menuItem.getAttribute("href");
//   //       const item =
//   //         href === "#" ? document.documentElement : document.querySelector(href);
//   //       if (item) {
//   //         return item;
//   //       }
//   //     });

//   //     setMenuItems(menuItems);
//   //     setScrollItems(scrollItems);
//   //   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const topMenu = document.querySelector("#content");
//       const topMenuHeight = topMenu.offsetHeight + 1;
//       const fromTop = window.scrollY + topMenuHeight;

//       const cur = scrollItems.filter(
//         (scrollItem) => scrollItem && scrollItem.offsetTop < fromTop
//       );
//       const id = cur.length ? cur[cur.length - 1].id : "";
//       console.log(fromTop);
//       if (lastId !== id) {
//         setLastId(topMenu);
//         menuItems.forEach((menuItem) => {
//           menuItem.classList.remove("active");
//           if (menuItem.getAttribute("href") === `#${id}`) {
//             menuItem.classList.add("active");
//           }
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastId, menuItems, scrollItems]);