// ==========================
// LOGIN BUTTON
// ==========================

document
.querySelector(".hero-login")
.addEventListener("click", () => {

    window.location.href =
    "login.html";

});

// ==========================
// REGISTER BUTTON
// ==========================

document
.querySelector(".hero-register")
.addEventListener("click", () => {

    window.location.href =
    "register.html";

});

// ==========================
// COUNTER ANIMATION
// ==========================

const counters =
document.querySelectorAll(".stat-card h1");

counters.forEach(counter => {

    const target =
    parseInt(
        counter.innerText
        .replace("+","")
        .replace("%","")
    );

    let count = 0;

    const updateCounter = () => {

        if(count < target){

            count += Math.ceil(target/50);

            if(
                counter.innerText.includes("%")
            ){

                counter.innerText =
                count + "%";

            }
            else{

                counter.innerText =
                count + "+";

            }

            setTimeout(
                updateCounter,
                30
            );
        }
        else{

            if(
                counter.innerText.includes("%")
            ){

                counter.innerText =
                target + "%";

            }
            else{

                counter.innerText =
                target + "+";

            }

        }

    };

    updateCounter();

});

// ==========================
// SCROLL REVEAL
// ==========================

const sections =
document.querySelectorAll(
    "section"
);

window.addEventListener(
    "scroll",
    () => {

        sections.forEach(section => {

            const top =
            section.getBoundingClientRect()
            .top;

            if(top < window.innerHeight-100){

                section.style.opacity = "1";

                section.style.transform =
                "translateY(0px)";
            }

        });

    }
);