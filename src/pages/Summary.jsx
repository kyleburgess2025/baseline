import { IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonMenu } from "@ionic/react";
import { useEffect, useRef, Fragment } from "react";
import ldb from "../db";
import { ref, get, query, startAfter, orderByKey, onValue, off } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { menuOutline, notifications, pencil } from "ionicons/icons";
import Media from "react-media";
import WeekSummary from "../components/WeekSummary";
import MonthSummary from "../components/MonthSummary";
import history from "../history";
import "./Container.css";
import "./Summary.css";

const Summary = () => {
    const [, loading] = useAuthState(auth);
    const menuRef = useRef();

    // Data refresh -- check timestamp and pull in new data
    useEffect(() => {
        if (loading) return;
        const listener = async snap => {
            let lastUpdated = 0;
            const trueLastUpdated = snap.val();
            const lastLog = await ldb.logs.orderBy("timestamp").reverse().limit(1).first();
            if (trueLastUpdated && lastLog) {
                lastUpdated = lastLog.timestamp;
                if (lastUpdated === trueLastUpdated) {
                    console.log("Up to date!");
                    return;
                }
            }

            console.log("Updating...");
            let newData = (await get(query(ref(db, `/${auth.currentUser.uid}/logs`), orderByKey(), startAfter(String(lastUpdated))))).val();

            if (newData) {
                // Add timestamp to data object
                for (let key in newData) {
                    newData[key].timestamp = Number(key);
                }

                ldb.logs.bulkAdd(Object.values(newData));
            }
        };
        const lastUpdatedRef = ref(db, `/${auth.currentUser.uid}/lastUpdated`);
        onValue(lastUpdatedRef, listener);

        return () => {
            off(lastUpdatedRef, "value", listener);
        };
    }, [loading]);

    return (
        <div>
            <div id="mainContent" className="container">
                <Media
                    queries={{
                        week: "(max-width: 700px)",
                        month: "(min-width: 701px)",
                    }}
                >
                    {matches => (
                        <Fragment>
                            {matches.week && <WeekSummary />}
                            {matches.month && <MonthSummary />}
                        </Fragment>
                    )}
                </Media>
            </div>
            <IonFab vertical="bottom" horizontal="end" slot="fixed" class="journal-fab" id="journal-fab">
                <IonFabButton
                    size="small"
                    color="light"
                    style={{ marginBottom: "16px" }}
                    onClick={() => menuRef.current?.open()}
                >
                    <IonIcon style={{fontSize: "22px"}} icon={menuOutline} />
                </IonFabButton>
                <IonFabButton
                    closeIcon={pencil}
                    activated={true}
                    onClick={() => {
                        history.push("/journal");
                    }}
                >
                    <IonIcon icon={pencil} />
                </IonFabButton>
            </IonFab>
            <IonMenu ref={menuRef} side="end" contentId="mainContent" menuId="mainMenu">
                <IonContent>
                    <IonList>
                        <br />
                        <IonItem onClick={() => history.push("/notifications")}>
                            <IonIcon icon={notifications} slot="start" />
                            <IonLabel>Notifications</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
        </div>
    );
};

export default Summary;
