## Release Updates & Announcements:
* **[fio.js V3.0 Released! Featuring Intelligent Visual Guidance, 60 FPS Rendering, Virtual Camera Defense, and Major UI/UX Overhauls.](https://faceio.net/)**
* [FACEIO Launches New REST APIs for Age and Gender Estimation](https://community.faceio.net/threads/announcements-faceio-launches-new-rest-apis-for-age-and-gender-estimation-rest-api-237)
* [fio.js V2.1 Released with Age Verification & Minors Access Prevention](https://blog.pixlab.io/2023/06/age-verification-check-available-for-faceio-face-recognition)
* Introducing the `fetchAllErrorCodes()` method for the NPM Package for much better error logging experience.
* [New REST API Endpoints Available for FACEIO](https://blog.pixlab.io/2023/04/new-rest-api-endpoints-available-for-faceio)
* [Resolving Liveness Detection with FACEIO's Advanced AI Models](https://blog.pixlab.io/2024/07/resolving-liveness-detection-issues-with-faceios-advanced-ai-models)
* [Liveness Detection & Face Anti-Spoofing Security Feature Available for FACEIO](https://www.biometricupdate.com/202303/pixlab-adds-active-liveness-detection-to-faceio-biometrics-framework)
* [fio.js V1.9 Released with Face Duplication Prevention](https://blog.pixlab.io/2022/10/fiojs-190-released-with-face-duplication-prevention)

## Introducing FACEIO NPM Package

* **TLDR;** [FACEIO](https://faceio.net) is a facial authentication framework that is to be implemented on websites or web applications via simple JavaScript snippet (just like Disqus or Google Tag) to easily authenticate users via **Face Recognition instead of the traditional login/password pair or OTP code**.
* FACEIO is a cross-browser, Cloud & On-Premise deployable, facial authentication framework, with a client-side JavaScript library (`fio.js`) that [integrates seamlessly](https://faceio.net/integration-guide) with any website or web application desiring to offer secure facial recognition experience to their users.
* Put simply, FACEIO is the easiest way to add passwordless authentication to websites or web applications. Simply implement `fio.js` on your website, and you will be able to **instantly authenticate your existing users, and enroll new ones via Face Recognition** using their computer Webcam or smartphone frontal camera on their favorite browser.
* Once `fio.js` is [implemented](https://faceio.net/integration-guide) on your website, you'll be able to instantly recognize your existing users, on-board new members securely with maximum convenience, and at real-time thanks to passwordless experience powered by face recognition.

# `fio.js` LIBRARY & WIDGET INTEGRATION

The FACEIO Widget is a simple and elegant interface to provide **secure facial authentication experience to your users** via simple calls to the `enroll()` & `authenticate()` methods. The Widget is powered by the `fio.js` JavaScript library, which is simple enough to [integrate](https://faceio.net/integration-guide#fiojs-integration) in a matter of minutes while being flexible enough to support highly customized setups. 

`fio.js` works with regular webcams, and smartphones frontal camera on all modern browsers, **does not require biometric sensors**, and works seamlessly with all websites and web applications regardless of the underlying front-end technology used (ie. React, Vue, jQuery, Vanilla Javascript, static HTML, etc.) or server-side language or framework.

> ## STEP 1 - IMPORT `fio.js` TO YOUR SITE

```js
import faceIO from '@faceio/fiojs'

const faceio = new faceIO('app-public-id') // Get the application Public ID at https://console.faceio.net.
```

👉 You shouldn't run `fio.js` functions right after initiating it. Let the DOM load.

💡 Take a look to our **community contributed tutorials** [listed here](https://faceio.net/integration-guide#community-tutorials). They should help you implement `fio.js` on your website or web application using your favorite JavaScript framework whether it is React, Vue, Angular, Next or Vanilla JavaScript.

> ## STEP 2 - INVOKE THE WIDGET

```js
import faceIO from '@faceio/fiojs'

const faceio = new faceIO('app-public-id'); // Get the application Public ID at https://console.faceio.net.

function App() {
    return (
    <div className="App">
        <button onClick={enrollNewUser}>Enroll New User</button>
        <button onClick={authenticateUser}>Authenticate User</button>
    </div>
    );
}

async function enrollNewUser() {
    // call to faceio.enroll() here will automatically trigger the on-boarding process
}
async function authenticateUser(){
    // call to faceio.authenticate() here will automatically trigger the facial authentication process
}
function handleError(errCode){
    // Handle error here
    // Log all possible error codes during user interaction..
    const fioErrs = faceio.fetchAllErrorCodes();
    switch (errCode) {
    case fioErrs.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user");
    break;
    case fioErrs.NO_FACES_DETECTED:
        console.log("No faces were detected during the enroll or authentication process");
    break;
    case fioErrs.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
    break;
    case fioErrs.MANY_FACES:
        console.log("Two or more faces were detected during the scan process");
    break;
    case fioErrs.FACE_DUPLICATION:
        console.log("User enrolled previously (facial features already recorded). Cannot enroll again!");
    break;
    case fioErrs.MINORS_NOT_ALLOWED:
        console.log("Minors are not allowed to enroll on this application!");
    break;
    case fioErrs.PAD_ATTACK:
        console.log("Presentation (Spoof) Attack (PAD) detected during the scan process");
    break;
    case fioErrs.FACE_MISMATCH:
        console.log("Calculated Facial Vectors of the user being enrolled do not matches");
    break;
    case fioErrs.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated");
    break;
    case fioErrs.ABORTED_BY_USER:
        console.log("User explicitly aborted the enrollment process via the close button");
    break;
    // ...
    // Refer to the boilerplate at: https://gist.github.com/symisc/34203d2811a39f2a871373abc6dd1ce9
    // for the list of all possible error codes.
    }
}

export default App;
```

> ## `ENROLL()` - ENROLL NEW USER

> ### SYNTAX

```js
const userInfo = await faceio
.enroll({ parameters })
.catch(errCode => {
  /* handle the error */
})

console.log(userInfo)
```

> ### ALIAS
`enrol()`, `register()`, `record()`

> ### PARAMETERS
`enroll()` takes a **single, optional `parameters` object** with the properties to be configured. The table below lists all possible `properties` of the parameters object:



| **Property Name**      | **Type**              | **Default Value** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|--------------------|-----------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `payload`            | Any Serializable JSON | NULL          | **An arbitrary set of data, you want to associate with the user being enrolled**. Example of useful payloads includes *Email Address, Name, ID, Token*, and so on. This payload will be **forwarded back to you** upon successful [future authentication](https://faceio.net/integration-guide#authenticate_return) of this particular user. Maximum payload size per user is set to 16KB.                                                                                                                                          |
| `permissionTimeout`  | Number                | 27 Seconds    | **Total number of seconds to wait for the user to grant camera access permission**. Passing this delay, the ongoing `enroll()` operation is aborted and the promise is rejected with the `fioErrCode.PERMISSION_REFUSED` error.                                                                                                                                                                                                                                  |
| `termsTimeout`       | Number                | 10 Minutes    | **Total number of minutes to wait for the user to accept FACEIO/Host Application Terms of Service**. Passing this delay, the ongoing `enroll()` operation is aborted and the promise is rejected with the `fioErrCode.TERMS_NOT_ACCEPTED` error.                                                                                                                                                                                                                 |
| `idleTimeout`        | Number                | 27 Seconds    | **Total number of seconds to wait before giving up if no faces were detected during the enrollment process**. Passing this delay, the ongoing operation is aborted and the promise is rejected with the `fioErrCode.NO_FACES_DETECTED` error.                                                                                                                                                                                                                  |
| `replyTimeout`       | Number                | 60 Seconds    | **Total number of seconds to wait before giving up if the remote FACEIO processing node does not return a response (a very unlikely scenario)**. Passing this delay, the ongoing operation is aborted and the promise is rejected with the `fioErrCode.TIMEOUT` error.                                                                                                                                                                                         |
| `enrollIntroTimeout` | Number                | 11 Seconds    | Enrollment Widget introduction/instruction screen display delay.                                                                                                                                                                                                                                                                                                                                                                                              |
| `locale`             | String                | auto          | **Default interaction language for the Widget display**. If this value is missing or set to auto, then the interaction language will be deducted from the HTTP request header. Otherwise, just pass the **BCP 47, two letter, language code** of your choice (en, ar, es, ja, de, etc.).                                     |
| `userConsent`        | Boolean               | false         | **If you have already collected user consent before enrollment** you can **set this parameter** to true. In which case, the Terms of Use consent screen is not displayed for the end user being enrolled. **It is your responsibility to explicitly ask for consent before enrolling a new user**. |
| `showAbortBtn`       | Boolean               | false         | **Set to true if you want the abort button (close modal) to always appear during enrollment.** If the user explicitly aborts the enrollment process by clicking this button, the `fioErrCode.ABORTED_BY_USER` error will be raised. |



> ### RETURN VALUE

**A Promise whose fulfillment handler receives a `userInfo` object when the user has successfully been enrolled**. On failure, the promise is rejected with one of the possible **error codes**.

The table below lists all fields of the `userInfo` object returned to your web application by `enroll()` when its promise is fulfilled:

| **Property Name** | **Type**               | **Description**                                                                                                                                                                                                                                                                                                                     |   
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `facialId`      | UUID (String)      | **A Universally Unique Identifier assigned to this particular user**. FACEIO recommend that your rely on this [Facial ID](https://faceio.net/facialid) if you plan to uniquely identify all enrolled users on your backend for example. The Facial ID is discussed in details [here](https://faceio.net/facialid). |
| `timestamp`     | Timestamp (String) |  [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), enrollment completion date & time.                                                                                                                                                                                                                                                                                   |
| `details`       | Object             | An object with two fields: gender and age which respectively corresponds to the Gender and Age approximation of the enrolled user.                                                                                                                                                                                              |

> ### EXAMPLE

```js
import faceIO from '@faceio/fiojs'

const faceio = new faceIO('app-public-id'); // Get the application Public ID at https://console.faceio.net.

function App() {
    return (
    <div className="App">
        <button onClick={enrollNewUser}>Enroll New User</button>
    </div>
    );
}

async function enrollNewUser() {
    try {
        const userInfo = await faceio.enroll({
            "locale": "auto", // Default user locale
            "showAbortBtn": true, // Show the close modal button
            "payload": {
                "whoami": 123456, // Dummy ID linked to this particular user
                "email": "john.doe@example.com"
            }
        });

        alert(
            `User Successfully Enrolled! Details:
            Unique Facial ID: ${userInfo.facialId}
            Enrollment Date: ${userInfo.timestamp}
            Gender: ${userInfo.details.gender}
            Age Approximation: ${userInfo.details.age}`
        );
    } catch (errCode) {
        // Handle error...
    }
}

export default App;
```

> ## `AUTHENTICATE()` - IDENTIFY/RECOGNIZE ENROLLED USERS

> ### SYNTAX

```js
const userInfo = await faceio
.authenticate({ parameters })
.catch(errCode => {
  /* handle the error */
})

console.log(userInfo)
```

> ### ALIAS
`auth()`, `recognize()`, `identify()`

> ### PARAMETERS

`authenticate()` takes a **single, optional `parameters` object** with the properties to be configured. The table below lists all possible properties of the `parameters` object:

| **Property Name**     | **Type**   | **Default Value** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                             |
|-------------------|--------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `permissionTimeout` | Number |  27 Seconds   | **Total number of seconds to wait for the user to grant camera access permission**. Passing this delay, the ongoing `authenticate()` operation is aborted.                                                                                                                                                                                      |
| `idleTimeout`       | Number |  27 Seconds   | **Total number of seconds to wait before giving up if no faces were detected during the authentication process**. Passing this delay, the ongoing operation is aborted.                                                                                                                                                                        | 
| `replyTimeout`      | Number |  60 Seconds   | **Total number of seconds to wait before giving up if the remote FACEIO processing node does not return a response (a very unlikely scenario)**. Passing this delay, the ongoing operation is aborted.                                                                                                                                                   |
| `locale`            | String | auto          | **Default interaction language of the FACEIO Widget**. If this value is missing or set to auto, then the interaction language will be deducted from the HTTP request header. |

> ### RETURN VALUE



**A Promise whose fulfillment handler receives a `userData` object when the user has successfully been identified**. On failure, the promise is rejected with one of the possible **error codes**.

The table below lists all fields of the `userData` object returned to your web application by `authenticate()` when its promise is fulfilled:

| **Property Name** | **Type**          | **Description**                                                                                                                                                                                                                                                                                                                       |
|---------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| payload       | *Any*           |  The arbitrary data you have already linked (if any) to this particular user during his enrollment via the payload parameter of the enroll() method.                                                                                                                                                                              |   |   |
| `facialId`      | *UUID (String)* | **The Universally Unique Identifier assigned to this particular user**. |

> ## `RESTARTSESSION()` - REQUEST NEW USER SESSION

> ### SYNTAX

```js
const boolean = await faceio.restartSession({})
```

> ### RETURN VALUE

`true` if the request for a new session have been granted, and ready for another round of calls to [enroll()](https://faceio.net/integration-guide#enroll) or [authenticate()](https://faceio.net/integration-guide#authenticate) for the same user. false otherwise.


> ## ERROR CODES

The table below lists all possible error codes that are returned from either the `enroll()` or the `authenticate()` methods when **their promises are rejected respectively**.

| **Error Code**                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Effect on `enroll()` or `authenticate()`**                                                                                                                                               |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fioErrCode.PERMISSION_REFUSED`  | Access to the camera stream was **denied** by the end user.                                                                                                                                                                                                                                                                                                                                                                                                           | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.TERMS_NOT_ACCEPTED`  | Terms & Conditions set out by FACEIO/host application **rejected** by the end user.                                                                                                                                                                                                                                                                                                                                                                                   | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.SESSION_IN_PROGRESS` | Another [authentication](https://faceio.net/integration-guide#authenticate) or [enrollment](https://faceio.net/integration-guide#enroll) operation is processing. This can happen when your application logic calls more than once `enroll()` or `authenticate()` due to poor UI implementation on your side. **It is possible now to restart the current user session without reloading the entire HTML page via simple call to the [`restartSession()`](https://faceio.net/integration-guide#restart_sess) method**. | Ongoing operation is **still processing** and the FACEIO Widget **continue** running. Your error handler routine should probably **ignore this error code** as the operation is still ongoing. |   |   |
| `fioErrCode.FACE_DUPLICATION`    | **This error code is raised when the same user tries to enroll a second time on your application.**                                                                                                                            | Ongoing `enroll()` operation is **immediately aborted** and control is transferred to the host application.                                                                              |   |   |
| `fioErrCode.TIMEOUT`             | **Ongoing operation timed out** (eg, camera Access Permission, ToS Accept, Face not yet detected, Server Reply, etc.).                                                                                                                                                                                                                                                                                                                                                | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.NO_FACES_DETECTED`   | **No faces were detected** during the enroll or authentication process.                                                                                                                                                                                                                                                                                                                                                                                               | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.UNRECOGNIZED_FACE`   | **Unrecognized/unknown face** on this application Facial Index.                                                                                                                                                                                                                                                                                                                                                                                                       | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.MANY_FACES`          | **Two or more faces** were detected during the [enroll](https://faceio.net/integration-guide#enroll) or [authentication](https://faceio.net/integration-guide#authenticate) process.                                                                                                                                                                                                                                                                                                                                                                                      | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.PAD_ATTACK`          | Presentation attack (PAD), better know as face spoofing attempt or Virtual Camera injection is detected during the authentication process.                                                                                                                                                                                                                                                                                                                                                    | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.UNIQUE_PIN_REQUIRED` | Supplied PIN Code **must be unique** among other PIN's on this application. This warning code is **raised only from the `enroll()` method**.                                                                                                                                                                                                                                                                                                                                                                                | Ongoing `enroll()` operation is **still processing** until the user being enrolled **input a unique PIN code**.                                                                              |   |   |
| `fioErrCode.FACE_MISMATCH`       | Calculated Facial Vectors of the **user being [enrolled](https://faceio.net/integration-guide#enroll) do not matches**. This error code **is raised only from the `enroll()` method**.                                                                                                                                                                                                                                                                                                                                     | Ongoing `enroll()` operation is **immediately aborted** and control is transferred to the host application.                                                                              |   |   |
| `fioErrCode.WRONG_PIN_CODE`      | **Wrong PIN Code supplied** by the user being [authenticated](https://faceio.net/integration-guide#authenticate). This error code is **raised only from the `authenticate()` method**.                                                                                                                                                                                                                                                                                                                                           | Ongoing `authenticate()` operation is **immediately aborted after three trials** and control is transferred to the host application.                                                     |   |   |
| `fioErrCode.NETWORK_IO`          | Error while establishing network connection with the FACEIO processing node.                                                                                                                                                                                                                                                                                                                                                                                      | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.PROCESSING_ERR`      | Server side error.                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.UNAUTHORIZED`        | Your application is not allowed to perform the requested operation (eg. *Invalid ID, Blocked, Paused*, etc.). Refer to the [FACEIO Console](https://console.faceio.net/) for additional information.                                                                                                                                                                                                                                                                                               | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.UI_NOT_READY`        | The FACEIO `fio.js` library could not be injected onto the client DOM.                                                                                                                                                                                                                                                                                                                                                                                              | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.TOO_MANY_REQUESTS`   | Widget instantiation requests exceeded for freemium applications. **Does not apply for premium applications as `fio.js` instantiation is unmetered**.                                                                                                                                                                                                                                                                                                                   | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.EMPTY_ORIGIN`        | *Origin* or *Referer* HTTP request header is **empty or missing** while instantiating `fio.js`. This error is **raised only if you have enforced** the *Reject Empty Origin* [Security Option](https://faceio.net/security-best-practice#rejectMissingHeaders).                                                                                                                                                                                                                                                                                     | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.FORBIDDEN_ORIGIN`    | Domain origin is forbidden from instantiating `fio.js`. This error is **raised only if you have created a white list of authorized domain names** via the [FACEIO Console](https://console.faceio.net/).                                                                                                                                                                                                                                                                                               | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.FORBIDDEN_COUNTRY`   | Country ISO-3166-1 Code is forbidden from instantiating `fio.js`. This error is **raised only if you have created a white list of authorized countries** via the [FACEIO Console](https://console.faceio.net/).                                                                                                                                                                                                                                                                                        | Ongoing operation is **immediately aborted** and control is transferred to the host | 
| `fioErrCode.ABORTED_BY_USER`     | Ongoing operation was cancelled at the user's request (e.g., by clicking the close modal button). This error code is raised only from the `enroll()` method when `showAbortBtn` is passed.                                                                                                                                                                                                                                                                                        | Ongoing `enroll()` operation is **immediately aborted** and control is transferred to the host | 

# Further Reading
Finally, for additional information & to learn more about implementing FACEIO on your website or web application, please refer to the following documents:
- **[Getting Started Tutorial](https://faceio.net/getting-started)**: Learn the fundamentals about implementing facial authentication on a typical web application.
- **[Integration Guide](https://faceio.net/integration-guide)**: Learn how to implement ***fio.js***, our facial recognition library on your website.
- **[Developer Center](https://faceio.net/dev-guides)**: Code samples, documentation, support channels, and all the resources yo need to implement FACEIO on your website.
- **[Frequently Asked Questions](https://faceio.net/faq)**: Get instant answers to the most common questions.
- **[Trust Center](https://faceio.net/trust-center)**: Learn how we handle your data securely and in compliance with privacy and legal requirements.