import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { goBackSafely } from "../helpers";

const Donate = () => {
    return (<div className="container">
        <IonIcon class="top-corner x" icon={closeOutline} onClick={goBackSafely}></IonIcon>
        <div className="center-journal container">
            <div className="title">
                Donate!
            </div>
            <p className="text-center margin-bottom-0">Thank you for considering a donation to baseline. Financial contributions
                are what allow us to run programs like the gap fund, and help this app continue to scale and reach more people.
                If you're able to contribute, check out our <a href="https://paypal.me/getbaseline" target="_blank" rel="noreferrer">PayPal
                </a> or <a href="https://account.venmo.com/u/getbaseline" target="_blank" rel="noreferrer">Venmo</a>. (Email us
                if you need a different method; we're happy to accomodate. Donation money never goes to expenses like salaries or 
                bonuses — baseline is a 100% volunteer operation.)
            </p>
            <p className="text-center">Of course, financial contributions aren't the only ones that help. If you have programming expertise, consider
                contributing to baseline itself. This project is completely 
                open source on <a href="https://github.com/nkalupahana/baseline" target="_blank" rel="noreferrer">GitHub.</a> And of course, 
                if you have any feedback, please send it our way at <a href="mailto:feedback@getbaseline.app">feedback@getbaseline.app</a>.
            </p>
        </div>
    </div>);
};

export default Donate;