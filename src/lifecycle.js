import history from "./history";

const THRESHOLD_SEC = 60 * 3;

function getTime() {
    return Math.round(Date.now() / 1000);
}

function setLastOpenedTime() {
    window.localStorage.setItem("lastOpenedTime", getTime());
}

function redirect() {
    if (!window.location.pathname.startsWith("/journal")) {
        let lastOpenedTime = window.localStorage.getItem("lastOpenedTime");
        if (lastOpenedTime !== null) {
            lastOpenedTime = Number(lastOpenedTime);
            if (getTime() - lastOpenedTime > THRESHOLD_SEC) {
                history.push("/journal");
            }
        }
    }

    setLastOpenedTime();
}

document.addEventListener("resume", redirect);
document.addEventListener("deviceready", redirect);
document.addEventListener("pause", setLastOpenedTime);